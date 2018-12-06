import { gitApi, gitDo } from "../git"
import Globals from "../../../store/index"
import fm, { fmTest } from "../../../utilities/fm"

export default {
  beforePublish(filepath, filename, payload, search) {
    let _commit_message = (search(filename) ? `${filename} updated` : `created ${filename}`)

    gitDo(
      gitApi.endpoints[localStorage.getItem("auth_provider")][search(filename) ? 'updateFile' : 'createFile'](
        filepath,
        {
          branch: Globals.branch,
          content: payload,
          message: _commit_message
        }
      )
    )
  },
  loadList(cb, path) {
    gitDo(
      gitApi.endpoints[localStorage.getItem("auth_provider")].fetch("path", {
        path
      })
    )
      .then(files => {
        return files.filter(file => {
          return file.name.includes(".md")
        })
      })
      .then(files => {
        return Promise.all(
          files.map(file => {
            const file_raw =
              localStorage.getItem("auth_provider") === "github"
                ? file.download_url
                : file.id
            return gitDo(
              gitApi.endpoints[
                localStorage.getItem("auth_provider")
              ].fetchFileRaw(file_raw)
            )
          })
        )
          .then(fileContents => {
            return files.map((file, i) => {
              let obj = {
                metadata:
                  fmTest(fileContents[i]) && fm(fileContents[i]).attributes,
                file_path: file.path,
                filename: file.name,
                contents: fmTest(fileContents[i])
                  ? fm(fileContents[i]).body
                  : fileContents[i]
              }

              obj.metadata._tags = obj.metadata.tags
              obj.metadata.tags = undefined

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
