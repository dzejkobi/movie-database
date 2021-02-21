<template lang="html">
  <router-link :to="{ name: 'MovieDetails', params: {imdbID: data.imdbID} }">
    <div class="card card_movie">
      <button type="button"
              class="btn btn-light card_movie__favourite-btn"
              :class="{'card_movie__favourite-btn_checked': false}"
              title="Add to favourites">
      </button>
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
export default {
  props: {
    data: Object
  }
}
</script>
