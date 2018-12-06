import Search from '../components/Search'
import Container from '../components/HomeContainer'
import Post from '../store/post'
import { fire } from '../modules/pluginSystem'
import Auth from '../store/auth';

export default {
  searchText: "",
  setSearch(s) {
    this.searchText = s
  },
  posts() {
    return this.searchText ? Post.getters.searchPost(this.searchText) : Post.state.posts
  },
  oninit() {
    Post.actions.refreshList()
  },
  onupdate() {
    m.redraw()
  },
  oncreate() {
    fire('home.initialize')
    m.redraw()
  },
  view() {
    return m(Container, (
      <div>
        <div class="clearfix">
          <div class="float-left">
            <a href="#!/new" class="btn btn-primary">
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
                value={this.searchText}
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
              ] : !Post.state.isLoading ?
                  this.posts().map((post) => {
                    return [
                      <div key={post.filename}>
                        <h2 style="margin-bottom:0;">
                          <a href={"#!/edit/" + post.filename}>{post.metadata.title}</a>
                        </h2>
                        <p class="text-uppercase text-gray">By {post.author} Filed under: {post.metadata && (post.metadata.tags || post.metadata._tags).join(", ")}</p>
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
