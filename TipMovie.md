# Project : Movie Search App
# 1. 시작하기
## 1) 환경 설정
\- 페이지 관리 패키지(vue-router) 설치
```c
$ npm i vue-router@4
```
\- routes 폴더 생성 <br>
\- routes 폴더 내 About.vue/ Home.vus index.js 파일 생성
```js
//index.js
import { createRouter, createWebHashHistory} from 'vue-router'
import Home from './Home.vue'
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
  <RouterView />
</template>
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
