import store, { SiteStore } from "./store";
import { emitter } from "./app";

interface Context {
    store?: SiteStore,
    emit: (type: string, event?: any) => void,
    params?: { [k: string]: any },
    [name: string]: any
}

const contextObj: Context = {
    emit: (type, event) => emitter.emit(type, event)
}

function injectParams(params: { [k: string]: any }): Context {
    return { ...contextObj, params }
}

function injectContext(obj: { [k:string]: any }): Context {
    return Object.assign(obj, contextObj);
}

export default contextObj

export {
    injectContext,
    injectParams,
    Context
}