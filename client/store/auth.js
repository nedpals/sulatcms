import { fire } from "../modules/pluginSystem"

const AuthState = Object.freeze({
  error: "",
  data: {
    provider: localStorage.getItem('auth_provider'),
    token: localStorage.getItem('auth_token'),
    refresh_token: localStorage.getItem('auth_refresh')
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
    state: {...AuthState},
    settings: {
      provider: '',
      netlify_id: '',
    },
    getCurrentUser() {
      return new Promise((resolve, reject) => {
        fire('auth.getUser', [(user, err) => {
          if (user || err) {
            user && resolve(user)
            err && reject(Error(err))
          }
        }])
      })
        .then(user => {
          Auth.state.user = user
        })
        .catch(err => console.error(err))
    },
    authenticate(provider) {
      return new Promise((resolve, reject) => {
        fire('auth.authenticate', [provider, (data, err) => {
          if (data || err) {
            data && resolve(data)
            err && reject(Error(err))
          }
        }])
      })
        .then(data => {
          localStorage.setItem("auth_provider", data.provider)
          localStorage.setItem("auth_token", data.token)
          localStorage.setItem("auth_refresh", data.refresh_token)
          this.loggedIn = true
          this.getCurrentUser()
          m.route.set('/dashboard')
          m.redraw()
        })
        .catch(err => {
          this.state.error = err
        })
    },
    logout(e) {
      e.preventDefault()
      
      localStorage.clear()
      Auth.state = AuthState
      Auth.loggedIn = false
      m.route.set('/login') 
      m.redraw()
    },
}

export default Auth
