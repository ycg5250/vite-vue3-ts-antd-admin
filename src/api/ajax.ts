import { message } from 'ant-design-vue'
import axios from 'axios'

let msg: any = ''
let flag = false

/**请求拦截器 */
axios.interceptors.request.use((config) => {
  if (localStorage.token) {
    config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
  }
  return config
}, function (error) {
  return Promise.reject(error);
});

/**响应拦截器 */
axios.interceptors.response.use(response => {
  return response;
}, error => {
  // debugger
  if (error && error.response.data.message) {
    // console.log(error.response)
    msg = error.response.data.message
  }
  if (error.response.status === 401) {
    // 跳转到登陆页面
    window.location.replace('/login')
  }
  return Promise.reject(error)
});


export default function ajax(url: string, data: object = {}, type: string = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    // 发送get请求
    if (type === 'GET') {
      promise = axios.get(url, {
        params: data
      })
    } else { // 发送post请求
      // console.log(data)
      promise = axios.post(url, data)
    }

    //统一处理请求
    promise.then(response => {
      resolve(response.data)
    })
      .catch(error => {
        // console.log(error)
        // reject(error)
        // 防止多个错误重复弹框
        if (!flag) {
          message.error(msg)
        }
        flag = true
        setTimeout(() => {
          flag = false
        }, 1000)
      })
  })
}