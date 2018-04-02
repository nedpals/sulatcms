import FileView from '../components/FileView'
import Search from '../components/Search'
import Post from '../store/post'

export default {
  loading: false,
  searchText: "",
  setSearch(s) { 
    this.searchText = s
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
                           oninput={m.withAttr("value", (s) => {this.setSearch(s)})} 
                    />
                    <i class="form-icon icon icon-search"></i>
                  </div>
                </div>
              </div>
              <div class="divider"></div>
              <div>
                <div class="columns">
                  <div class="column py-1 my-2 col-12">
                    {vnode.state.loading ? (<div class="loading loading-lg text-center"></div>)
                      : (Post.state.posts.length >= 1 ?
                        Post.state.posts.map((post) => {
                          return [
                            <div key={post.filename}>
                              <h2 style="margin-bottom:0;">
                                <a href={"/edit/" + post.filename} oncreate={m.route.link}>{post.title}</a>
                              </h2>
                              <p class="text-uppercase text-gray">By {post.author} Filed under: {post.tags.join(', ')}</p>
                            </div>
                          ]
                        }) : (
                          <div class="empty">
                            <div class="empty-icon">
                              <i class="icon icon-4x icon-mail"></i>
                            </div>
                            <p class="empty-title h5">You haven't write a single post!</p>
                          </div>
                        ))
                    }
                  </div>
                </div>
              </div>
              <div class="columns">

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
