<template>
  <span class="auth-panel">
    <span v-if="isAuthenticated">
      Hello {{ authUser.username }} |
      <a href="" @click.prevent="logout()">Logout</a>
    </span>
    <router-link v-else to="/login">Login</router-link>
  </span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'AuthPanel',
  computed: {
    ...mapState([
      'authUser', 'isAuthenticated'
    ])
  },
  methods: {
    logout () {
      this.$store.commit('removeToken')
    }
  }
}
</script>
