import "../styles/styles.scss"
import initializeRoutes from "./routes"
import Auth from "./store/auth"
import Global from "./store"
// import pluggable from "pluggable.js/src/pluggable.js"

export function initCMS(mount, options) {
    document.title = "SulatCMS"
    initializeRoutes(mount || arguments[0] || document.getElementById('app'))
    options = arguments[1]

    Auth.settings = {
        provider: options.auth.provider,
        netlify_id: options.auth.netlify_id
    }
    Global.domain = options.domain
    Global.repo = options.repo
}

if (process.env.NODE_ENV === "development") {
    initCMS(document.getElementById("sulat"), {
        auth: {
            netlify_id: "7ed5abbf-556c-4bae-982c-225b15c3b997",
            provider: "gitlab"
        },
        repo: "petreanvoice/db"
    }) 
}

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