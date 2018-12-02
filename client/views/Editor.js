import * as Component from "../components/Editor"
import store from "../store/post"
import OffCanvas from "../components/OffCanvas"
import { fire } from "../modules/pluginSystem"
import { stringify } from "mdify"
import format from "date-fns/format"
import parseTime from "date-fns/parse"

export default {
  post: {
    attributes: {
      title: '',
      date: format(Date.now(), 'YYYY-MM-DD'),
      author: '',
      tags: [],
    },
    file_path: '',
    filename: '',
    contents: ''
  },
  setContent(field, content) {
    field = content
  },
  setValue(field, value) {
    this.post.attributes[field] = value
  },
  savePost() {
    if (this.post.updated === '') {
      this.post.updated = format(parseTime(new Date()))
    }

    let output = stringify(this.post.attributes, this.post.content)
    store.actions.savePost(this.post.file_path, this.post.filename, output)
  },
  oninit(vnode) {
    vnode.state.post = store.state.posts.find(post => post.filename === vnode.attrs.key) || vnode.state.post
  },
  oncreate() {
    m.redraw()

    fire('editor.initialize')
  },
  onupdate() {
    console.log(this.post)
  },
  view(vnode) {
    return m(OffCanvas, {customClass: "editor-view", currentId: this.post.filename, actions: { save: () => { this.savePost() }, delete: () => { store.actions.deletePost() } }}, (
      <div class="container grid-md editor">
        <form class="form-horizonal columns">
          {Object.entries(this.post.attributes).map((fields) => {
            return (
              <div
                class={`form-group column ${(fields[0] === "title" ? "col-12 col-sm-12" :
                  (fields[0] === "contents" ? "col-12 col-sm-12" :
                    `col-${Math.floor(12 / (Object.keys(this.post).length - (Object.keys(this.post).length > 6 ? 3 : 2)))}
                     col-md-${Math.floor(12 / (Object.keys(this.post).length - 4))}
                     col-sm-12`))}`
                }
              >
                {m(Component.Textbox, { field: fields[0], fieldValue: this.post.attributes[fields[0]], setValue: this.setValue.bind(this) })}
              </div>
            )
          })}
          <div class="col-12 col-sm-12">
            {m(Component.RichText, { content: this.post.contents, setContent: (value) => this.setContent(this.post.contents, value) })}
          </div>
        </form>
      </div>
    ))
  }
}
