import FileView from '../components/FileView'
import Search from '../components/Search'
import Post from '../store/post'
import auth from '../store/auth'
import App from '../components/App'

export default {
  loading: false,
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
    return (
      <div class="container grid-lg">
        <div class="columns">
          <div class="column p-2">
            <div class="container">
              <div class="clearfix">
                <a href="/new" oncreate={m.route.link} class="btn btn-primary float-left"><i class="icon icon-lg icon-plus"></i> Add new post</a>
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
                    {Post.state.posts.error ? Post.state.posts.error :
                      Post.state.posts === [] ? (<div class="loading loading-lg text-center"></div>) :
                        Post.state.posts.map((post) => {
                          return [
                            <div key={post.filename}>
                              <h2 style="margin-bottom:0;">
                                <a href={"/edit/" + post.filename} oncreate={m.route.link}>{post.title}</a>
                              </h2>
                              <p class="text-uppercase text-gray">By {post.author} Filed under: {post.tags}</p>
                            </div>
                          ]
                        })
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
