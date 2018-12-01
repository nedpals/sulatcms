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

function fire(name, context, plugins) {
    Globals.plugins.forEach(plugin => {
        name = name.split(".")
        let pluginFn = name.length !== 1 ? plugin[name[0]][name[1]]() : plugin[name[0]](context)

        if (plugins.includes(plugin.name)) {
            pluginFn
        }

        if (plugins === undefined || plugins.length === 0) {
            pluginFn
        }
    })
}

// function initializePlugin(name) {

// }

export {
    registerPlugin,
    initializePlugins,
    fire,
    deactivatePlugin
}