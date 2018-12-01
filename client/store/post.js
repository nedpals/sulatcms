import postData from "../mocks/post-data"
import { gitApi, gitDo } from "../modules/git"
import Auth from "./auth"
import { fire } from "../modules/pluginSystem"
import fm from "front-matter"
import Globals from "."

let Post = {}

Post.state = {
    posts: [],
    error: {}
}

Post.actions = {
    savePost(filename, payload) {
      fire('hooks.beforePublish')

      if (Post.getter.searchPost(filename)) {
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

      fire('hooks.afterPublish')
    },
    deletePost(filename) {
      let confirmDelete = confirm("You are about to delete this post.")
      fire('hooks.beforeDelete')

      if (confirmDelete) {
          alert("Post Deleted")
          m.route.set("/")

          fire('hooks.afterDelete')
      }
    },
    refreshList() {
      gitDo(gitApi.endpoints[localStorage.getItem("auth_provider")].fetch("path", {
          path: "articles"
      }))
      .then((files) => {
        Post.state.posts = files.filter(file => {
          return file.name.includes(".md")
        }).map(file => {
          let postObj = {}
          const file_raw = localStorage.getItem("auth_provider") === "github" ? file.download_url : file.id
          gitDo(gitApi.endpoints[localStorage.getItem("auth_provider")].fetchFileRaw(file_raw))
          .then(
            fileContents => {
              let post = {}
              if (fm.test(fileContents)) {
                const parsedFile = fm(fileContents);
                post = Object.assign(
                  parsedFile.attributes,
                  {
                    filename: file.name,
                    contents: parsedFile.body
                  }
                )
              } else {
                post = {
                  filename: file.name,
                  contents: fileContents
                }
              }
              postObj = Object.assign(postObj, post)
            }
          )
          return postObj
        })
      })
      .catch((err) => {
          Post.state.error = err
      })
    }
}

Post.getters = {
    getPostByFilename(filename) {
        return Post.state.filename === filename
    },
    searchPost(term) {
        return Post.state.posts.filter(post => post.title === term)
    }
}

export default Post
