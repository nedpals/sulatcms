export default {
  view(vnode) {
    return (
      <div class="container grid-lg">
        <div class="columns">
          <div class="column p-2">
            <div class="container">
              {vnode.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
