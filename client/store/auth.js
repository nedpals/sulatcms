import Authenticator from "netlify-auth-providers/src/netlify"
import { gitApi, gitDo } from "../modules/git";

const AuthState = Object.freeze({
  error: "",
  data: {
    provider: "",
    token: "",
    refresh_token: ""
  },
  user: {
    handle: "",
    name: {
      sliceName(name) { name.slice(" ") },
      first: "",
      last: "",
      full: ""
    },
    avatar: "",
    email: "",
    user_id: ""
  }
})

let Auth = {
    loggedIn: false,
    state: Object.assign({}, AuthState),
    settings: {
      provider: '',
      netlify_id: '',
    },
    init() {
      return new Authenticator({ site_id: this.settings.netlify_id })
    },
    getCurrentUser() {
      if (!this.state.user) {
        gitDo(gitApi.endpoints[localStorage.getItem("auth_provider")].getCurrentUser())
        .then((currentUser) => {
          this.state.user = {
            handle: currentUser.username,
            name: {
              first: sliceName(currentUser.name)[0],
              last: sliceName(currentUser.name)[1],
              full: currentUser.name
            },
            avatar: currentUser.avatar_url,
            email: currentUser.email,
            user_id: currentUser.id
          }
        })
      }
    },
    logout() {
      localStorage.clear()
      this.loggedIn = false
      this.state = AuthState
      m.route.set('/login')
    },
    authenticate(provider, callback) {
      this.init().authenticate({ provider: provider, scope: gitApi.defaults[provider].scopes }, (err, data) => {
          if (err) { this.state.error = err }
          localStorage.setItem("auth_provider", data.provider)
          localStorage.setItem("auth_token", data.token)
          localStorage.setItem("auth_refresh", data.refresh_token)
          this.state.data = data
          this.loggedIn = true
          callback()
          this.getCurrentUser()
      })
    }
}

export default Auth
