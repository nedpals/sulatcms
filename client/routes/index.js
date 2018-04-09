import Home from '../views/Home.js'
import Login from '../views/Login.js'
import Editor from '../views/Editor.js'
import App from '../components/App'
import Auth from '../store/auth'

export default function initRoutes(mount) {
    const v = (view, layout) => {
        let rendered = {
            render() {
                return m((layout ? layout : App), m(view))
            }
        }

        return rendered
    }

    return m.route(mount, '/', {
        '/': Login,
        '/home': {
            onmatch() {
                if (!Auth.state.loggedIn) m.route.set("/")
                else return Home
            }
        },
        '/edit/:key': Editor,
        '/new': Editor
    })
}

