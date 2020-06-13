<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <v-card-title class="headline">
          Posts
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          >
            <template v-slot:item.id="{ item }">
              <nuxt-link :to="{ name: 'posts-id', params: { id: item.id } }">
                <v-icon>mdi-eye</v-icon>
              </nuxt-link>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Posts',
  async fetch() {
    await this.$store.dispatch('posts/load')
  },
  data() {
    return {
      headers: [
        {
          text: 'Title',
          align: 'start',
          sortable: false,
          value: 'title'
        },
        { text: 'User', value: 'user' },
        { text: 'Actions', value: 'id' }
      ]
    }
  },
  computed: {
    desserts() {
      return this.$store.state.posts.list
    }
  },
  head: {
    title: 'Posts'
  }
}
</script>

<style scoped></style>
