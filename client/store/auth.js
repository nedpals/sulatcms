import Authenticator from "netlify-auth-providers/src/netlify"

const Auth = {
    state: {
        error: "",
        data: {}
    },
    init() {
        return new Authenticator({site_id: "nedpals-blog"})
    },
    authenticate(provider, scope, callback) {
        this.init().authenticate({provider: provider, scope: scope}, (err, data) => {
            if (err) { this.state.error = err }
            this.state.data = data
            callback
        })
    }
}

export default Auth
