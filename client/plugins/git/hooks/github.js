import { gitDo, gitApi } from "../git";
import fm, { fmTest } from "../../../utilities/fm"

export default {
    beforePublish(filepath, filename, payload, search) {
        let _commit_message = ''

        gitDo(
            gitApi.endpoints.github[search(filename) ? 'updateFile' : 'createFile'],
            filepath,
            {
                branch: Globals.branch,
                content: payload,
                message: _commit_message
            }
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