import { registerPlugin } from "../../modules/pluginSystem"
import auth from "./auth"
import hooks from "./hooks"

export default function () {
    return registerPlugin('git', {
        initialize() {
            console.log('Git plugin loaded')
        },
        ...auth,
        ...hooks
    })
}