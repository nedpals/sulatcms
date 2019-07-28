import * as m from "mithril";
import Navbar from "./navbar";

import "../assets/app.css";

export default (children, store) => {
    const children_with_store = children(store);

    return {
        view() {
            return (
                <main className="flex font-sans">
                    {m(Navbar, {store})}
                    <div className="ml-auto w-4/5">
                        {m(children_with_store)}
                    </div>
                </main>
            )
        }
    }
}