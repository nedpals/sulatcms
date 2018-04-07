import postData from "../mocks/post-data";

const Post = {}
Post.state = {
    posts: postData
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
    refreshList() {}
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
