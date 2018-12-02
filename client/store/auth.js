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
    state: Object.assign({}, AuthState),
    settings: {
      provider: '',
      netlify_id: '',
    },
    getCurrentUser() {
      // fire('auth.getUser', (user) => {
      //   Auth.state.user = user
      //   // console.log(user)
      // })
    },
    authenticate(provider) {
      const user = (data, err) => {
        if (err) { this.state.error = err }

        localStorage.setItem("auth_provider", data.provider)
        localStorage.setItem("auth_token", data.token)
        localStorage.setItem("auth_refresh", data.refresh_token)
        // fire('auth.getUser', (user) => {
        //   Auth.state.user = user
        //   // console.log(user)
        // })
        this.loggedIn = true
        m.route.set('/')
      }
      
      fire('auth.authenticate', [provider, user])
    },
    logout() {
      const cb = (fn) => {
        fn()

        localStorage.clear()
        this.loggedIn = false
        this.state = AuthState
        m.route.set('/login') 
      }

      fire('auth.revoke', [cb])
    },
}

export default Auth
