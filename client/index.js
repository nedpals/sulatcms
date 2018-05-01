import "../styles/styles.scss"
import Routes from "./routes"
import Auth from "./store/auth"
import Global from "./store"
import pluggable from "pluggable.js/src/pluggable.js"
const app = {}

app.printMsg = msg => console.log(msg)
app.initialize = (options, mount = document.body) => {
  document.title = "SulatCMS"
  Routes(mount)
  Auth.settings = {
    provider: options.auth.provider,
    netlify_id: options.auth.netlify_id
  }
  Global.domain = options.domain
  Global.repo = options.repo
  app.pluginSocket.initializePlugins()
}
app.registerPlugin = (name, plugin) => app.pluginSocket.registerPlugin(name, plugin)

pluggable.enable(app)

const _public = {
  initialize: app.initialize,
  registerPlugin: app.registerPlugin
}

module.exports = _public

if (process.env.NODE_ENV === "development") {
  app.initialize({
    auth: {
      netlify_id: "7ed5abbf-556c-4bae-982c-225b15c3b997",
      provider: "gitlab"
    },
    repo: "petreanvoice/db"
  }, document.getElementById("app"))
}
