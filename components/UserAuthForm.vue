<template>
  <v-form v-model="valid">
    <div @keydown.enter="submitForm(userInfo)">
      <v-text-field
        v-if="hasName"
        v-model="userInfo.username"
        label="Name"
        :rules="[required('name')]"
      />

      <v-text-field
        v-model="userInfo.email"
        label="Email"
        :rules="[required('email'), emailFormat()]"
      />

      <v-text-field
        v-model="userInfo.password"
        label="Password"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        counter="true"
        :rules="[required('password'), minLength('password', 8)]"
        @click:append="showPassword = !showPassword"
      />

      <v-btn :disabled="!valid" @click="submitForm(userInfo)">{{
        buttonText
      }}</v-btn>
    </div>
  </v-form>
</template>

<script>
import validations from '@/utils/validations'

export default {
  props: {
    submitForm: {
      type: Function,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    },
    hasName: Boolean
  },
  data() {
    return {
      valid: false,
      showPassword: false,
      userInfo: {
        username: '',
        email: 'urish@urishx.com',
        password: 'q1w2e3r4t5y6'
      },
      ...validations
    }
  }
}
</script>

<style lang="scss" scoped></style>
