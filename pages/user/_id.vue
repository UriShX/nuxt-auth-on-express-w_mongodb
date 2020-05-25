<template>
  <v-layout column justify-center align-center>
    <h1>Welcome {{ userName }}</h1>
    <p>{{ content }}</p>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      userName: this.$auth.user.username,
      content: null
    }
  },
  async mounted() {
    if (this.$auth.user.admin) {
      const response = await this.$axios.get('/test/admin')

      // eslint-disable-next-line
      console.log(response)

      this.content = JSON.stringify(response.data)
    } else this.content = 'User content'
  }
}
</script>
