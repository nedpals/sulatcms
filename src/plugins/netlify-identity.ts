// import netlifyIdentity from "net"

import { Plugin, PluginInfo, PluginEvents, PluginAuth } from "../plugin";
import mitt from "mitt";
import { SiteStore, UserState } from "store";
function netlifyIdentityPlugin(options = {}): Plugin {
    const emt: mitt.Emitter = new mitt();

    const netlifyIdentity = {
        on: emt.on,
        emit: emt.emit,
        init() {
            console.log("Netlify mock init");
        },
        currentUser() {
            const user: UserState = {
                full_name: "ned",
                avatar_url: "https://i.pravatar.cc/300",
                token: "lsajfidjcojreoijof090s89duvsiv0",
                id: "1023455"
            };

            return user;
        },
        open() {
            netlifyIdentity.emit("login", netlifyIdentity.currentUser());
        }
    }

    const auth: PluginAuth = {
        onInit: ({ store, redirect }) => {
            netlifyIdentity.init();

            netlifyIdentity.on("login", (user) => {
                store.setState({ user });
                
                if (store.state.user) {
                    redirect();
                }
            });
        },
        authenticate: ({ store, redirect }) => {
            netlifyIdentity.open();
        },
        revoke: ({ store, redirect }) => {
            store.setState({
                ...store.state,
                user: {} as any
            }, true);

            if (store.state.user.token.length === 0) {
                redirect();
            }
        }
    };

    const events: PluginEvents = {
        onInit: ({ store }) => {
            store.setState({
                config: {
                    ...store.state.config,
                    auth_providers: [
                        {
                            name: "netlify",
                            label: "Login with Netlify"
                        }
                    ]
                }
            }, false);
        }
    };

    return { name: "netlify-identity", events, auth, options };
}

export default netlifyIdentityPlugin;