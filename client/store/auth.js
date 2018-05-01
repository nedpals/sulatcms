import Authenticator from "netlify-auth-providers/src/netlify"
import { gitApi } from "../modules/git";

let Auth = {
    loggedIn: false,
    state: {
      error: "",
      data: {
          provider: "",
          token: "",
          refresh_token: ""
      },
      user: {
          handle: "",
          name: {
              first: "",
              last: "",
              full: ""
          },
          avatar: "",
          email: "",
          user_id: ""
      }
    },
    settings: {
      provider: '',
      netlify_id: '',
    },
    init() {
      return new Authenticator({ site_id: this.settings.netlify_id })
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
          m.request({
              method: "GET",
              url: `${gitApi.defaults[provider].base_url}/user`,
              headers: gitApi.defaults[provider].headers(data.token)
          })
          .then((currentUser) => {
              this.state.user = {
                  handle: currentUser.username,
                  name: {
                      first: currentUser.name.slice(" ")[0],
                      last: currentUser.name.slice(" ")[1],
                      full: currentUser.name
                  },
                  avatar: currentUser.avatar_url,
                  email: currentUser.email,
                  user_id: currentUser.id
              }
          })
      })
    }
}

export default Auth
