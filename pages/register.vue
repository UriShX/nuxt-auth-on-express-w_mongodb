<template>
  <v-container>
    <h1>Register</h1>

    <UserAuthForm
      button-text="Register"
      :submit-form="registerUser"
      :has-name="true"
    />
  </v-container>
</template>

<script>
import UserAuthForm from '@/components/UserAuthForm'

export default {
  components: {
    UserAuthForm
  },
  methods: {
    async registerUser(registrationInfo) {
      try {
        await this.$axios.post('/auth/signup', registrationInfo)

        const response = await this.$auth.loginWith('local', {
          data: registrationInfo
        })

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
          text: `Thanks for signing up, ${this.$auth.user.username}`
        })
        this.$router.push('/')
      } catch {
        this.$store.dispatch('snackbar/create', {
          color: 'red',
          text: 'There was an issue signing up.  Please try again.'
        })
      }
    }
  },
  head: {
    title: 'Register'
  }
}
</script>

<style lang="scss" scoped></style>
