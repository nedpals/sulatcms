import Auth from "../store/auth"
export default {
  login(provider) {
      Auth.authenticate(Auth.settings.provider, () => {
        console.log(Auth.state.data)
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
                  <h1 class="my-1"><img src="../static/logo.png" class="img-responsive" />Welcome</h1>
                </div>
              </div>
              <div class="panel-footer login-options">
                <div class="divider text-center" data-content="LOGIN WITH"></div>
                <button class="btn btn-block btn-lg btn-primary" onclick={() => { this.login(Auth.settings.provider) }}>{Auth.settings.provider}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}