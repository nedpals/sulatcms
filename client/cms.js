import Routes from "./routes"
import Auth from "./store/auth"
import Global from "./store"
import { initializePlugins, fire } from "./modules/pluginSystem"
import gitPlugin from "./plugins/git/plugin"

function initialize(options, mount = document.body) {
  document.title = "SulatCMS"
  Routes(mount)
  
  Object.keys(options).map(option => {
    if (typeof (options[option]) === 'object') {
      if (option.includes('auth')) {
        Object.keys(options[option]).map(authOpt => {
          Auth.settings[authOpt] = options[option][authOpt]
        })
      } else {
        Object.keys(options[option]).map(nestedOpt => {
          Global[option][nestedOpt] = options[option][nestedOpt] || (Global[option][nestedOpt] || "")
        })
      }
    }

    Global[option] = options[option] || (Global[option] || "")
  })
  
  initializePlugins([
    gitPlugin
  ])

  const settings = Auth.settings
  fire('auth.initialize', [settings])
}

export {
  initialize
}
