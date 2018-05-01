import * as View from '../views'
import App from '../components/App'
import Auth from '../store/auth'

export default function initRoutes(mount) {
  const v = (view, layout) => {
    return m((layout ? layout : App), view)
  }

  const auth = localStorage.getItem("auth_token") || Auth.loggedIn

  return m.route(mount, '/', {
    '/': {
      onmatch(args, requestedPath) {
        if (!auth) return m.route.set('/login')
        else return View.Home
      },
      render(vnode) {
        return v(vnode)
      }
    },
    '/login': {
      onmatch(args, requestedPath) {
        if (auth) return m.route.set('/')
        else return View.Login
      },
      render(vnode) {
        return vnode
      }
    },
    '/edit/:key': {
      onmatch(args, requestedPath) {
        if (!auth) return m.route.set('/login')
        else return View.Editor
      },
      render(vnode) {
        return vnode
      }
    },
    '/new': {
      onmatch(args, requestedPath) {
        if (!auth) return m.route.set('/login')
        else return View.Editor
      },
      render(vnode) {
        return vnode
      }
    }
  })
}

