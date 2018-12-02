import { gitApi, gitDo } from "./git"
import Globals from "../../store/index"
import fm from "front-matter"

export default {
    hooks: {
        beforePublish(search, filename, payload) {
            if (search(filename)) {
                gitDo(gitApi.endpoints[localStorage.getItem("auth_provider")].updateFile(filename, {
                  branch: Globals.branch,
                  content: payload,
                  commit_message: `${filename} updated`
                }))
              } else {
                gitDo(gitApi.endpoints[localStorage.getItem("auth_provider")].updateFile(filename, {
                  branch: Globals.branch,
                  content: payload,
                  commit_message: `created ${filename}`
                }))
              }
        },
        loadList(cb) {
            gitDo(gitApi.endpoints[localStorage.getItem("auth_provider")].fetch("path", {
                path: "articles"
            }))
            .then((files) => {
              return files.filter(file => {
                return file.name.includes(".md")
              })
            })
            .then(files => {
                return Promise.all(files.map(file => {
                    const file_raw = localStorage.getItem("auth_provider") === "github" ? file.download_url : file.id
                    return gitDo(gitApi.endpoints[localStorage.getItem("auth_provider")].fetchFileRaw(file_raw))
                })).then(fileContents => {
                    return files.map((file, i) => {
                        return {
                            ...(fm.test(fileContents) && fm(fileContents[i]).attributes),
                            filename: file.name,
                            contents: (fm.test(fileContents[i]) ? fm(fileContents[i]).body : fileContents[i]),
                        }
                    })
                }).catch(err => console.error(err))
            })
            .then(posts => cb(posts, null))
            .catch((err) => {
                cb(null, err)
            })
        }
    }
}