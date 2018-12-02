import { gitApi, gitDo } from "../git"
import Globals from "../../../store/index"
import Auth from "../../../store/auth"
import fm from "front-matter"

export default {
  beforePublish(search, filepath, filename, payload) {
    gitDo(
      gitApi.endpoints[localStorage.getItem("auth_provider")].updateFile(
        filepath,
        {
          branch: Globals.branch,
          content: payload,
          commit_message: search(filename)
            ? `${filename} updated`
            : `created ${filename}`
        }
      )
    )
  },
  loadList(cb) {
    gitDo(
      gitApi.endpoints[localStorage.getItem("auth_provider")].fetch("path", {
        path: "articles"
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
                attributes:
                  fm.test(fileContents) && fm(fileContents[i]).attributes,
                file_path: file.path,
                filename: file.name,
                contents: fm.test(fileContents[i])
                  ? fm(fileContents[i]).body
                  : fileContents[i]
              }

              obj.attributes.tags = fm(fileContents[i]).attributes.tags

              return obj
            })
          })
          .catch(err => console.error(err))
      })
      // .then(posts => console.log(posts))
      .then(posts => cb([
          {
              title: "Hello",
              attributes: {
                  tags: ["hello:world", "yow"]
              }
          }
      ], null))
      .catch(err => {
        cb(null, err)
      })
  }
}
