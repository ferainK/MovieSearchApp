<template>
  <div class="container">
    <div class="inner">
      <MovieItem
        v-for="movie in movies"
        :key="movie.imdbID"/>
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MoiveItem.vue'
export default {
  components: {
    MovieItem
  },
  data() {
    return {
      movies: []
    }
  }
}
</script>
