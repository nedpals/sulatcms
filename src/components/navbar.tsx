import * as m from "mithril";
import { redirectToDestination } from "../router"
import { emitter } from "../app";

export default {
    links: [],
    user: {},
    destroySession(store) {
        emitter.emit('auth.revoke', { store, redirect: m.route.set('/login') });
    },
    oninit(vnode) {
        vnode.state.links = vnode.attrs.store.state.routes;
        vnode.state.user = vnode.attrs.store.state.user;

        console.log(vnode.state);
    },
    view(vnode) {
        return (
            <header className="w-1/5 fixed left-0 top-0 bottom-0 flex flex-col p-8 border-r border-gray bg-gray-200 text-gray">
                <h2 className="mb-4">Sulat</h2>
                {/* {vnode.attrs.links.map(link => (
                    {m()}
                    <a className="text-black p-4 no-underline rounded my-1 font-bold hover:bg-gray-400" href={link.path} oncreate={m.route.link}>{link.name}</a>
                ))} */}
                <div className="flex flex-col">
                {vnode.state.links.map(link => {
                    return m(m.route.Link, {href: link.path, className: "text-black p-4 no-underline rounded my-1 font-bold hover:bg-gray-400"}, link.name)
                })}
                </div>

                <div className="flex flex-col mt-auto">
                    {m('button', {className: "text-left text-black p-4 no-underline rounded my-1 font-bold hover:bg-gray-400", onclick: () => vnode.state.destroySession(vnode.attrs.store)}, 'Logout')}
                </div>
            </header>
        )
    }
}