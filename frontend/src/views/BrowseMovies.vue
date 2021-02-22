<template>
  <div class="container container_wide">
    <h1 class=mb-5>Browse movies</h1>

    <div class="card">
      <div class="card-header">
        Search criteria
      </div>
      <div class="card-body">
        <Form ref="browseForm" class="browse-form form form_centered form_narrow"
              @submit="getMovies">

          <div class="form-group">
            <label for="id_search_title">Title</label>
            <Field name="searchTitle"
                  type="text"
                  v-model="searchTitle"
                  autofocus="autofocus"
                  id="id_search_title"
                  class="form-control"
                  :rules="isRequiredValidator" />
            <ErrorMessage name="searchTitle"
                          class="d-block mt-2 alert alert-danger" />
          </div>

          <p v-if="error"
               class="mt-2 alert alert-danger">
            {{ error }}
          </p>

          <p v-if="backendError"
               class="mt-2 alert alert-danger">
            {{ backendError }}
          </p>

          <button type="submit" class="btn btn-primary mt-3 mb-3">Find movies</button>

        </Form>
      </div>
    </div>

    <div class="movie-list row mt-4">
      <span v-for="movie in movieList"
            :key="movie.imdbID"
            class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
        <MovieTile :data="movie" />
      </span>
    </div>

    <nav aria-label="Search results pages">
      <ul class="pagination justify-content-center flex-wrap mt-3 mb-5">
        <li class="page-item"
            :class="{'disabled': page == 1 || !totalResults}">
          <a class="page-link" href="#" aria-label="Previous"
             @click.prevent="setCurrentPage(page - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li v-for="number in pageRange" :key="number"
            class="page-item"
            :class="{ active: number == page }">
          <a class="page-link" href=""
             @click.prevent="setCurrentPage(number)">
            {{ number }}
          </a>
        </li>
        <li class="page-item"
            :class="{'disabled': page == pageRange.slice(-1)[0] || !totalResults}">
          <a class="page-link" href="#" aria-label="Next"
             @click.prevent="setCurrentPage(page + 1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>

  </div>
</template>


<script>
import axios from 'axios'
import { mapState } from 'vuex'
import { Field, Form, ErrorMessage } from 'vee-validate'
import validators from '@/mixins/validators'
import MovieTile from '@/components/MovieTile'

export default {
  name: 'BrowseMovies',
  mixins: [validators],
  components: {
    Field,
    Form,
    ErrorMessage,
    MovieTile
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
    ]),
    pageRange () {
      return [
        ...Array(Math.floor(this.totalResults / 10)).keys()
      ].map(i => i + 1)
    },
  },

  provide () {
    return {
      favouritesFn: () => this.favourites
    }
  },

  created () {
    if (this.isAuthenticated) {
      this.getFavourites()
    }
  },
  
  methods: {
    getMovies () {
      let params = {
        apikey: this.$store.state.omdbApiKey,
        r: 'json',
        s: this.searchTitle,
        page: this.page
      }

      this.error = null
      axios.get(
        this.$store.state.endpoints.movieApi, {params: params}
      ).then( response => {
        if (response.data.Response !== "True") {
          this.error = `Error occurred! ${response.data.Error}`
          return
        }
        this.movieList = response.data.Search
        this.totalResults = response.data.totalResults
      }).catch( error => {
        this.error = `Error occurred! Response status: ${error.response.status}.`
      })
    },

    getFavourites () {
      const axiosInstance = axios.create(this.$store.getters.axiosCfg)

      axiosInstance({
        url: this.$store.state.endpoints.favourites,
        method: 'get',
        params: {},
      }).then( response => {
        if (response.status == 200) {
          this.favourites = response.data.results
        } else {
          this.backendError(`Error occurred! Back-end response status: ${response.status}.`)
        }
      }).catch( error => {
        this.backendError('Unexpected back-end error occurred!')
        console.log(error)
      })
    },

    setCurrentPage (number) {
      this.page = number
      this.getMovies()
    }
  }
}
</script>
