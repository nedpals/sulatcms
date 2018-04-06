import store from '../store/post'

export default {
  view(vnode) {
    return (
      <div class="column p-2 bg-gray" style="height:100vh;">
        <a class="btn btn-primary btn-lg btn-block" href="/new" oncreate={m.route.link}>New</a>
        <ul class="nav">
          {
          store.state.posts.map((post) => {
            return [
              <li class={`nav-item ${post.filename === vnode.attrs.post_id ? "active" : ""}`}>
                <a href={`/edit/${post.filename}`} oncreate={m.route.link}>
                  {post.filename}
                </a>
              </li>
            ]
          })
          }
        </ul>
      </div>
    )
  }
}
