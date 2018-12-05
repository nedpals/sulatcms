import Routes from "./routes"
import Auth from "./store/auth"
import Global from "./store"
import { initializePlugins, fire } from "./modules/pluginSystem"

function initialize(options, mount = document.body) {
  document.title = "SulatCMS"
  Routes(mount)
  // Auth.settings = {
  //   provider: options.auth.provider,
  //   netlify_id: options.auth.netlify_id
  // }

  Object.keys(options).map(option => {
    if (option.includes('auth')) {
      Object.keys(options[option]).map(authOpt => {
        Auth.settings[authOpt] = options[option][authOpt]
      })
    }
    
    if (!option.includes('auth') && typeof (options[option]) === 'object') {
      Object.keys(options[option]).map(nestedOpt => {
        Global[option][nestedOpt] = options[option][nestedOpt] || (Global[option][nestedOpt] || "")
      })
    }

    Global[option] = options[option] || (Global[option] || "")
  })
  
  initializePlugins()

  const settings = Auth.settings
  fire('auth.initialize', [settings])
}

export {
  initialize
}
