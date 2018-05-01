import Auth from "../store/auth"
import logo from "../../static/logo.png"

export default {
  login() {
      Auth.authenticate(Auth.settings.provider, () => {
        Auth.loggedIn = true
        m.route.set('/')
      })
  },
  view(vnode) {
    return (
      <div class="login-page" style="margin-top:6rem;">
        <div class="columns">
          <div class="column col-4 col-mx-auto">
            <div class="panel bg-white">
              <div class="panel-header">
                <div class="panel-title text-center">
                  <h1 class="my-1"><img src={logo} class="img-responsive" />Welcome</h1>
                </div>
              </div>
              <div class="panel-footer login-options">
                <div class="divider text-center" data-content="LOGIN WITH"></div>
                <button class="btn btn-block btn-lg btn-primary" onclick={() => { this.login() }}>{Auth.settings.provider}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
