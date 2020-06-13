export const state = () => ({
  list: []
})

export const mutations = {
  setList(state, posts) {
    state.list = posts
  }
}

export const actions = {
  async load({ commit }) {
    const posts = await this.$axios.$get(
      'https://jsonplaceholder.typicode.com/posts'
    )

    const users = await this.$axios.$get(
      'https://jsonplaceholder.typicode.com/users'
    )

    posts.map((post) => {
      const user = users.find((user) => user.id === post.userId)
      post.user = user.name
      return post
    })

    commit('setList', posts)
  }
}
