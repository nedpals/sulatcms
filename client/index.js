import * as m from 'mithril'
import "spectre.css/src/spectre.scss"
import "spectre.css/src/spectre-icons.scss"
import Home from './views/Home.js'
import Login from './views/Login.js'
import Editor from './views/Editor.js'

const app = document.getElementById("app")

m.route(app, '/', {
    '/': Home,
    '/login': Login,
    '/edit/:filename': Editor,
    '/new': Editor
})

