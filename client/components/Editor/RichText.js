import { init } from "pell"
// import snarkdown from "snarkdown"
// import TurndownService from "turndown"
// import debounce from "debounce"

// const turndownService = new TurndownService({ headingStyle: "atx" })

export default {
  target: "contents",
  oncreate(vnode) {
    this.editor = this.initEditor(document.getElementById("cms-editor"), (html) => {
      // const output = turndownService.turndown(`${html}`)
      vnode.dom.oninput = vnode.attrs.oninput(html)
    })

    this.editor.content.innerHTML = vnode.attrs.value
  },
  initEditor(el, onchange) {
    return init({
      element: el,
      onChange: (html) => onchange(html)
    })
  },
  view() {
    return (
      <div id="cms-editor" class="pell"></div>
    )
  }
}
