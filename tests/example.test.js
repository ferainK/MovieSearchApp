// import {fetchMovieTitle} from './example'
// import axios from 'axios'

// describe('그룹', () => {
//     test('test', () => {
//         //모의함수
//         axios.get = jest.fn(() => {
//             return new Promise(resolve => {
//                 resolve({
//                     data:{
//                         Title: 'Frozen II'
//                     }
//                 })
//             })
//         })
//         //모의함수
//         return expect(fetchMovieTitle()).resolves.toBe('Frozen ii') //return과 resolves를 입력하여 비동기 처리
//     },7000)
// })

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