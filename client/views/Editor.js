import SimpleMDE from 'simplemde'
import "simplemde/dist/simplemde.min.css"
import store from "../store"
import format from "date-fns/format"
import OffCanvas from "../components/OffCanvas"

export default {
  post: {
    title: '',
    date: format(Date.now(), 'YYYY-MM-DD'),
    author: '',
    tags: [],
    filename: '',
    content: ''
  },
  setContent(content) {
    this.post.content = content
  },
  setValue(field, value) {
    this.post[field] = value
  },
  oninit(vnode) {
    vnode.state.post = store.state.posts.find(post => post.filename === vnode.attrs.key) || vnode.state.post
  },
  oncreate(vnode) {
    const md = this.initEditor(document.getElementById("cms-editor"), vnode.state.post.content)
    md.codemirror.focus()
    md.codemirror.setCursor(100)
    md.codemirror.on("change", () => {
      const val = this.md.value()
      vnode.dom.childNodes[1].oninput = this.setContent(val)
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
  view(vnode) {
    return m(OffCanvas, {customClass: "editor-view"}, (
      <div class="container grid-md editor">
        <form class="form-horizonal columns">
        </form>
      </div>
    )
  }
}
