import Globals from "../store/index";


// Sulat plugin system

function registerPlugin(name, pluginObj) {
    Globals.plugins.push(Object.assign({
        name: name,
        activated: true
    }, pluginObj))
}

function initializePlugins() {
    Globals.plugins.forEach(plugin => {
        console.log(`Plugin "${plugin.name}" activated and initiated!`)
        
        if (plugin.activated)
            plugin.initialize(Globals)
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

function initializePlugin(name) {
    Globals.plugins.forEach(plugin => {
        if (plugin.name === name && plugin.activated)
            plugin.initialize()
    })
}

export {
    registerPlugin,
    initializePlugins,
    initializePlugin,
    fire,
    activatePlugin
}