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
    return m(".container",
      m(".columns",
        [
          m(".column.p-2.col-2.bg-gray", {style: {"height": "100vh"}},
            [
              m(".text-center",
                [
                  m("figure.avatar.avatar-lg[data-initial='YZ']", {style: {"background-color": "#5755d9"}}),
                  m("h3", "sitename.xyz")
                ]
              ),
              m("ul.nav",
                [
                  m("li.nav-item",
                    m("a[href='#']", "Link")
                  ),
                  m("li.nav-item",
                    m("a[href='#']", "Link")
                  ),
                  m("li.nav-item",
                    m("a[href='#']",
                      "Link"
                    )
                  ),
                  m("li.nav-item",
                    m("a[href='#']",
                      "Link"
                    )
                  ),
                  m("li.nav-item",
                    m("a[href='#']",
                      "Link"
                    )
                  )
                ]
              )
            ]
          ),
          m(".column.p-2.col-10",
            m(".container",
              [
                m("div",
                  [
                    m("h1",
                      "Posts"
                    ),
                    m("button.btn.btn-primary", {onclick: () => {m.route.set("/new")}},
                      [
                        m("i.icon.icon-lg.icon-plus"),
                        "Add new post"
                      ]
                    ),
                    m(".divider")
                  ]
                ),
                m(".columns",
                  m(".column.p-1.m-2.col-12",
                    vnode.state.posts ?
                    vnode.state.posts.map((post) => {
                      return [
                          m("h2", { style: { "margin-bottom": "0" } },
                            m("a", { href: '/edit/' + post.filename, oncreate: m.route.link } ,
                              post.title
                            )
                          ),
                          m("p.text-uppercase.text-gray",
                            `By ${post.author} Filed under: ${post.tags.join(', ')}`
                          )
                      ]
                    }) : null
                  )
                ),
                m(".empty",
                  !vnode.state.posts ?
                  [
                    m(".empty-icon",
                      m("i.icon.icon-4x.icon-mail")
                    ),
                    m("p.empty-title.h5",
                      "You haven't write a single post!"
                    ),
                    m("p.empty-subtitle",
                      "Click the button to express what's on your mind."
                    ),
                    m(".empty-action",
                      m("button.btn.btn-primary",
                        "Add a post"
                      )
                    )
                  ] : null
                ),
                m(".columns",
                )
              ]
            )
          )
        ]
      )
    )
  }
}
