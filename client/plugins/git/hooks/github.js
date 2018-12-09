import { gitDo, gitApi } from "../git";
import Globals from "../../../store/index"
import fm, { fmTest } from "../../../utilities/fm"

export default {
    beforePublish(file, search) {
        const { filepath, filename, payload, sha } = file

        let _commit_message = (search(filename) ? `${filename} updated` : `created ${filename}`)

        gitDo(
            gitApi.endpoints[localStorage.getItem("auth_provider")][search(filename) ? 'updateFile' : 'createFile'](
                filepath,
                {
                    branch: Globals.branch,
                    sha: search(filename) && sha,
                    content: payload,
                    message: _commit_message
                }
            )
        )
    },
    beforeDelete(file) {
        const { file_path, sha } = file

        gitDo(
            gitApi.endpoints[localStorage.getItem("auth_provider")].deleteFile(
                {
                    file_path,
                    sha,
                    branch: Globals.branch,
                    message: `${file_path} deleted`
                }
            )
        )
    },
    loadList(cb, path) {
        gitDo(gitApi.endpoints.github.fetch("master"))
        .then(({tree}) => {
            return tree.filter(file => {
                return file.path.includes(path)
            })
        })
        .then(files => {
            return Promise.all(
                files.map(file => {
                    return gitDo(gitApi.endpoints.github.fetchFileRaw(file.url))
                })
            )
                .then(fileContents => {
                    return files.map((file, i) => {
                        let obj = {
                        metadata:
                            fmTest(fileContents[i]) && fm(fileContents[i]).attributes,
                        file_path: file.path,
                        filename: file.path.replace(path, ''),
                        contents: fmTest(fileContents[i])
                            ? fm(fileContents[i]).body
                            : fileContents[i]
                        }

                        return obj
                    })
                })
                .catch(err => console.error(err))
        })
        .then(posts => cb(posts, null))
        .catch(err => {
            cb(null, err)
        })
    }
}