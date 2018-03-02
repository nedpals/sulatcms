export default m({
  view: () => {
    return m(".container",
      m(".columns",
        [
          m(".column.p-2.col-2.bg-gray", {style: {"height": "100vh"}},
            [
              m(".text-center",
                [
                  m("figure.avatar.avatar-lg[data-initial='YZ']", {style: {"background-color": "#5755d9"}}),
                  m("h3",
                    "sitename.xyz"
                  )
                ]
              ),
              m("ul.nav",
                [
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
                    m("button.btn.btn-primary",
                      [
                        m("i.icon.icon-lg.icon-plus"),
                        "Add new post"
                      ]
                    ),
                    m(".divider")
                  ]
                ),
                m("[v-if='posts']",
                  m(".columns",
                    m(".column.p-1.m-2.col-12[:key='index'][v-for='(post, index) in posts']",
                      [
                        m("h2", {style: {"margin-bottom": "0"}},
                          m("router-link[:to='{ name: \'Edit\', params: { filename: post.filename } }']",
                            "{{ post.title }}"
                          )
                        ),
                        m("p.text-uppercase.text-gray",
                          "By {{ post.author }} Filed under: {{ post.tags }}"
                        )
                      ]
                    )
                  )
                ),
                m("[v-else='']",
                  m(".empty",
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
                    ]
                  )
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
})
