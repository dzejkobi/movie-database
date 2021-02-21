<template>
  <div class="home">
    <img alt="Movie Database logo"
         class="app-logo mb-5" 
         src="../assets/img/icons/movie.svg" />

    <h1 class="mb-5">Welcome to Movie Database</h1>
    
   
    <template v-if="isAuthenticated">
      <p>You can now:</p>
      <ul>
        <li>
          <router-link :to="{name: 'BrowseMovies'}" class="link">
            browse movies
          </router-link>
        </li>
      </ul>
    </template>
    <template v-else>
      <p>
        Please
        <router-link :to="{name: 'Login'}" class="link">log in</router-link>
        to browse movies.
      </p>
    </template>
  </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
  },
  computed: {
    ...mapState([
      'isAuthenticated'
    ])
  }
}
</script>


<style scoped lang="scss">
.app-logo {
  width: 300px;
  height: 300px;
  max-width: 100%;
}
</style>
