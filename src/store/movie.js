import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'
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
    async searchMovies({state, commit}, payload) {  //context => {commit, state} //state도 동일
      const {title, type, number, year} = payload
      const OMDB_API_KEY = '7035c60c'
      let res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`) 
      const {Search, totalResults } = res.data
      commit('updateState', { //context.commit => commit
        movies: _uniqBy(Search, 'imdbID')
      })

      const total = parseInt(totalResults, 10) //int로 데이터 변환 (10진수)x`
      const pageLength = Math.ceil(total/10)
      if (pageLength > 1) {
        for (let page = 2; page <= pageLength; page += 1){
          if (page > number / 10){
            break
          }
          res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`)
          const {Search} = res.data
          commit('updateState', {
            movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]  //... 전개 연산자
          }) 
        }
      }
    },
    //리펙토링
    
  }
}
function _fetchMovies({state, commit}, payload){
  const {title, type, number, year} = payload
  const OMDB_API_KEY = '7035c60c'
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}` 
  return new Promise(function(resolve, reject){
    try{
      res = axios.get(url)
    } catch(error){
      return error
    }
  })  
}