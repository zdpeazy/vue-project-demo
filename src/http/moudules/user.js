import axios from '../axios'

/* 
 * 用户管理模块
 */

// 保存
export const mUserSave = (params) => {
  return axios({
    url: '/api/user/add',
    method: 'post',
    params
  })
}
// 删除
export const mUserDel = (params) => {
  return axios({
    url: '/api/user/delete',
    method: 'post',
    params
  })
}
// 更新
export const mUserUpate = (params) => {
  return axios({
    url: '/api/user/update',
    method: 'post',
    params
  })
}
// 获取列表
export const mGetUserList = (params) => {
  return axios({
    url: '/api/user/list',
    method: 'post',
    params
  })
}

//用户等级列表接口
export const mGetUserLevelList = (params) => {
  return axios({
    url: '/api/user/getUserLevelList',
    method: 'get',
    params
  })
}

//部门角色非部门角色列表
export const mGetUserRole = (params) => {
  return axios({
    url: '/api/user/getUserRole',
    method: 'get',
    params
  })
}

//重置密码
export const mResetPassword = (params) => {
  return axios({
    url: '/api/user/resetPassword',
    method: 'post',
    params
  })
}

//获取城市
export const mGetCityList = (params) => {
  params = {
    method: 'open.city.list',
    ...params
  }
  return axios({
    url: '/djapi',
    method: 'get',
    params
  })
}

//获取机构
export const mGetOrganizationList = (params) => {
  params = {
    method: 'common.organization',
    ...params
  }
  return axios({
    url: '/djapi',
    method: 'get',
    params
  })
}

// 改变用户状态
export const mChangeStatus = (params) => {
  return axios({
    url: '/api/user/changeUserStatus',
    method: 'post',
    params
  })
}
