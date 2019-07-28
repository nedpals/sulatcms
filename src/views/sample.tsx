import * as m from "mithril";
import Navbar from "../components/navbar";

export default (store) => ({
    view() {
        return (
            <main>
                <p>{JSON.stringify(store.state.user)}</p>
            </main>
        );
    }
});