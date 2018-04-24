import "../styles/styles.scss"
import Routes from "./routes"
import Auth from "./store/auth"
import Global from "./store"

import pluggable from "pluggable.js/src/pluggable.js"

const app = () => { this }
app.initialize = (mount, options) => {
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

app.registerPlugin = (name, plugin) => {
  app.pluginSocket.registerPlugin(name, plugin)
}

pluggable.enable(app)

const _public = {
  initialize: app.initialize,
  registerPlugin: app.registerPlugin
}

module.exports = _public
