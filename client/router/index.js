import Home from '../views/Home'
import Login from '../views/Login'
import Editor from '../views/Editor'

const app = document.getElementById("app")

export default m.route(app, '/', {
  '/': Home,
  '/login': Login,
  '/edit/:filename': Editor
})
