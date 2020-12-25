import axios from '../axios'

/* 
 * 用户权限管理
 */

// 侧导航菜单管理
export const findNavTree = (params) => {
  return axios({
    url: 'perms/findNavTree',
    method: 'get',
    params
  })
}

// 获取权限集合
export const findPermissions = (params) => {
  return axios({
    url: 'perms/findPermissions',
    method: 'get',
    params
  })
}