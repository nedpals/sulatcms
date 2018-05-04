import Navbar from './Navbar'
import FileView from './FileView'
import Auth from '../store/auth'
import Post from '../store/post'

export default {
    oninit() {
      Auth.getCurrentUser()
      Post.actions.refreshList()
    },
    view(vnode) {
        return (
            <div>
                {m(Navbar)}
                <div class="layout">
                    {vnode.children}
                </div>
            </div>
        )
    }
}
