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
    async searchMovies({commit}, payload) {  //context => {commit}
      const {title, type, number, year} = payload
      const OMDB_API_KEY = '7035c60c'
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=1`) 
      const {Search, totalResults } = res.data
      commit('updateState', { //context.commit => commit
        movies: Search
      })
    }
  }
}