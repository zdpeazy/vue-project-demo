
import global from '@/utils/global'
export default {
  method: 'get',
  // 基础url前缀
  baseUrl: global.baseUrl,
  // 请求头信息
  jsonHeaders: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  formHeaders: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'
}