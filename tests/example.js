export function asyncfn(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done!')
        }, 6000)
    })
}