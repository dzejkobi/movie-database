<template>
  <div class="container container_wide">
    <div v-if="loading" class="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="movieData" class="content">
      <h1 class=mb-5>{{ movieData.Title }}</h1>

      <div class="row">
        <div class="col-lg-4 mb-3">
          <img class="max-w-100 shadowed"
               :src="movieData.Poster" :title="movieData.Title + ' poster'" />
        </div>
        <div class="col-lg-8 mb-3">
          <p v-for="(field, index) of fields" :key="index">
            <template v-if="movieData[field]">
              <b>{{ field }}</b>: {{ movieData[field] }}
            </template>
          </p>
          <p>
            <router-link :to="{ name: 'BrowseMovies' }" class="link">Go back to movie browser</router-link>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      movieData: null,
      error: null,
      fields: [
        'Rated', 'Genre', 'Type', 'totalSeasons',
        'Year', 'Released', 'Runtime',
        'Director', 'Writer', 'Actors',
        'Language', 'Country', 'Awards', 'Source', 'Value', 'Metascore',
        'imdbRating', 'imdbVotes',
        'Plot'
      ]
    }
  },

  computed: {
    ...mapState([
      'isAuthenticated'
    ])
  },

  created () {
    this.fetchData()
  },

  watch: {
    '$route': 'fetchData'
  },

  methods: {
    fetchData () {
      this.error = this.movieData = null
      this.loading = true
      const imdbID = this.$route.params.imdbID

      let params = {
        apikey: this.$store.state.omdbApiKey,
        r: 'json',
        i: imdbID
      }

      axios.get(
        this.$store.state.endpoints.movieApi, {params: params}
      ).then( response => {
        this.loading = false
        if (response.data.Response !== "True") {
          this.error = response.data.Error
          return
        }
        this.movieData = response.data
      }).catch( error => {
        this.error = `Error occurred! Response status: ${error.response.status}.`
        this.loading = false
      })
    }
  }
}
</script>
