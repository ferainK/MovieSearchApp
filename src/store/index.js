import {createStore} from 'vuex'
import movie from './moive.js'
import about from './about.js'

export default createStore({
    modules: {
        movie,
        about
    }
})