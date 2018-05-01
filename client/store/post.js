import postData from "../mocks/post-data"
import { gitApi, gitDo } from "../modules/git"
import Auth from "./auth"
import fm from "front-matter"

const Post = {}

Post.state = {
    posts: [],
    error: {}
}

Post.actions = {
    savePost(filename, payload) {},
    deletePost(filename) {
      let confirmDelete = confirm("You are about to delete this post.")
      if (confirmDelete) {
          alert("Post Deleted")
          m.route.set("/")
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
          gitDo(gitApi.endpoints[localStorage.getItem("auth_provider")].fetchFileRaw(file.id))
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
