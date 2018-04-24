export default {
  oncreate() {

  },
  view(vnode) {
    return [
      // <div class="datetime-field">
      //   <input type="text"
      //     placeholder={`Insert ${vnode.attrs.field} here...`}
      //     class={`form-input ${vnode.attrs.field + "-field"} ${(vnode.attrs.field === "title" ? "h1 input-lg" : "")}`}
      //     value={vnode.state.post[vnode.attrs.field]}
      //     oninput={m.withAttr("value", (v) => { this.setValue(vnode.attrs.field, v) })} />
      // </div>
      <div class="form-autocomplete">
        <div class="form-autocomplete-input form-input">
          <div class="chip">
            Thor Odinson
            <a href="#" class="btn btn-clear" aria-label="Close" role="button"></a>
          </div>
          <input class="form-input" type="text" placeholder="typing here" />
        </div>
      </div>
    ]
  }
}
