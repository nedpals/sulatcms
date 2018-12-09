import Globals from "../store/index"
import Auth from "../store/auth"


// Sulat plugin system

function registerPlugin(name, pluginObj) {
    return {
        name: name,
        activated: true, 
        ...pluginObj
    }
}

function initializePlugin(name) {
    const plugin = Globals.plugins.find(p => p.name = name)

    if (plugin.name === name && plugin.activated)
        plugin.initialize(Globals, Auth.settings)
}

function initializePlugins(plugins = []) {
    plugins.forEach(plugin => {
        if (!Globals.plugins.find(p => p.name = plugin.name))
            Globals.plugins.push(plugin)
    })

    Globals.plugins.forEach(plugin => {
        initializePlugin(plugin.name)
    })
}

function deactivatePlugin(name) {
    Globals.plugins.forEach(plugin => {
        if (plugin.name === name)
            plugin.activated = false

        return plugin
    })
}

function activatePlugin(name) {
    Globals.plugins.forEach(plugin => {
        if (plugin.name === name)
            plugin.activated = true

        initializePlugin(plugin.name)

        return plugin
    })
}

function fire(name, context) {
    Globals.plugins.forEach(plugin => {
        let event = name.split(".")
        let group = event.length !== 1 ? event[0] : null;
        let fnName = event.length !== 1 ? event[1] : event[0]

        if (plugin.hasOwnProperty(group) && plugin[group]) {
            let pluginFn = event.length !== 1 ? plugin[group][fnName] : plugin[fnName]

            pluginFn(...context)
        }
    })
}


export {
    registerPlugin,
    initializePlugins,
    initializePlugin,
    fire,
    deactivatePlugin,
    activatePlugin
}