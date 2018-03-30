import FileView from "./FileView"

export default {
    options: {
        showMenu: false
    },
    toggleMenu() {
        this.options.showMenu = !this.options.showMenu
        console.log(this.options.showMenu)
    },
    view(vnode) {
        return (
            <div class={`off-canvas${vnode.attrs.customClass ? " " + vnode.attrs.customClass : "" }`}>
                <div class="off-canvas-toggle">
                    <button class="btn btn-primary btn-action" onclick={() => { this.toggleMenu() }}>
                        <i class="icon icon-menu"></i>
                    </button>
                    <a href="/" class="btn btn-primary" oncreate={m.route.link}>
                        Back to home
                    </a>
                </div>

                <div class={`off-canvas-sidebar ${vnode.state.options.showMenu ? "active" : ""}`}>
                    {m(FileView, {post_id: vnode.attrs.currentId})}
                </div>

                <button class="off-canvas-overlay" onclick={() => {this.toggleMenu()}}></button>
                
                <div class="off-canvas-content">
                    {vnode.children}
                </div>
            </div>
        )
    }
}