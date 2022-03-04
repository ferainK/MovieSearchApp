<template>
  <div class="container">
    <template v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster"></div>
        <div class="specs">
          <div class="skeleton title"></div>
          <div class="skeleton spec"></div>
          <div class="skeleton plot"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
          <div class="skeleton etc"></div>
        </div>
      </div>
      <Loader
        :size="4"
        :z-index="9"
        :fixed="true"/>
    </template>
    <div v-else class="movie-details">
      <div
        :style="{backgroundImage: `url(${movieInfo.Poster})`}"
         class="poster"></div>
      <div class="specs">
        <div class="title">
          {{movieInfo.Title}}
        </div>
        <div class="labels">
          <span>{{movieInfo.Released}}</span>
          <span>{{movieInfo.Runtime}}</span>
          <span>{{movieInfo.Country}}</span>
        </div>
        <div class="plot">
          {{movieInfo.Plot}}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
        </div>
        <div>
          <h3>Actors</h3>
          {{movieInfo.Actors}}
        </div>
        <div>
          <h3>Director</h3>
          {{movieInfo.Director}}
        </div>
        <div>
          <h3>Production</h3>
          {{movieInfo.Production}}
        </div>
        <div>
          <h3>Genre</h3>
          {{movieInfo.Genre}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '~/components/Loader.vue'
export default {
  components: {
    Loader
  },
  computed:{
    movieInfo(){
      console.log(this.$store.state.movie.movieInfo)
      return this.$store.state.movie.movieInfo
    },
    loading() {
      return this.$store.state.movie.loading
    }
  },
  created(){
    this.$store.dispatch('movie/searchMovieWithId',{
      id: this.$route.params.id
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "~/scss/main.scss";
  .container{
    padding-top: 40px;
  }

  .skeletons{
    display: flex;
    .poster{
      flex-shrink: 0;
      width: 500px;
      height: 500px * 3 / 2 ;
      margin-right: 70px;
    }
    .specs{
      flex-grow: 1;
    }
    .skeleton{
      border-radius: 10px;
      background-color: $gray-200;
      &.title{
        width: 80%;
        height: 70px;
      }
      &.spec{
        width: 60%;
        height: 30px;
        margin-top: 20px;
      }
      &.plot{
        width: 100%;
        height: 250px;
        margin-top: 20px;
        
      }
      &.etc{
        width: 50%;
        height: 50px;
        margin-top: 20px;
      }
    }
  }

  .movie-details{
    display: flex;
    color: $gray-600;
    .poster{
      flex-shrink: 0;
      width: 500px;
      height: 500px * 3 / 2;
      margin-right: 70px;
      border-radius: 10px;
      background-color: $gray-200;
      background-size: cover;
      background-position: center;
    }
    .specs{
      flex-grow: 1;
      .title{
        color: $black;
        font-family: "Oswald", sans-serif;
        font-size: 70px;
        line-height: 1;
        margin-bottom: 30px;
      }
      .lables{
        color: $primary;
        span{
          &::after{
            content: "\00b7";
            margin: 0 6px;
          }
          &:last-child::after{
            display: none;
          }
        }
      }
      .plot{
        margin-top: 20px
      }
      .ratings{

      }
      .h3{
        margin: 24px 0 6px;
        color: $black;
        font-family: "Oswald", sans-serif;
        font-size: 20px;
      }
    }
  }
</style>