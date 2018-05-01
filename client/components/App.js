import Navbar from './Navbar'
import FileView from './FileView'
export default {
    oninit() {
      auth.getCurrentUser()
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
