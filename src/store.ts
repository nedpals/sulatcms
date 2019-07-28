import createStore, { Store } from "unistore";
import { Plugin } from "plugin";

export interface UserState {
    token: string,
    avatar_url: string,
    full_name: string,
    id: string
}

export interface Config {
    auth?: string,
    auth_providers?: Array<AuthProvider>
}

export interface SiteState {
    config: Config,
    files: Array<{ [name: string]: any }>,
    plugins: Array<Plugin>,
    user: UserState,
    routes: Array<{ name?: string, path: string }>
}

interface AuthProvider {
    name: string,
    label?: string
}

export interface SiteStore extends Store<SiteState> {
    state: SiteState
}

export default function (): SiteStore {
    let store: Store<SiteState> = createStore({
        config: {
            auth: 'no-auth'
        } as Config,
        files: [] as Array<object>,
        plugins: [] as Array<Plugin>,
        user: {} as UserState,
        routes: []
    });

    let storeMethods: SiteStore = {
        state: store.getState(),
        setState: store.setState,
        action: store.action,
        subscribe: store.subscribe,
        unsubscribe: store.unsubscribe,
        getState: store.getState
    }

    store.subscribe(state => {
        storeMethods.state = state;
    });

    return storeMethods;
};