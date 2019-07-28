import mitt from 'mitt';

import SamplePage from "./views/sample";
import IndexPage from "./views/index";
import EditorPage from "./views/editor";

import plugins, { Plugin } from "./plugin";
import createSession, { SiteStore } from "./store";
import { initRoutes, buildRoutes } from "./router";

const emitter: mitt.Emitter = new mitt();

interface SulatOptions {
    el: Element,
    auth?: string,
    plugins?: Array<Plugin>
}

export default function initialize(options: SulatOptions) {
    const store: SiteStore = createSession();

    store.setState({
        config: {
            auth: options.auth || "no-auth"
        }
    }, false);

    plugins(store).register(options.plugins)
        .then((pluginsArr) => {
            return plugins(store).init(...pluginsArr);
        })
        .then(() => {
            const routes = buildRoutes({
                '/sample': {
                    name: "Sample",
                    component: SamplePage,
                },
                '/home': {
                    name: "Home",
                    component: IndexPage,
                },
                '/edit/:id': {
                    component: EditorPage
                }
            }, store);

            initRoutes(options.el, routes, "/home");
        });
};

export { initialize, emitter, SulatOptions };