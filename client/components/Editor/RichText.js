import SimpleMDE from "simplemde"

export default {
  target: "contents",
  oncreate(vnode) {
    const md = this.initEditor(document.getElementById("cms-editor"), vnode.attrs.value)
    md.codemirror.focus()
    md.codemirror.setCursor(100)
    md.codemirror.on("change", () => {
      vnode.dom.oninput = vnode.attrs.onchange(md.value())
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
