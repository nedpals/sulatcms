import Auth from "../store/auth"

export default {
  providers: [
    {
      type: "github",
      scope: "user"
    },
    {
      type: "gitlab",
      scope: "user"
    }
  ],
  login(provider, scope) {
    Auth.authenticate(provider, scope, () => {
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
                  <h1>Welcome</h1>
                </div>
              </div>
              <div class="panel-footer login-options">
                <div class="divider text-center" data-content="LOGIN WITH"></div>
                {vnode.state.providers.map((provider) => {
                  return (
                    <button class="btn btn-block btn-lg btn-primary" onclick={() => { this.login(provider.type, provider.scope) }}>{provider.type}</button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}