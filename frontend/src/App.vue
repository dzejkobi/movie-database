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


<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
