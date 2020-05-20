<template>
  <v-container>
    <h1>Login</h1>

    <UserAuthForm button-text="Login" :submit-form="loginUser" />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
  components: {
    UserAuthForm
  },
  methods: {
    async loginUser(loginInfo) {
      try {
        const response = await this.$auth.loginWith('local', {
          data: loginInfo
        })

        // eslint-disable-next-line
        // console.log(response)

        this.$auth.$storage.setCookie(
          '_token.local',
          response.data.accessToken,
          true
        )

        this.$auth.setUser(response.data)
        if (this.$auth.hasScope('admin')) {
          this.$auth.user.admin = true
        }
        this.$store.dispatch('snackbar/create', {
          text: `Thanks for signing in, ${this.$auth.user.username}`
        })
        this.$router.push('/')
      } catch {
        this.$store.dispatch('snackbar/create', {
          color: 'red',
          text: 'There was an issue signing in.  Please try again.'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
