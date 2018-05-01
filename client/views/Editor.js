import * as Component from "../components/Editor"
import store from "../store/post"
import format from "date-fns/format"
import OffCanvas from "../components/OffCanvas"

export default {
  post: {
    title: '',
    date: format(Date.now(), 'YYYY-MM-DD'),
    author: '',
    tags: [],
    filename: '',
    contents: ''
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
    console.log(Component.ContentEditor)
    m.redraw()
  },
  view(vnode) {
    return m(OffCanvas, {customClass: "editor-view", currentId: vnode.state.post.filename, actions: { save: () => { store.actions.savePost() }, delete: () => { store.actions.deletePost() } }}, (
      <div class="container grid-md editor">
        <form class="form-horizonal columns">
          {Object.entries(vnode.state.post).map((fields) => {
            return (
              <div
                class={`form-group column ${(fields[0] === "title" ? "col-12 col-sm-12" :
                  (fields[0] === "contents" ? "col-12 col-sm-12" :
                    `col-${Math.floor(12 / (Object.keys(vnode.state.post).length - (Object.keys(vnode.state.post).length > 6 ? 3 : 2)))}
                     col-md-${Math.floor(12 / (Object.keys(vnode.state.post).length - 4))}
                     col-sm-12`))}`
                }
              >
                {(fields[0] === "contents") ?
                  m(Component.RichText, { content: vnode.state.post.contents, setContent: this.setContent })
                  : m(Component.Textbox, { field: fields[0], fieldValue: vnode.state.post[fields[0]], setValue: this.setValue })}
              </div>
            )
          })}
        </form>
      </div>
    ))
  }
}
