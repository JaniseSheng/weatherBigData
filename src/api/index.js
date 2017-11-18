import {axiosPost, axiosGet} from '@/lib/ajax'
/**
* -------------------------- 整体分布 ------------------------------
**/

// 分终端
export const api_total_terminal = (params) => {
  return axiosPost('query_date', params)
}
// 分场景
export const api_total_scene = (params) => {
  return axiosPost('query_date', params)
}


/**
* -------------------------- 行为洞察 ------------------------------
**/

// 家庭类人群属性
export const api_action_family = (params) => {
  return axiosPost('query_date', params)
}
// 个人类人群
export const api_action_personal = (params) => {
  return axiosPost('query_date', params)
}
// 用户类人群
export const api_action_user = (params) => {
  return axiosPost('query_date', params)
}
