import Authenticator from "netlify-auth-providers/src/netlify"

const Auth = {
    state: {
        error: "",
        loggedIn: false,
        data: {},
        user: {}
    },
    settings: {
        provider: '',
        netlify_id: '',
    },
    init() {
        return new Authenticator({site_id: this.settings.netlify_id})
    },
    authenticate(provider, callback) {
        this.init().authenticate({provider: provider}, (err, data) => {
            if (err) { this.state.error = err }
            this.state.data = data
            callback()
        })
    }
}

export default Auth
