import Vue from 'vue'
let vue = new Vue()
//GET请求,将url和请求参数传入，通过Promise，将成功和失败的数据派发出去
export function getHttp(url, params) {
  return new Promise((resolve, reject) => {
    vue
      .$http({
        url: url,
        params: params,
        method: 'GET'
      })
      .then(response => {
        resolve(response.body)
      }, response => {      
        reject(response.bodyText)
      })
  })
}

//POST请求，将url,请求参数和body传入，通过Promise，将成功和失败的数据派发出去
export function postHttp(url, params, body) {
  return new Promise((resolve, reject) => {
    vue
      .$http.post(url,{params},{emulateJSON: true}).then((response) => {
				resolve(response.body)
			}, response => {
        reject(response.bodyText)
      })
  })
}
