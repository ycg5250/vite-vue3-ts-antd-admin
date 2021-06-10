import { message } from 'ant-design-vue'
import axios from 'axios'

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
    }).catch(error => {
      message.error('请求出错：', error)
    })
  })
}