import axios from '../axios'

/* 
 * 系统登录模块
 */

// 登录
export const mLogin = params => {
  return axios({
    url: 'api/login',
    method: 'post',
    params
  })
}


