import Search from '../components/Search'
import Container from '../components/HomeContainer'
import Post from '../store/post'

export default {
  searchText: "",
  setSearch(s) {
    this.searchText = s
  },
  oninit() {
    Post.actions.refreshList()
  },
  oncreate() {
    m.redraw()
  },
  view(vnode) {
    return m(Container, (
      <div>
        <div class="clearfix">
          <div class="float-left">
            <a href="/new" oncreate={m.route.link} class="btn btn-primary">
              <i class="icon icon-lg icon-plus"></i>
              Add new post
          </a>
            <button class="btn btn-primary" onclick={() => { Post.actions.refreshList() }}>Refresh List</button>
          </div>
          <div class="float-right">
            <div class="has-icon-left">
              <input type="text"
                class="form-input"
                placeholder="..."
                value={vnode.state.searchText}
                oninput={m.withAttr("value", (s) => { this.setSearch(s) })}
              />
              <i class="form-icon icon icon-search"></i>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div>
          <div class="columns">
            <div class="column py-1 my-2 col-12">
              {Post.state.posts.error ? [
                <div class="toast toast-primary">
                  <button class="btn btn-clear float-right"></button>
                  {Post.state.posts.error}
                </div>
              ] : Post.state.posts ?
                  Post.state.posts.map((post) => {
                    return [
                      <div key={post.filename}>
                        <h2 style="margin-bottom:0;">
                          <a href={"/edit/" + post.filename} oncreate={m.route.link}>{post.title}</a>
                        </h2>
                        <p class="text-uppercase text-gray">By {post.author} Filed under: {post.tags}</p>
                      </div>
                    ]
                  }) :
                  (<div class="loading loading-lg text-center"></div>)
              }
            </div>
          </div>
        </div>
      </div>
    ))
  }
}
