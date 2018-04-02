export default {
    view(vnode) {
        return (
            <div class="has-icon-left">
                <input type="text" class="form-input" placeholder="..." value={vnode.attrs.value} oninput={m.withAttr("value", vnode.attrs.field)} />
                <i class="form-icon icon icon-search"></i>
            </div>
        )
    }
}