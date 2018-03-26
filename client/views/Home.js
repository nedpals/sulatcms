import FileView from '../components/FileView'

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
      <div class="container">
        <div class="columns">
          {m(FileView)}
          <div class="column p-2 col-10">
            <div class="container">
              <div>
                <a href="/new" oncreate={m.route.link} class="btn btn-primary"><i class="icon icon-lg icon-plus"></i> Add new post</a>
                <div class="divider"></div>
              </div>
              <div>
                <div class="columns">
                  <div class="column p-1 m-2 col-12">
                    {vnode.state.posts ?
                    vnode.state.posts.map((post) => {
                      return [
                        <div key={post.filename}>
                          <h2 style="margin-bottom:0;">
                            <a href={"/edit/" + post.filename} oncreate={m.route.link}>{post.title}</a>
                          </h2>
                          <p class="text-uppercase text-gray">By {post.author} Filed under: {post.tags.join(', ')}</p>
                        </div>
                      ]
                    }) : null}
                  </div>
                </div>
              </div>
              {!vnode.state.posts ?
              (
                <div class="empty">
                  <div class="empty-icon">
                    <i class="icon icon-4x icon-mail"></i>
                  </div>
                  <p class="empty-title h5">You haven't write a single post!</p>
                  <p class="empty-subtitle">Click the button to express what's on your mind</p>
                  <div class="empty-action">
                    <button class="btn btn-primary">Add a post</button>
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
