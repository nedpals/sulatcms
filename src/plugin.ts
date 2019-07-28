import { SiteStore } from "./store";
import { emitter } from "./app";
import { Context } from "./context";

interface PluginInfo {
    name: string
}

interface Plugin {
    name: string,
    activated?: Boolean,
    options: object,
    events?: PluginEvents,
    auth?: PluginAuth
}

interface PluginEvents {
    onInit?: (cms: Context) => void,
    fetchFile?: (cms: Context) => void,
    publishFile?: (cms: Context) => void,
    removeFile?: (cms: Context) => void,
    buildIndex?: (cms: Context) => void
}

interface PluginAuth {
    onInit?: (response: { store: SiteStore, redirect: () => void }) => void,
    authenticate?: (response: { store: SiteStore, redirect: () => void }) => void,
    fetchUser?: () => void,
    revoke?: (response: { store: SiteStore, redirect: () => void }) => void
}

export default (store: SiteStore) => ({
    register: async function(plugins: Array<Plugin>) {    
        const activatedPlugins = plugins.map(pl => {
            return { ...pl, activated: true }
        });

        store.setState({ 
            plugins: store.state.plugins.concat(...activatedPlugins)
        }, false);

        return store.getState().plugins.map(pl => pl.name);
    },
    
    registerEvents: function (plugin: Plugin) {
        const events = Object.keys(plugin.events || {}) || [];
        const authEvents = Object.keys(plugin.auth || {}) || [];

        events.forEach(evt => {
            emitter.on(evt, plugin.events[evt]);
        });
    
        authEvents.forEach(evt => {
            emitter.on(`auth.${evt}`, plugin.auth[evt]);
        });
    },
    
    init: async function(...names: string[]) {
        const plugins: Array<Plugin> = store.getState().plugins.filter(plugin => names.includes(plugin.name) && plugin.activated);
        
        plugins.forEach(plugin => {
            this.registerEvents(plugin);
        });
    
        emitter.emit("onInit", { store });
    }
})

export {
    Plugin,
    PluginInfo,
    PluginEvents,
    PluginAuth
}