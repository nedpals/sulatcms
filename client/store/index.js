import Auth from "./auth"

const Globals = { 
    domain: '' || window.location.hostname,
    git: {
        user: Auth.user.username,
        repo: "" 
    }
}

export default Globals