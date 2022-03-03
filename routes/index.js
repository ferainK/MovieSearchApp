import { createRouter, createWebHashHistory} from 'vue-router'
import Home from './Home.vue'
import Movie from './Movie.vue'
import About from './About.vue'


export default createRouter({
    //hash mode vs history mode
    // hash mode : 별도 작업 없이 없는 페이지 컨트롤 가능
    // history mode : 서버 셋팅 필요
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',         //main page
            component: Home
        },
        {
            path: '/movie/:id',         //movie page
            component: Movie
        },
        {
            path: '/about',    //about page
            component: About
        }
    ]
})