exports.handler = async function  (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'ferain',
      age: 30,
      email: 'ferain@kakao.com'
    })
  }
}