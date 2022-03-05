<template>
  <div class="container">
    <input 
      class="form-control"
      v-model="title" 
      type="text" 
      placeholder="Search for Movies, Series, and more"
      @keyup.enter="apply"/>

    <div class="selects">
      <select class="form-select"
      v-for="filter in filters"
      v-model="$data[filter.name]"
      :key="filter.name">
        {{filter.name}}
      <option
        v-if="filter.name==='year'">
          All Years
      </option>
      <option
        v-for="item in filter.items"
        :key="item">
          {{item}}
      </option>
      </select>
    </div>
    
    <button 
      class="btn btn-primary"
      @click="apply">
        Apply
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return{
      title: '',
      type: 'movie',
      number: 30,
      year: 'All Years',
      filters: [
        {
          name: 'type',
          items: ['movie', 'series', 'episode']
        },
        {
          name: 'number',
          items: [10, 20, 30]
        },
        {
          name: 'year',
          items: (() => {
            const years = []           
            const thisYear = new Date().getFullYear()
            for (let i = thisYear; i >= 1985; i -= 1){
              years.push(i)
            }
            return years
          })()
        },
      ]
    }
  },
  methods: {
    async apply() {
      await this.$store.dispatch('movie/searchMovies', {
        title: this.title,
        type: this.type,
        number: this.number,
        year: this.year
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

.container{
  display: flex;
  font-size: 15px;

  input{
    margin-right: 10px;
  }

  .selects{
    display: flex;
    select{
      margin-right: 10px;
      width: 120px; 
      color: $gray-600;
      option{
        font-size: 14px;
        color: $gray-600;
      }
    }
  }
  
  button{
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }

  @include media-breakpoint-down(lg) {
    display: block;
    input{
      width: 100%;
      margin-right: 0;
      margin-bottom: 10px;
    }
    .selects{
      margin-bottom: 10px;
      select{
        &:last-child{
          margin-right: 0;
        }
        width: 100%;
      }
    }
    button{
      width: 100%;
      height: 40px;
    }
  }
}

</style>