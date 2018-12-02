import "../styles/styles.scss"
import { initialize } from "./cms"
import { registerPlugin } from "./modules/pluginSystem"
import testPlugin from "./plugins/test"
import gitPlugin from "./plugins/git/plugin"

const _public = {
  initialize,
  registerPlugin
}

module.exports = _public

if (process.env.NODE_ENV === "development") {
  document.addEventListener("DOMContentLoaded", () => {
    testPlugin()
    gitPlugin()

    initialize({
      auth: {
        netlify_id: "7ed5abbf-556c-4bae-982c-225b15c3b997",
        provider: "gitlab"
      },
      repo: "petreanvoice/db"
    }, document.getElementById("app"))
  })
}
