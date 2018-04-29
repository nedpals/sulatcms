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
        gitDo(Auth.settings.provider, Auth.state.data.token, gitApi.endpoints["gitlab"].fetch("path", {
            path: "articles"
        }))
        .then((files) => {
            const postsArray = []
            files.forEach(file => {
              gitDo(Auth.settings.provider, Auth.state.data.token, gitApi.endpoints["gitlab"].fetchFileRaw(file.id)).then(
                fileContents => {
                  if (fm.test(fileContents)) {
                    const parsedFile = fm(fileContents);
                    const fileObj = Object.assign(
                      parsedFile.attributes,
                      {
                        filename: file.name,
                        contents: parsedFile.body
                      }
                    )
                    postsArray.push(fileObj);
                  } else {
                    postsArray.push({
                      filename: file.name,
                      contents: fileContents
                    })
                  }
                }
              )
            })
            Post.state.posts = postsArray.filter(posts => posts.filename.includes(".md"))
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
