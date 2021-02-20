<template>
  <div class="container container_wide">
    <h1>Browse movies</h1>

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
      <ul class="pagination justify-content-center flex-wrap">
        <li v-for="number in pageRange" :key="number"
            class="page-item"
            :class="{ active: number == page }">
          <a class="page-link" href=""
             @click.prevent="setCurrentPage(number)">
            {{ number }}
          </a>
        </li>
      </ul>
    </nav>

  </div>
</template>

<script>
import axios from 'axios'
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
      movieList: [],
      totalResults: 0
    }
  },

  computed: {
    pageRange () {
      return [
        ...Array(Math.floor(this.totalResults / 10)).keys()
      ].map(i => i + 1)
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

      axios.get(
        this.$store.state.endpoints.movieApi, {params: params}
      ).then( response => {
        if (response.data.Response !== "True") {
          alert(`Error occurred! ${response.data.Error}`)
          return
        }
        this.movieList = response.data.Search
        this.totalResults = response.data.totalResults
      }).catch( error => {
        alert(`Error occurred! Response status: ${error.response.status}.`)
      })
    },

    setCurrentPage (number) {
      this.page = number
      this.getMovies()
    }
  }
}
</script>
