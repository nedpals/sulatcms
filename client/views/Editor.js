const Pen = require('../lib/pen-exports')
import "pen/src/pen.css"

export default {
  oncreate(vnode) {
    const editor = this.intializeEditor(document.getElementById('cms-editor'))
    editor.focus()
    editor.setContent("# Hello World")
    this.editor = editor
  },
  intializeEditor(el) {
    return new Pen(el, {
      class: 'pen',
      debug: true,
      textarea: '<textarea name="content"></textarea>',
      stay: false,
      linksInNewWindow: false
    })
  },
  view() {
    return m(".container.grid-lg", m("#cms-editor"))
  }
}
