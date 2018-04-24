export default {
  oncreate(vnode) {
    const md = this.initEditor(document.getElementById("cms-editor"), vnode.state.post.contents)
    md.codemirror.focus()
    md.codemirror.setCursor(100)
    md.codemirror.on("change", () => {
      const val = this.md.value()
      vnode.dom.childNodes[1].oninput = vnode.attrs.setContent(val)
    })
    this.md = md
    m.redraw()
  },
  initEditor(el, val) {
    return new SimpleMDE({
      element: el,
      initialValue: val,
      spellChecker: false,
      placeholder: "Type here...",
      toolbarTips: false,
      status: false,
      autoDownloadFontAwesome: true,
      forceSync: true
    })
  },
  view() {
    <textarea id="cms-editor"></textarea>
  }
}
