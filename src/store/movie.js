import axios from 'axios'
export default {
  // Vue의 modules
  namespaced: true,		
  // Vue의 data
  state: (() => ({ 
    movies: [],
    message:'',
    loading: false
  })),
  //Vue의 computed
  getter: {},	
  //Vue의 method
  //state(data) 변이
  mutations: {
    updateState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
    }
  },
  //state(data) 변이 외 (비동기)
  actions: {
    async searchMovies({state, commit}, payload) {  //context => {commit} //state도 동일
      const {title, type, number, year} = payload
      const OMDB_API_KEY = '7035c60c'
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`) 
      commit('updateState', { //context.commit => commit
        movies: Search
      })

      const {Search, totalResults } = res.data
      const total = parseInt(totalResults, 10) //int로 데이터 변환 (10진수)
      const pageLength = Math.ceil(total/10)
      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page =+ 1){
          if (page>number / 10){
            break
          }
          const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const {Search} = res.data
          commit('updateState', {
            movies: [...state.moives, ...Search]  //... 전개 연산자
          }) 
        }
      }
    }
  }
}