import pluggable from "pluggable.js/src/pluggable.js"
import Routes from "./routes"
import Auth from "./store/auth"
import Global from "./store"

const app = {
  printMsg(msg) {
    console.log(msg)
  },
  initialize(options, mount = document.body) {
    document.title = "SulatCMS"
    Routes(mount)
    Auth.settings = {
      provider: options.auth.provider,
      netlify_id: options.auth.netlify_id
    }
    Global.domain = options.domain
    Global.repo = options.repo
    this.pluginSocket.initializePlugins()
  },
  registerPlugin(name, plugin) {
    this.pluginSocket.registerPlugin(name, plugin)
  }
}

pluggable.enable(app)

const initialize = (o, m) => app.initialize(o, m)
const registerPlugin = (n, p) => app.registerPlugin(n, p)

export {
  initialize,
  registerPlugin
}
