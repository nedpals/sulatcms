export default m({
  view: function() {
    return m("div", {style: "margin-top: 6rem;"}, [
      m(".columns", [
        m("column.col-4.col-mx-auto" [
          m("panel.bg-white" [
            m(".panel-header" [
              m("panel-title.text-center",
                m("h1", "welcome"))
            ]),
            m(".panel-footer",
              m("button", {class: "btn btn-block btn-lg btn-primary"}, "Login with Github"))
          ])
        ])
      ])
    ])
  }
})
