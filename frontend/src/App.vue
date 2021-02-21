<template>
  <div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <template v-if="isAuthenticated">
        <router-link :to="{ name: 'BrowseMovies' }">Browse movies</router-link> |
      </template>
      <auth-panel />
    </div>
    <router-view />
  </div>
</template>


<script>
import AuthPanel from '@/components/AuthPanel.vue'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    AuthPanel
  },
  created () {
    this.$store.dispatch('pullAuthUserData')
  },
  computed: {
    ...mapState([
      'isAuthenticated'
    ])
  },
}
</script>
