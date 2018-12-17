import * as Component from "../components/Editor"
import store from "../store/post"
import OffCanvas from "../components/OffCanvas"
import { fire } from "../modules/pluginSystem"
import stringify from "../utilities/mdfm-stringify"
import format from "date-fns/format"
import parseTime from "date-fns/parse"
import Globals from "../store"

export default {
  post: {
    metadata: {
      title: '',
      date: format(parseTime(new Date())),
      author: [],
      tags: [],
    },
    file_path: '',
    filename: '',
    contents: ''
  },
  setContent(value) {
    this.post.contents = value
  },
  getValue(field) {
    if (typeof(field) === Array) {
      return field.join(", ")
    }

    return field
  },
  setValue(field, value) {
    this.post.metadata[field] = value

    if ((field !== 'title' && value.includes(",")) || Array.isArray(this.post.metadata[field])) {
      this.post.metadata[field] = [...(value.split(","))]
    }

    if (field === 'title' && m.route.get() === '/new') {
      let newFilename = `${format(this.post.metadata.date, 'YYYY MM DD')}  ${value.substring(0, 30)}.md`.replace(/\s+/g, '-').toLowerCase()
      this.post.filename = newFilename
      this.post.file_path = `${Globals.keys.posts_path}${newFilename}`
    }
  },
  savePost() {
    if (!this.post.metadata.hasOwnProperty('updated')) {
      this.post.updated = format(parseTime(new Date()))
    }

    let output = stringify(this.post.metadata, this.post.contents)

    store.actions.savePost({ 
      filepath: this.post.file_path, 
      filename: this.post.filename, 
      payload: output, 
      sha: this.post.sha 
    })
  },
  oninit(vnode) {
    window.scrollTo(0,0)
    const post = store.state.posts.find(post => post.filename === vnode.attrs.key)

    if (post && vnode.attrs.key) {
      vnode.state.post = {...(post || vnode.state.post)}
      vnode.state.post.metadata.tags = typeof(vnode.state.post.metadata.tags) === 'undefined' ? vnode.state.post.metadata._tags : vnode.state.post.metadata.tags
      vnode.state.post.metadata.tags && (delete vnode.state.post.metadata._tags)
    }

    if (!post && vnode.attrs.key) {
      m.route.set('/dashboard')
    }

    fire('editor.initialize')
  },
  oncreate() {
    if (m.route.get() === '/new') {
      if (!this.post.metadata.hasOwnProperty('updated')) {
        this.post.updated = format(parseTime(new Date()))  
      }
      let newTitle = this.post.metadata.title.substring(0, 30)
  
      this.post.filename = this.post.filename || `${format(this.post.metadata.date, 'YYYY MM DD')}  ${newTitle}.md`.replace(/\s+/g, '-').toLowerCase()
      this.post.file_path = this.post.file_path || `${Globals.keys.posts_path}${this.post.filename}`
    }
  },
  onbeforeupdate(vnode, old) {
    if (vnode.attrs.key !== old.attrs.key) {
      window.scrollTo(0,0)
    }
  },
  view(vnode) {
    return m(OffCanvas, {customClass: "editor-view", currentId: this.post.filename, actions: { save: () => { this.savePost() }, delete: () => { store.actions.deletePost({ filename: vnode.attrs.key, sha: this.post.sha }) } }}, (
      <div class="container grid-md editor">
        <form class="form-horizonal columns">
          {Object.entries(this.post.metadata).map((fields) => {
            return (
              <div
                class={`form-group column ${(fields[0] === "title" ? "col-12 col-sm-12" :
                  (fields[0] === "contents" ? "col-12 col-sm-12" :
                    `col-${Math.floor(12 / (Object.keys(this.post).length - (Object.keys(this.post).length > 6 ? 3 : 2)))}
                     col-md-${Math.floor(12 / (Object.keys(this.post).length - 4))}
                     col-sm-12`))}`
                }
              >
                {m(Component.Textbox, { field: fields[0], fieldValue: this.getValue(this.post.metadata[fields[0]]), setValue: this.setValue.bind(this) })}
              </div>
            )
          })}
          <div class="col-12 col-sm-12">
            {m(Component.RichText, { value: vnode.state.post.contents, oninput: v => this.setContent(v) })}
          </div>
        </form>
      </div>
    ))
  }
}
