import SimpleMDE from 'simplemde'
import "simplemde/dist/simplemde.min.css"

export default {
  oncreate(vnode) {
    const md = this.initEditor(document.getElementById("cms-editor"), vnode.state.post.content)
    md.codemirror.focus()
    md.codemirror.setCursor(100)
    md.codemirror.on("change", () => {
      const val = this.md.value()
      vnode.dom.childNodes[1].oninput = this.setContent(val)
    })
    this.md = md
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
                <textarea id="cms-editor"></textarea>
  }
}
