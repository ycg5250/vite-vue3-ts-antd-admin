
import ajax from "./ajax";


// const BASE_URL = 'admin/api'
// 基础路径 http://localhost:3000不用写，注意，下面的admin前面的  /  必须写
const BASE_URL = '/admin/api'

// 添加分类
export const reqAddCategoty = (data: object) => ajax(BASE_URL + '/categories', data, 'POST')

// 获取分类列表
export const reqGetCategotyList = () => ajax(BASE_URL + '/categories')

// 获取分类详情
export const reqGetCategoty = (id: object) => ajax(BASE_URL + '/categories/detail', id)

// 修改分类
export const reqUpdateGetCategoty = (data: object) => ajax(BASE_URL + '/categories/update', data, 'POST')

