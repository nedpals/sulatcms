import { gitApi, gitDo } from "./git"
import Authenticator from "netlify-auth-providers/src/netlify"

let site_id = ''
const authenticator = () => new Authenticator({ site_id: site_id })

export default {
    auth: {
        initialize(settings) {
            site_id = settings.netlify_id
        },
        authenticate(provider, user) {
            authenticator().authenticate({ 
                provider: provider, 
                scope: gitApi.defaults[provider].scopes 
            }, (err, data) => {
                if (err) { user(null, err) }
                user(data, null)
            })
        },
        getUser(user) {
            gitDo(gitApi.endpoints[localStorage.getItem("auth_provider")].getCurrentUser())
            .then((currentUser) => {
                return {
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
            .then(profile => user(profile))
        },
        revoke(cb) {
            cb(() => {
                console.log("User logged out")
            })
        }
    }
}