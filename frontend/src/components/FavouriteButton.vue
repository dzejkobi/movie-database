<template lang="html">
  <button type="button"
          class="btn btn-light card_movie__favourite-btn"
          :class="{'card_movie__favourite-btn_checked': favourite}"
          :title="favourite ? 'Favourite' : 'Add to favourites'"
          @click.prevent="toggleFavourite()">
  </button>
</template>

<script>
import endpoints from '@/common/endpoints'

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

      for (const item of this.favourites) {
        if (item.imdb_id === this.movie.imdbID) {
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
      if (this.favourite) {
        this.$store.dispatch(
          'authStore/signedRequest',
          {
            url: endpoints.favourites + `${this.favourite.id}/`,
            method: 'delete'
          }
        ).then(() => {
          this.favourites.splice(this.favourites.indexOf(this.favourite), 1)
        })
      } else {
        this.$store.dispatch(
          'authStore/signedRequest',
          {
            url: endpoints.favourites,
            method: 'post',
            data: {
              imdb_id: this.movie.imdbID
            }
          }
        ).then(response => {
          this.favourites.push(response.data)
        })
      }
    }
  }
}
</script>
