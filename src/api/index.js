import {axiosPost, axiosGet} from '@/lib/ajax'

/**
* -------------------------- 登录 ------------------------------
**/
export const api_login = (params) => {
  return axiosPost('login', params)
}



/**
* -------------------------- 整体分布 ------------------------------
**/

// 分终端-获取类型的名字
export const api_total_terminal_getTypeNames = (params) => {
  return axiosPost('total_terminal_getTypeNames', params, false)
}
// 分终端
export const api_total_terminal = (params) => {
  return axiosPost('total_terminal', params)
}
// 分场景-获取类型的名字
export const api_total_scene_getTypeNames = (params) => {
  return axiosPost('total_scene_getTypeNames', params, false)
}
// 分场景
export const api_total_scene = (params) => {
  return axiosPost('total_scene', params)
}



/**
* -------------------------- 行为洞察 ------------------------------
**/

// 家庭
export const api_action_family = (params) => {
  return axiosPost('action_family', params, false)
}
// 家庭-echart
export const api_action_family_echart = (params) => {
  return axiosPost('action_family_echart', params)
}
// 个人
export const api_action_personal= (params) => {
  return axiosPost('action_personal', params, false)
}
// 个人-echart
export const api_action_personal_echart = (params) => {
  return axiosPost('action_personal_echart', params)
}
// 个人
export const api_action_user= (params) => {
  return axiosPost('action_user', params, false)
}
// 个人-echart
export const api_action_user_echart = (params) => {
  return axiosPost('action_user_echart', params)
}

/**
* -------------------------- 服务监控 ------------------------------
**/

// 网站监控 - 获取类型的名字
export const api_service_web_getTypeNames = (params) => {
  return axiosPost('service_web_getTypeNames', params, false)
}
// 网站监控
export const api_service_web = (params) => {
  return axiosPost('service_web', params)
}

// app监控 - 获取类型的名字
export const api_service_app_getTypeNames = (params) => {
  return axiosPost('service_app_getTypeNames', params, false)
}
// app监控
export const api_service_app = (params) => {
  return axiosPost('service_app', params)
}

// 气象局自有栏目监控 - 获取类型的名字
export const api_service_weather_getTypeNames = (params) => {
  return axiosPost('service_weather_getTypeNames', params, false)
}
// 气象局自有栏目监控
export const api_service_weather = (params) => {
  return axiosPost('service_weather', params)
}

/**
* -------------------------- 舆情分析 ------------------------------
**/

// 舆情流量 - 获取类型的名字
export const api_public_flow_getTypeNames = (params) => {
  return axiosPost('public_flow_getTypeNames', params, false)
}
// 舆情流量
export const api_public_flow = (params) => {
  return axiosPost('public_flow', params)
}
// 热点热词
export const api_public_hot = (params) => {
  return axiosPost('public_hot', params)
}
