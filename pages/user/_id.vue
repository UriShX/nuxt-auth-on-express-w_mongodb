<template>
  <div>
    <h1>Welcome {{ userName }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: this.$auth.user.username
    }
  }
}
</script>
