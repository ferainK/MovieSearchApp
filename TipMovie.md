# Project : Movie Search App
# 1. 시작하기
## 1) 환경 설정 (Router)
\- 페이지 관리 패키지(vue-router) 설치
```c
$ npm i vue-router@4
```
\- promise 기반 HTTP client (axios) 설치
```c
$ npm i axios
```
\- 컴포넌트 간 데이터 공유 모듈 (Vuex) 설치  `[2장 에서 상세설명]`
```c
$ npm i vuex
```
\- 배열 데이터 관리 모듈 (lodash) 설치
```c
$ npm i lodash
```
\- routes 폴더 생성 <br>
\- routes 폴더 내 index.js / About.vue / Home.vue / Movie.vue 파일 생성
```js
//index.js
import { createRouter, createWebHashHistory} from 'vue-router'
import Home from './Home.vue'
import About from './About.vue'
import Movie from './Movie.vue'


export default createRouter({
    // hash mode vs history mode
    // hash mode : 별도 작업 없이 없는 페이지 컨트롤 가능
    // history mode : 서버 셋팅 필요
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',         //main page
            component: Home
        },
        {
            path: '/movie',         //moive page
            component: Movie
        },
        {
            path: '/about',    //about page
            component: About
        }
    ]
})
```
\- main.js 파일 수정
```js
// main.js
import {createApp} from 'vue'
import App from './App.vue'
import Router from '../routes/index.js'

createApp(App)
    .use(Router)
    .mount('#app')
```
\- App.vue 파일 수정
```html
<!-- App.vue -->
<template>
  <Header/>
  <RouterView/> <!--routes/index.js에 연동된 내용-->
</template>

<script>
import Header from './components/Header.vue'
export default {
  components:{
    Header,
  }
}
</script>

<style lang="scss">
  @import "~/scss/main";

</style>
```

## 2) 부트스트랩 사용하기
\- 부트스트랩 패키지 설치
```c
$ npm i bootstrap@next
```
\- src/scss/main.scss 파일 생성
```scss
// main.scss
@import "../../node_modules/bootstrap/scss/bootstrap.scss"
```
\- default 디자인 변경
```scss
//main.scss 가장 앞단
// bootstrap default control
$primary: #FDC000;

// bootstrap default module
@import "../../node_modules/bootstrap/scss/functions";
@import "../../node_modules/bootstrap/scss/variables";
@import "../../node_modules/bootstrap/scss/mixins";
@import "../../node_modules/bootstrap/scss/root";
```
\- SCSS reset CDN, font CDN, 모든 페이지에 적용할 기본 CSS는 index.html에 반영
\- `node_modules/bootstrap/scss/__variables.scss`에 기본색상 정보 활용하면 조금 편함

## 3) 비동기
> 1\. 과거 방법 : a(2)가 실행시키고 '실행중'이 표시됨, then/catch는 나중에 실행 
> ```js
> function a(number) {
>   return new Promise(function(resolve,reject) {
>     if (number > 4){
>       reject()
>     }
>     setTimeout(function() { 
>        console.log('A')
>        resolve()
>     },1000)
>   })
> }
>
> function test() {
>   a(2)
>     .then(funciton(){console.log('resolve')})
>     .catch(funciton(){console.log('reject')})
>     .finally(function(){console.log('finish')})
>   console.log('실행중')
> }
> ```

> 2\. 현재 방법 : await 명령어에 따라 a(2)가 완료될 때까지 일시정지
> ```js
> function a(number) {
>   return new Promise(function(resolve,reject) {
>     if (number > 4){
>       reject()
>     }
>     setTimeout(function() { 
>        console.log('A')
>        resolve()
>     },1000)
>   })
> }
>
> async function test() {
>   try{
>     await a(2)
>     console.log('resolve')
>   } catch(error){
>     console.log('reject')
>   } finally{
>     console.log('finish')
>   }
>   console.log('완료')
>

## 2. vuex (store)
### 1) vue 구성
\- main.js import 추가
```js
import Store from '~/store/index.js'

createApp(App)
    .use(Router)
    .use(Store) //추가 구문
    .mount('#app')
```
\- src/store 폴더 추가 및 `index.js`, `movie.js`, `about.js` 파일 추가
\- `index.js` 파일 작성 (Store 기본 정보)
```js
import {createStore} from 'vuex'
import movie from './movie.js'
import about from './about.js'

export default createStore({
    modules: {
        movie,
        about
    }
})
```
\- `movie.js` 파일 작성
```js
export default {
  // Vue의 modules
  namespaced: true,

  // Vue의 data
  state: (),

  //Vue의 computed
  getter: {},	

  //Vue의 method
  //  - state(data) 변이 (동기)
  mutations: {}
  //  - state(data) 변이 외 (비동기)
  actions: {}
```
\- `dispatch`를 통한 데이터 저장 `(→ store)`
```js
async apply() {
  //$store : 전역 변수
  //movie.js 內 searchMovies 'actions' 
  await this.$store.dispatch('movie/searchMovies', {
    title: this.title,
    type: this.type,
    number: this.number,
    year: this.year
  })
}
```
\- 데이터 호출 `(store →)`
```js
computed: {
  movies() {
    //store에 저장된 state 값
    //state값의 출처는 movie.movies
    return this.$store.state.movie.movies
  }
}
```

## 3. Netligy CLI (서버리스)
### 1) npm
```c
$ npm i -D netlify-cli
$ npm i netlify-cli -g
```

## 4. 서버 환경변수
```c
$ npm i -D dotenv-webpack
```