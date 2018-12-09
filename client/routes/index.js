import * as View from '../views'
import App from '../components/App'
import Auth from '../store/auth'

export default function initRoutes(mount) {
  const v = (view, layout) => {
    return m((layout ? layout : App), view)
  }

  return m.route(mount, '/', {
    '/': {
      onmatch(args, requestedPath) {
        if (!localStorage.getItem("auth_token")) m.route.set('/login')
        else m.route.set('/dashboard')
      }
    },
    '/dashboard': {
      onmatch(args, requestedPath) {
        if (!localStorage.getItem("auth_token")) m.route.set('/login')
        else return View.Home
      },
      render(vnode) {
        return v(vnode)
      }
    },
    '/login': {
      onmatch(args, requestedPath) {
        if (localStorage.getItem("auth_token")) m.route.set('/dashboard')
        else return View.Login
      },
      render(vnode) {
        return vnode
      }
    },
    '/edit/:key': {
      onmatch(args, requestedPath) {
        if (!localStorage.getItem("auth_token")) m.route.set('/login')
        else return View.Editor
      },
      render(vnode) {
        return vnode
      }
    },
    '/new': {
      onmatch(args, requestedPath) {
        if (!localStorage.getItem("auth_token")) m.route.set('/login')
        else return View.Editor
      },
      render(vnode) {
        return vnode
      }
    }
  })
}

