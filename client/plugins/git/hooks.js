import gitlab from "./hooks/gitlab"
import github from "./hooks/github"



export default function() {
    let provider = localStorage.getItem('auth_provider')
    
    if (provider === 'gitlab') {
        return gitlab
    }

    if (provider === 'github') {
        return github
    }
}