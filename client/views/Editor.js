export default m({
  view: () => {
    return m(".container[id='cms-editor']",
      m("textarea[v-html='post($route.params.filename).content']")
    )
  }
})
