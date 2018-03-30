import "spectre.css/src/spectre.scss"
import "spectre.css/src/spectre-exp.scss"
import "spectre.css/src/spectre-icons.scss"
import "../styles/styles.scss"
import routes from "./routes"
import pluggable from "pluggable.js/src/pluggable.js"

// (function () {
//     const mod = this
//     mod.initialize = () => {

//     }

//     mod.registerPlugin = (name, plugin) => {
//         mod.pluginSocket.registerPlugin(name, plugin)
//     }

//     pluggable.enable(mod)

//     const _public = {
//         'initialize': mod.initialize,
//         'registerPlugin': mod.registerPlugin
//     }

//     window.sulat = _public
//     return _public
// }())