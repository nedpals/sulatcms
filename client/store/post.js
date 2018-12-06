import postData from "../mocks/post-data"
import { fire } from "../modules/pluginSystem"
import Globals from ".";

let Post = {}

Post.state = {
    posts: [],
    isLoading: true,
    error: {}
}

Post.actions = {
  savePost(filepath, filename, payload) {

    return new Promise((resolve, reject) => {
      if (filepath && filename && payload) {
        resolve([filepath, filename, payload])
      } else {
        reject(Error("One of the fields is missing"))
      }
    })
    .then(values => {
      fire('hooks.beforePublish', [
        ...values,
        function search(name) {
          return Post.state.posts.find(p => p.filename === name) ? true : false
        },
      ])
    })
    .catch(err => console.error(err))
  },
  deletePost(file) {
    let confirmDelete = confirm("You are about to delete this post.")
    fire('hooks.beforeDelete', [file])

    if (confirmDelete) {
      alert("Post Deleted")
      fire('hooks.afterDelete')
      m.route.set("/")

    }
  },
  refreshList() {
    const cb = (arr, err) => {
      if (arr === null && err) { Post.state.error = err }
      Post.state.error = err
      Post.state.isLoading = true
      Post.state.posts = arr
      Post.state.isLoading = false
    }

    fire("hooks.loadList", [cb, Globals.keys.posts_path])
  }
}

Post.getters = {
    getPostByFilename(filename) {
        return Post.state.filename === filename
    },
    searchPost(term) {
        return Post.state.posts.filter(post => post.metadata.title.toLowerCase().includes(term))
    }
}

export default Post
