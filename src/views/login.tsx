import * as m from "mithril";
import { emitter } from "../app";
import { redirectToDestination } from "../router"

export default (store) => {
    const providers = store.getState().config.auth_providers;
    const current = providers.find(p => p.name === store.getState().config.auth);

    return {
        login(e) {
            emitter.emit('auth.authenticate', { store, redirect: redirectToDestination });
        },
        oninit() {
            emitter.emit('auth.onInit', { store, redirect: redirectToDestination });
        },
        view() {
            return (
                <main className="bg-gray-300 flex flex-col justify-center min-h-screen">
                    <div className="w-1/4 flex flex-col rounded shadow-md bg-white p-8 mx-auto">
                        <h1 className="self-center pb-8">Welcome to Sulat</h1>
                    {store.getState().config.auth !== "no-auth" ? (
                        <button className="border border-purple-800 bg-purple-600 hover:bg-purple-700 rounded p-3 text-white" onclick={() => this.login()}>{current.label || "Login"}</button>
                    ) : (
                        <div>
                            <p>You have no authentication provider selected.</p>
                        </div>
                    )}
                    </div>
                </main>
            );
        }
    }
};