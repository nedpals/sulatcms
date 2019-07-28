import * as m from "mithril";
import { emitter } from "../app";
import { injectContext } from "context";

const { Link } = m.route

export default (store) => ({
    oninit() {
        if (store.state.files.length === 0) {
            emitter.emit("buildIndex", injectContext({ store }));
        }
    },
    view() {
        return (
            <div className="flex-row p-8">
                <div className="w-2/3">
                {store.getState().files.map(file => {
                    return m(Link, {
                        className: "p-4 w-full flex no-underline text-black rounded-lg bg-gray-100 shadow-md border border-gray-300 my-4", 
                        href: `/edit/${file.id}`}, 
                    (
                        <div className="flex flex-col w-full">
                            <h1 className="truncate">{file.title || file.id}</h1>
                            <p className="text-gray-600 truncate h-8">{file.content}</p>
                            <p>{file.created_at}</p>
                        </div>
                    )); 
                })}
                </div>
                <div className="w-1/3">
                    
                </div>
            </div>
        );
    }
});