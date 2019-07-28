import * as m from "mithril";
import { SiteStore } from "store";
import LoginPage from "./views/login";

import AppLayout from "./components/layout";

interface Route {
    component: any,
    layout?: boolean,
    requireAuth?: boolean,
    name?: string
}

function redirectToDestination() {
    m.route.set(decodeURIComponent(m.route.param('redirect')));
}

// function renderWithLayout(component) {
//     return 
// }

function buildRoutes(routes: { [path: string]: Route }, store: SiteStore) {
    let generated = {};

    Object.keys(routes).forEach(path => {
        const _route = routes[path] as Route;

        if (!_route.hasOwnProperty("layout")) {
            _route['layout'] = true;
        }

        if (!_route.hasOwnProperty("requireAuth")) {
            _route['requireAuth'] = true;
        }

        if (_route.hasOwnProperty("name")) {
            store.setState({
                routes: [...store.state.routes, { name: _route.name, path }]
            }, false);
        }

        if (!generated.hasOwnProperty("/login") && _route.requireAuth) {
            generated['/login'] = {
                onmatch() {
                    if (store.state.user.token) {
                        if (m.route.param('redirect') == 'undefined') {
                            m.route.set('/home');
                        } else {
                            redirectToDestination();
                        }
                    } else {
                        return LoginPage(store);
                    }
                }
            }
        }

        if (_route.requireAuth && store.state.config.auth !== "no-auth") {
            generated[path] = {
                onmatch() {
                    if (typeof store.state.user.token === "undefined") {
                        let last_location = window.location.hash.substring(window.location.hash.indexOf('#!')+2);

                        m.route.set('/login', { redirect: encodeURIComponent(last_location || path) })
                    } else {
                        if (_route.layout) {
                            return AppLayout(_route.component, store);
                        } else {
                            return _route.component(store);
                        }
                    }
                }
            };
        } else {
            generated[path] = _route.layout ? AppLayout(_route.component, store) : _route.component(store);
        }
    });

    return generated;
}

function initRoutes(mount: Element, routes = {}, default_route: string = '/') {
    m.route(mount, default_route, routes);
}

export {
    redirectToDestination,
    initRoutes,
    buildRoutes
}