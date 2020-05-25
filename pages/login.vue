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

        this.$auth.$storage.setCookie(
          '_refresh_token.local',
          response.data.refreshToken,
          true
        )

        await this.$auth.setUserToken(response.data.accessToken)

        if (this.$auth.hasScope('admin')) {
          this.$auth.user.admin = true
        }
        this.$store.dispatch('snackbar/create', {
          text: `Thanks for signing in, ${this.$auth.user.username}`
        })
        // this.$router.push('/')
        this.$router.push(`/user/${this.$auth.user.id}`)
      } catch {
        this.$store.dispatch('snackbar/create', {
          color: 'red',
          text: 'There was an issue signing in.  Please try again.'
        })
      }
    }
  },
  head: {
    title: 'Login'
  }
}
</script>

<style lang="scss" scoped></style>
