import SimpleMDE from "simplemde"

export default {
  target: "contents",
  oncreate(vnode) {
    const md = this.initEditor(document.getElementById("cms-editor"), vnode.attrs.content)
    md.codemirror.focus()
    md.codemirror.setCursor(100)
    md.codemirror.on("change", () => {
      const val = md.value()
      vnode.dom.oninput = vnode.attrs.setContent(val)
    })
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
    return (
      <textarea id="cms-editor"></textarea>
    )
  }
}
