export default {
	// Vue의 modules
	namespaced: true,		
	// Vue의 data
	state: (() => ({ 
		movies: []
	})),
	//Vue의 computed
	getter: {
		movieIds(state) {
			return state.moives.map((m)=>m.imdbID)
		}
	},	
	//Vue의 method
	//state(data) 변이
	mutations: {
		resetMovies(state) {
			state.movies = []
		}
	},
	//state(data) 변이 외 (비동기)
	actions: {
		searchMovies() {

		}
	}
	
}