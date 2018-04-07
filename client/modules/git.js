import Auth from "../store/auth"
import Global from "../store"
import Post from "../store/post"

const defaults = {
    github: {
        base_url: "https://api.github.com/",
        headers: {
            'Accept': 'application/vnd.github.v3+json',
            'Authorization': 'Bearer ' + Auth.state.data.token
        }
    },
    gitlab: {
        base_url: "https://gitlab.com/api/v4/",
        scopes: "api,read_user,sudo,read_registry",
        headers: {
            'Authorization': 'token ' + Auth.state.data.token
        }
    },
    bitbucket: {
        base_url: "https://api.bitbucket.org/2.0/",
        headers: {
            'Authorization': 'Bearer ' + Auth.state.data.token
        }
    }
}

const endpoints = {
    gitlab: {
        fetch(type, options) {
            return {
                type: type,
                path: "/projects/:repo/repository/tree",
                data: { repo: `${Global.git.user}/${Global.git.repo}` }
            }
        }
    },
    github: {
        fetch(type, options) {
            return {
                type: type,
                path: "",
                data: {}
            }
        },
        push() {
            path: "/"
        }
    }
}

function git(provider, endpoint) {
   return "work in progress" 
}

export { defaults, endpoints, git }