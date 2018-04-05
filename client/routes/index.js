import Home from '../views/Home.js'
import Login from '../views/Login.js'
import Editor from '../views/Editor.js'
import App from '../components/App'

const app = document.getElementById("app")

const v = (view, layout) => {
    let rendered = {
        render() {
            return m((layout ? layout : App), m(view))
        }
    }

    return rendered
}

export default m.route(app, '/', {
    '/': v(Home),
    '/login': Login,
    '/edit/:key': Editor,
    '/new': Editor
})

