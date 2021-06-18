/**定义一些全局方法和属性 */

/**获取登陆请求头 */
export const getAuthHeader = () => {
  return {
    Authorization: `Bearer ${localStorage.token || ''}`
  }
}

