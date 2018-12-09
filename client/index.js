import "../styles/styles.scss"
import { initialize } from "./cms"
import { registerPlugin } from "./modules/pluginSystem"

const _public = {
  initialize,
  registerPlugin
}

module.exports = _public