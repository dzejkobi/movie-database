<template>
  <div class="container container_wide">
    <h1 class=mb-5>Your favourite movies</h1>

    <div class="movie-list row mt-4">
      <span v-for="movie in movieList"
            :key="movie.imdbID"
            class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
        <MovieTile :data="movie" />
      </span>
    </div>

    <p v-if="error"
          class="mt-2 alert alert-danger">
      {{ error }}
    </p>

    <p v-if="backendError"
          class="mt-2 alert alert-danger">
      {{ backendError }}
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import MovieTile from '@/components/MovieTile'

export default {
  name: 'FavouriteMovies',
  components: {
    MovieTile
  },

  provide () {
    return {
      favouritesFn: () => this.favourites
    }
  },

  data () {
    return {
      searchTitle: '',
      page: 1,
      error: null,
      backendError: null,
      movieList: [],
      favourites: [],
      totalResults: 0
    }
  },

  computed: {
    ...mapState([
      'isAuthenticated'
    ])
  },

  created () {
    if (this.isAuthenticated) {
      this.getMovies()
    }
  },
  
  methods: {
    async getMovies () {
      let params = {
        apikey: this.$store.state.omdbApiKey,
        r: 'json'
      }

      await this.getFavourites()

      this.error = null
      
      for (let favourite of this.favourites) {
        axios.get(
          this.$store.state.endpoints.movieApi,
          {params: {i: favourite.imdb_id, ...params}}
        ).then( response => {
          if (response.data.Response !== "True") {
            this.error = `Error occurred! ${response.data.Error}`
            return
          }
          this.movieList.push(response.data)
        }).catch( error => {
          this.error = `Error occurred! Response status: ${error.response.status}.`
        })
      }
    },

    async getFavourites () {
      // Code duplication due to lack of time - to be refactored.

      const axiosInstance = axios.create(this.$store.getters.axiosCfg)

      await axiosInstance({
        url: this.$store.state.endpoints.favourites,
        method: 'get',
        params: {},
      }).then( response => {
        if (response.status == 200) {
          this.favourites = response.data.results
        } else {
          this.backendError(`Error occurred! Back-end response status: ${response.status}.`)
        }
      })
    }
  }
}
</script>
