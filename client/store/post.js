const Post = {}
Post.state = {
    posts: [
        {
            title: 'Post 1',
            date: '2010-01-01',
            author: 'Ned Palacios',
            tags: ['hello', 'world'],
            filename: 'post-1.md',
            photo: 'post-1.md',
            content: '# Hello world!'
        },
        {
            title: 'Post 2',
            date: '2010-01-01',
            author: 'Ned Palacios',
            tags: ['hello', 'world'],
            filename: 'post-2.md',
            content: '## hello rin, in h2'
        }
    ]
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
