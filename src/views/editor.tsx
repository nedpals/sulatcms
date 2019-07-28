import * as m from "mithril";
import { emitter } from "../app";
import { injectContext } from "../context";

export default (store) => {
    let file = {} as any;

    function getDetails(data) {
        file = data;
    }

    return {
        oninit() {
            if (Object.keys(file).length === 0) {
                emitter.emit("fetchFile", injectContext({ store, params: { id: m.route.param('id') }, cb: getDetails }));
            }
        },
        ondestroy() {
            file = {};
        },
        view() {
            return (
                <textarea className="w-full h-screen">
                    {file.content}
                </textarea>
            )
        }
    }
};