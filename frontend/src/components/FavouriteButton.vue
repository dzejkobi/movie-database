<template lang="html">
  <button type="button"
          class="btn btn-light card_movie__favourite-btn"
          :class="{'card_movie__favourite-btn_checked': favourite}"
          :title="favourite ? 'Favourite' : 'Add to favourites'"
          @click.prevent="toggleFavourite()">
  </button>
</template>


<script>
import axios from 'axios'

export default {
  name: 'FavouriteButton',
  props: {
    movie: Object
  },
  inject: [
    'favouritesFn'
  ],
  data () {
    return {
      favourites: []
    }
  },
  
  computed: {
    favourite () {
      let found = null

      for (let item of this.favourites) {
        if (item.imdb_id == this.movie.imdbID) {
          found = item
          break
        }
      }
      return found
    }
  },

  mounted () {
    this.favourites = this.favouritesFn()
  },

  methods: {
    toggleFavourite () {
      const axiosInstance = axios.create(this.$store.getters.axiosCfg)
      
      if (this.favourite) {
        axiosInstance({
          url: this.$store.state.endpoints.favourites + `${this.favourite.id}/`,
          method: 'delete'
        }).then( () => {
          this.favourites.splice(this.favourites.indexOf(this.favourite), 1)
        })
      } else {
        axiosInstance({
          url: this.$store.state.endpoints.favourites,
          method: 'post',
          data: {
            imdb_id: this.movie.imdbID
          }
        }).then( response => {
          this.favourites.push(response.data)
        })
      }
    }
  }
}
</script>
  