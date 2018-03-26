const m = require('mithril')
import "spectre.css/src/spectre.scss"
import "spectre.css/src/spectre-icons.scss"
import "../static/styles.scss"
import Home from './views/Home.js'
import Login from './views/Login.js'
import Editor from './views/Editor.js'
import App from './components/App'

const app = document.getElementById("app")

const v = (view, layout) => {
    let rendered = {
        render() {
            return m((layout ? layout : App), m(view))
        }
    }

    return rendered
}

m.route(app, '/', {
    '/': v(Home),
    '/login': v(Login),
    '/edit/:filename': Editor,
    '/new': Editor
})

