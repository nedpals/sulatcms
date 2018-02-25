import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
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

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  }
}

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  }
}

const getters = {
  getPostByFilename: (state) => (filename) => {
    return state.posts.find(post => post.filename === filename)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
