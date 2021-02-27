<template>
  <span class="auth-panel">
    <template v-if="isAuthenticated">
      Hello {{ userData.username }} |
      <a href="" @click.prevent="logout()">Logout</a>
    </template>
    <template v-else>
      <router-link :to="{ name: 'Login' }">Login</router-link> |
      <router-link :to="{ name: 'SignUp' }">Sign up</router-link>
    </template>
  </span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AuthPanel',
  computed: {
    ...mapState('authStore', [
      'userData',
      'isAuthenticated'
    ])
  },
  methods: {
    logout () {
      this.$store.commit('authStore/unsetAuthUser')
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>
