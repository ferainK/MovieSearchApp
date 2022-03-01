<template>
  <div class="container">
    <input 
      class="form-control"
      v-model="title" 
      type="text" 
      placeholder="Search for Movies, Series, and more"
      @keyup.enter="apply"/> 
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
          :key="item"
          @click="apply">
          {{item}}
        </option>
      </select>
      <button class="btn btn-primary">
        Apply
      </button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return{
      title: '',
      type: 'movie',
      number: 10,
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
      const OMDB_API_KEY = '7035c60c'
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${this.title}&type=${this.type}&y=${this.year}&page=1`)
    } 
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

.container{
  display: flex;
  font-size: 15px;
  >*{
    margin-right: 10px;
    &:last-child{
      margin-right: 0;
    }
  }
  select{
    width: 120px; 
    color: $gray-600;
    flex-shrink: 0;   //css 적용 우선순위 (0순위)
    option{
      font-size: 14px;
      color: $gray-600;
    }
  }
  button{
    width: 120px;
    height: 50px;
    font-weight: 700;
    flex-shrink: 0;
  }
}

</style>