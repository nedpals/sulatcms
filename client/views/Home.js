import FileView from '../components/FileView'
import Search from '../components/Search'
import Post from '../store'

export default {
  posts: [
    {
      title: 'Post 1',
      date: '2010-01-01',
      author: 'Ned Palacios',
      tags: ['hello', 'world'],
      filename: 'post-1.md',
      content: '# Hello world!'
    },
    {
      title: 'Post 2',
      date: '2010-01-01',
      author: 'Ned Palacios',
      tags: ['hello', 'world'],
      filename: 'post-2.md',
      content: '## hello rin, in h2'
    }
  ],
  view(vnode) {
    return (
      <div class="container grid-lg">
        <div class="columns">
          <div class="column p-2">
            <div class="container">
              <div class="clearfix">
                <a href="/new" oncreate={m.route.link} class="btn btn-primary float-left"><i class="icon icon-lg icon-plus"></i> Add new post</a>
                <div class="float-right">{m(Search)}</div>
              </div>
              <div class="divider"></div>
              <div>
                <div class="columns">
                  <div class="column py-1 my-2 col-12">
                    {vnode.state.loading ? (<div class="loading loading-lg text-center"></div>)
                      : (Post.state.posts.length > 0 ?
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
              ) : null}
              <div class="columns">

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
