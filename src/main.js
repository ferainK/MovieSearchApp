import {createApp} from 'vue'
import App from './App.vue'   // resolve 설정했다면, .vue 생략 가능
import Router from '../routes/index.js'
import Store from '~/store/index.js'
import loadImage from '~/plugins/loadImage.js'

createApp(App)
    .use(Router)
    .use(Store)
    .use(loadImage)
    .mount('#app')