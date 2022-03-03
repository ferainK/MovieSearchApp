import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'
export default {
  // Vue의 modules
  namespaced: true,		
  // Vue의 data
  state: (() => ({ 
    movies: [],
    message:'Search for te moive title!',
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
      //중복실행 방지
      if (state.loading){
        return 
      }
      //초기화
      commit('updateState', {
        movies: [],
        movieInfo: {},
        message: '',
        loading: true
      })
      //실행
      try{
        let pageLength = 100
        let totalSearch = []
        let pageLimit = 1
        for (let page = 1; page <= pageLength; page += 1){
          //db Link
          let res = await _fetchMovies({
            ...payload,
            page
          })
          //mutations 실행 (state 저장)        
          if (page === 1){
            this.pageLimit = Math.ceil(parseInt(totalResults, 10)/10)
          } else if (page <= pageLimit|page > payload.number / 10){
            commit('updateState', { //context.commit => commit
              movies: [..._uniqBy(totalSearch, 'imdbID')],
              loading: false
            })
            break
          }
          //dataframe화
          let {Search, totalResults } = res.data
          totalSearch = [...totalSearch, ...Search]
        }  
      } catch(message){
        commit('updateState',{
          movies: [],
          message,
          loading: false
        })
      }
    },

    async searchMovieWithId({state, commit}, payload) {
      if (state.loading) return
      commit('updateState', {
        movieInfo: {},
        loading: true
      })

      try{
        const res = await _fetchMovies(payload)
        commit('updateState'), {
          movieInfo: res.data,
          loading: false
        }
      } catch(error){
        commit('updateState',{
          movieInfo: {},
          loading: false
        })

      }
    }
    
  }
}

function _fetchMovies(payload){
  const {title, type, year, page, id} = payload
  const OMDB_API_KEY = '7035c60c'
  const url = id
    ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
    : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}` 
    return new Promise(function(resolve, reject){
    axios.get(url)
      .then(function(res) {
        if (res.data.Error){
          reject(res.data.Error)  
        }
        resolve(res)
      })
      .catch(function(error) {
        reject(error)
      })
  })  
}