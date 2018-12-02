import gitlab from "./hooks/gitlab"
import github from "./hooks/github"

export default {
    hooks: (localStorage.getItem('auth_provider') === 'gitlab' ? gitlab : github)
}