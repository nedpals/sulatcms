import Routes from "./routes"
import Auth from "./store/auth"
import Global from "./store"
import { initializePlugins, fire } from "./modules/pluginSystem"

function initialize(options, mount = document.body) {
  document.title = "SulatCMS"
  initializePlugins()
  Routes(mount)
  Auth.settings = {
    provider: options.auth.provider,
    netlify_id: options.auth.netlify_id
  }
  Global.domain = options.domain
  Global.repo = options.repo
  Global.branch = options.branch || "master"

  const settings = Auth.settings
  fire('auth.initialize', [settings])
}

export {
  initialize
}
