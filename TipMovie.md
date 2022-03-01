# Project : Movie Search App
# 1. 시작하기
## 1) 환경 설정
\- 페이지 관리 패키지(vue-router) 설치
```c
$ npm i vue-router@4
```
\- promise 기반 HTTP client (axios) 설치
```c
$ npm i axios
```
\- 컴포넌트 간 데이터 공유 모듈 (Vuex) 설치
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
