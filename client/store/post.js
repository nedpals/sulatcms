import postData from "../mocks/post-data"
import Auth from "./auth"
import { fire } from "../modules/pluginSystem"



let Post = {}

Post.state = {
    posts: [],
    isLoading: true,
    error: {}
}

Post.actions = {
  savePost(filename, payload) {

    fire('hooks.beforePublish', [
      function search(name) {
        return Post.getters.searchPost(name)
      },
      filename,
      payload
    ])

    fire('hooks.afterPublish')
  },
  deletePost(filename) {
    let confirmDelete = confirm("You are about to delete this post.")
    fire('hooks.beforeDelete', [filename])

    if (confirmDelete) {
      alert("Post Deleted")
      fire('hooks.afterDelete')
      m.route.set("/")

    }
  },
  refreshList() {
    const cb = (arr, err) => {
      if (arr === null && err)
        Post.state.error = err
      Post.state.isLoading = true
      Post.state.posts = arr
      Post.state.isLoading = false
    }

    fire("hooks.loadList", [cb])
  }
}

Post.getters = {
    getPostByFilename(filename) {
        return Post.state.filename === filename
    },
    searchPost(term) {
        return Post.state.posts.filter(post => post.title.toLowerCase().includes(term))
    }
}

export default Post
