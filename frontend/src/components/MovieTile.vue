<template lang="html">
  <div class="card card_movie" style="width: 18rem;">
    <img class="card-img-top" :src="data.Poster" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">{{ data.Title }}</h5>
      <p class="card-text">
        Type: {{ data.Type }}<br>
        Year: {{ data.Year }}
      </p>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    data: Object
  }
}
</script>
