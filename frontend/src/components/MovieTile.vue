<template lang="html">
  <router-link :to="{ name: 'MovieDetails', params: {imdbID: data.imdbID} }">
    <div class="card card_movie">
      <FavouriteButton :movie="data" />
      <img class="card-img-top" :src="data.Poster" alt="Movie poster">
      <div class="card-body">
        <h5 class="card-title">{{ data.Title }}</h5>
        <p class="card-text">
          Type: {{ data.Type }}<br>
          Year: {{ data.Year }}
        </p>
      </div>
    </div>
  </router-link>
</template>


<script>
import FavouriteButton from '@/components/FavouriteButton.vue'

export default {
  name: 'MovieTile',
  props: {
    data: Object
  },
  components: {
    FavouriteButton
  }
}
</script>
