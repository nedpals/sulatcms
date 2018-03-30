import Navbar from './Navbar'
import FileView from './FileView' 
export default {
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