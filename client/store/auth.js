import Authenticator from "netlify-auth-providers/src/netlify"
import { defaults } from "../modules/git";

const Auth = {
    state: {
        error: "",
        loggedIn: false,
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
        return new Authenticator({site_id: this.settings.netlify_id})
    },
    authenticate(provider, callback) {
        this.init().authenticate({provider: provider, scopes: defaults[provider].scopes }, (err, data) => {
            if (err) { this.state.error = err }
            this.state.data = data
            callback()
            m.request({
                method: "GET",
                url: `${"https://gitlab.com/api/v4/"}user`,
                headers: {
                    'Authorization': 'Bearer ' + this.state.data.token
                }
            })
            .then((currentUser) => {
                this.state.loggedIn = true
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
