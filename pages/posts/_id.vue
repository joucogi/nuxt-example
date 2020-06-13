<template>
  <v-layout column justify-center align-center>
    <nuxt-link class="back-link" to="/posts">Back ⬅️</nuxt-link>
    <v-flex xs12 sm8 md6>
      <template v-if="$fetchState.pending">
        <v-card>
          <v-card-title class="headline">Loading...</v-card-title>
        </v-card>
      </template>
      <template v-else-if="$fetchState.error">
        <v-card>
          <v-card-title class="headline">
            Post #{{ $route.params.id }} not found
          </v-card-title>
        </v-card>
      </template>
      <template v-else>
        <v-card>
          <v-card-title class="headline"> {{ post.title }}</v-card-title>
          <v-card-text>
            <pre>
            {{ post.title }}
            </pre>
            <small>by {{ user.name }}</small>
          </v-card-text>
        </v-card>
      </template>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  async fetch() {
    this.post = await this.$axios.$get(
      `https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`
    )
    this.user = await this.$axios.$get(
      `https://jsonplaceholder.typicode.com/users/${this.post.userId}`
    )
  },
  data() {
    return {
      post: {},
      user: {}
    }
  },
  head() {
    return {
      title: this.post.title
    }
  }
}
</script>

<style scoped>
.back-link {
  margin-bottom: 10px;
}
</style>
