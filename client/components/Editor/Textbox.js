export default {
  fieldLabel(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  },
  oncreate() {},
  view(vnode) {
    return [
      <div class="textbox-field">
        {vnode.attrs.field === "title" ? null : (<label class="form-label">{this.fieldLabel(vnode.attrs.field)}</label>)}
        <input type="text"
          placeholder={`Insert ${vnode.attrs.field} here...`}
          class={`form-input ${vnode.attrs.field + "-field"} ${(vnode.attrs.field === "title" ? "h1 input-lg" : "")}`}
          value={vnode.attrs.fieldValue}
          oninput={m.withAttr("value", (v) => { vnode.attrs.setValue(vnode.attrs.field, v) })} />
      </div>
    ]
  }
}
