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
    return m(OffCanvas, {customClass: "editor-view", currentId: vnode.state.post.filename}, (
      <div class="container grid-md editor">
        <form class="form-horizonal columns">
          {Object.entries(vnode.state.post).map((fields) => {
            return (
              <div
                class={`form-group column ${(fields[0] === "title" ? "col-12 col-sm-12" :
                  (fields[0] === "content" ? "col-12 col-sm-12" :
                    `col-${Math.floor(12 / (Object.keys(vnode.state.post).length - 2))} col-md-${Math.floor(12 / (Object.keys(vnode.state.post).length - 4))} col-sm-12`))}`}>
                {fields[0] === "content" ?
                  (
                    <textarea id="cms-editor"></textarea>
                  ) : (
                    <div>
                      {fields[0] === "title" ? null : (<label class="form-label">{fields[0].charAt(0).toUpperCase() + fields[0].slice(1)}</label>)}
                      <input type="text"
                        placeholder={`Insert ${fields[0]} here...`}
                        class={`form-input ${fields[0] + "-field"} ${(fields[0] === "title" ? "h1 input-lg" : "")}`}
                        value={vnode.state.post[fields[0]]}
                        oninput={m.withAttr("value", (v) => { this.setValue(fields[0], v) })} />
                    </div>
                  )}
              </div>
            )
          })}
        </form>
      </div>
    ))
  }
}
