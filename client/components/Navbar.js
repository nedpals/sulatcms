export default {
    menuActive: false,
    toggleMenu() {
        this.menuActive = !this.menuActive
    },
    view(vnode) {
        return (
            <header class="navbar sulat-navbar px-2 py-1">
                <section class="navbar-section">
                    <span class="p-2">domain.tld</span>
                </section>
                <section class="navbar-center">
                    <h1 class="m-0">Sulat</h1>
                </section>
                <section class="navbar-section">
                    <div class={`dropdown dropdown-right ${vnode.state.menuActive ? "active" : ""}`}>
                        <button onclick={() => {this.toggleMenu()}} class="btn btn-link p-0" tabindex="0">
                            <span class="mr-2">User</span>
                            <figure class="avatar p-2" data-initial="YZ" style="background-color: #5755d9;"></figure>
                            <i class="icon icon-caret"></i>
                        </button>

                        <ul class="menu">
                            <li class="menu-item">
                                <div class="tile tile-centered">
                                    <div class="tile-icon">
                                        <img src="img/avatar-4.png" class="avatar" alt="Avatar" />
                                    </div>
                                    <div class="tile-content">
                                        Steve Rogers
                                    </div>
                                </div>
                            </li>
                            <li class="divider"></li>
                            <li class="menu-item">
                                <div class="menu-badge">
                                <label class="label label-primary">2</label>
                                </div>
                                <a href="#menus" class="active">
                                My profile
                                </a>
                            </li>
                            <li class="menu-item">
                                <a href="#menus">
                                Settings
                                </a>
                            </li>
                            <li class="menu-item">
                                <a href="#menus">
                                Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </header>
        )
    }
}