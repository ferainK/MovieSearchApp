import { TestScheduler } from 'jest'
import {asyncfn} from './example'

describe('그룹', () => {
    test('test', () => {
        return expect(asyncfn()).resolves.toBe('Done!') //return과 resolves를 입력하여 비동기 처리
    })
})