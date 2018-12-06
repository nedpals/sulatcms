import { registerPlugin } from "../../modules/pluginSystem"
import auth from "./auth"
import hooks from "./hooks"

export default function () {
    return registerPlugin('git', {
        initialize(config, auth) {
            if (auth.provider === 'gitlab') {
                config.keys.file = 'file_path'
            }
        },
        ...auth,
        hooks: hooks()
    })
}