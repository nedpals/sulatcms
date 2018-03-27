import store from '../store'

export default {
  options: {
    show: false
  },
  view() {
    return (
      <div class="column p-2 col-2 bg-gray" style="height:100vh;">
        <ul class="nav">
          {
          store.state.posts.map((post) => {
            return [
              <li class="nav-item"><a href={`/edit/${post.filename}`} oncreate={m.route.link}>{post.filename}</a></li>
            ]
          })
          }
        </ul>
      </div>
    )
  }
}
