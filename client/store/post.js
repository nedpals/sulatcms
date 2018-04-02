const Post = {}
Post.state = {
    posts: [
        {
            title: 'Post 1',
            date: '2010-01-01',
            author: 'Ned Palacios',
            tags: ['hello', 'world'],
            filename: 'post-1.md',
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

Post.mutations = {
    changeData(data) {

    }
}

Post.actions = {
    incrementAsync({ commit }) {
        setTimeout(() => {
            commit('INCREMENT')
        }, 200)
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
