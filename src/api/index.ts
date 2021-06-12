
import ajax from "./ajax";


// const BASE_URL = 'admin/api'
// 基础路径 http://localhost:3000不用写，注意，下面的admin前面的  /  必须写
const BASE_URL = '/admin/api/rest'

// 定义通用CRUD请求接口

/**添加某个分类/物品 */
export const reqAdd = (modelUrl: string, data: object) => ajax(BASE_URL + modelUrl, data, 'POST')

/**获取某个分类/物品的列表 */
export const reqGetList = (modelUrl: string) => ajax(BASE_URL + modelUrl)

/**获取某个分类/物品的详情 */
export const reqGetDetail = (modelUrl: string, id: object) => ajax(BASE_URL + modelUrl + '/detail', id)

/**修改某个分类/物品 */
export const reqUpdate = (modelUrl: string, data: object) => ajax(BASE_URL + modelUrl + '/update', data, 'POST')

/**删除某个分类/物品 */
export const reqRemove = (modelUrl: string, data: object) => ajax(BASE_URL + modelUrl + '/delete', data, 'POST')
