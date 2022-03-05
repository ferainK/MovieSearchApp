export default{
  namespaced: true,
  //데이터의 불변성을 위해 함수로 생성
  state: () => {
    return{
      name: 'ferain',
      email: 'ferain@kakao.com',
      blog: 'https://github.com/ferainK',
      phone: '+82-10-4909-5555',
      image: require('assets/logo.png').default
    }
  }
}