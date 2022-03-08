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

## 5. 단위 검증
```c
$ npm i -D jest 
$ npm i -D @vue/test-utils@next 
$ npm i -D vue-jest@next 
$ npm i -D babel-jest
```
### 1) jext
- test 방법
  - afterAll / beforeAll(callback) : 모든 테스트가 시작하기 전/후에 한번만 수행함
  - afterEach / beforeEach(callback) : 각각의 테스트가 시작하기 전/후에 수행함
  - describe('그룹 이름', callback) : 그룹화
  - test('테스트 이름', callback, wait time:5000) : 테스트 수행 (함수 결과를 5초까지만 대기)
- callback (test 조건)
  - expect() : 테스트 대상 (함수의 결과값)
  - toBe() : 예상되는 결과 (참조형(객체, 배열 등)은 비교 불가)
  - toEqual() : 예상되는 결과 (참조형(객체, 배열 등)은 비교 가능)
  - toContain() : 예상되는 결과 중 포함되는지 여부
  - not : expect와 toBe/toEqual이 다르면 true (expect 뒤에 사용)
  - resolves : 비동기(expect 뒤에 사용)
  - rejects : 비동기(expect 뒤에 사용)
- 모의 함수 (Mocking) : 외부 요인은 고려하지 않기 위해 사용됨 (jest.fn)
  - .mockReturnValue('xxx') : 임의 리턴값 생성
  - .mockResolvedValue('xxx') : 임의 비동기 완료값 생성
  - .mockRejectedValue(new Error('xxx')) : 임의 비동기 거부값 생성
    ```js
    test('test', () => {
      //모의함수 (fetchMovieTitile 함수에서 사용되는 axios.get 함수를 아래의 콜백함수로 변경)
      axios.get = jest.fn(() => {
        return new Promise(resolve => {
          resolve({
            data:{
              Title: 'Frozen II'
            }
          })
        })
      })
      //테스트 내용
      return expect(fetchMovieTitle()).resolves.toBe('Frozen ii')
    },7000)
    ```
- mount(외부 모듈, 옵션)  // shallowMout : 연결되어 있는 하위 모듈들은 랜더링하지 않음
  - 기본 형태 (비동기 처리 예제)
    ```js
    import {mount} from '@vue/test-utils'
    import Example from './Example.vue'

    test('메시지를 변경합니다.', async () => {
        const wrapper = mount(Example)
        //wrapper.vm. === this.
        expect(wrapper.vm.msg).toBe('Hi')
        await wrapper.setData({
            msg: 'Hello? Lee'
        })
        expect(wrapper.vm.msg).toBe('Hi')
        expect(wrapper.find('div').text()).toBe('Hi')
    })
    ```
  - attrs 옵션 : 요소의 속성(class, id 등) 수정
      ```js
      const wrapper = mount(Example, {
        attrs: {
          id: 'hello',
          disable: true
        }
      })
      expect(wrapper.attributes()).toEqual({
        id: 'hello',
        disable: 'true'
      })
      ```
  - data 옵션 : 내부 변수 (비동기 처리 불가)
    ```js
    const wrapper = mount(Example, {
      data() {
        return{
          msg: 'okay'
        }
      }
    })
    expect(wrapper.html()).toContain('okay')
    ```
  - props 옵션 : 외부에서 입력받는 매개변수
    ```js
    const wrapper = mount(Example, {
      props: {
        count: 5
      }
    })
    expect(wrapper.html()).toContain('5')
    ```
  - global.plugins : 
    ```js
    import { mount } from '@vue/test-utils'
    import Example from '~example.js'
    import myPlugin from '@/plugins/myPlugin.js'
    
    test('test', () => {
      mount(Example, {
        global: {
          pluins : [myPlugin]
        }
      })
    })
    ```
- wrapper 매소드
  - attribue
    ```js
    // HTML에 id 속성의 이름이 input인지?
    expect(wrapper.attribute('id')).toEqual('input')
    ```
  - find/exists
    ```js
    // HTML에 span 속성이 존재하는지?
    expect(wrapper.find('span').exists()).toBe(true)
    // HTML에 class="container"가 이 있는지?
    expect(wrapper.find('[class="container"]').exists()).toBe(true)
    ```
  - setData (비동기 처리 가능)
    ```js
    // 비동기처리 후 data가 1로 변경되었는지?
    const wrapper = mount(Example)
    await wrapper.setData({count: 1})
    expect(wrapper.html()).toContain('1')
    ```
  - unmout
    ```js
    //mount가 해제됨 (HTML 랜더링 취소)
    const wrapper = mount(Example)
    wrapper.unmount()
    ```
  - vm (vue model) : vue의 data 지칭할 떄 사용 (this 와 동일)
    ```js
    wrapper.vm.msg
    ```
- vue 전용 기능
  - routerlink 컨트롤
    ```js
    //기본 메인페이지가 아닌 다른 페이지에서 단위검증을 수행할 때,
    import router from ''
    router.push('/movie/tt1234567')
    await router.isReady()
    ```

## 6. E2E 검증
```c
$ npm i -D cypress
$ npm i -D eslint-plugin-cypress
```

