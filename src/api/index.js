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
// 分时数据下载
export const api_down_data_time = (params) => {
  return axiosPost('down_data_time', params)
}

// 官方气象网站占比分析 - 获取类型名称
export const api_weather_official_getTypeNames = (params) => {
  //return axiosPost('weather_official_getTypeNames', params)
  return new Promise((resolve, reject)=> {
    resolve({
      "code" : 1,
      "data" : [
        {
          name: '网站',
          id: '0'
        }, {
          name: 'APP',
          id: '1'
        }
      ],
      "success" : true
    })
  })
}
// 官方气象网站占比分析
export const api_weather_official = (params) => {
  // /return axiosPost('weather_official', params)
  return new Promise((resolve, reject)=> {
    resolve({
        "code" : 1,
        "data" : [
          {value: parseInt(Math.random()*100), name:'官方'},
          {value:parseInt(Math.random()*100), name:'非官方'}
        ],
        "success" : true
      })
  })
}

// 气象相关占比分析 - 获取类型名称
export const api_weather_relative_getTypeNames = (params) => {
  // return axiosPost('weather_relative_getTypeNames', params)
  return new Promise((resolve, reject)=> {
    resolve({
      "code" : 1,
      "data" : [
        {
          name: '全部',
          id: '0'
        }, {
          name: 'PC',
          id: '1'
        }, {
          name: 'Mobile',
          id: '2'
        }, {
          name: 'IPTV',
          id: '3'
        }
      ],
      "success" : true
    })
  })


}

// 气象相关占比分析
export const api_weather_relative = (params) => {
  // return axiosPost('weather_relative', params)
  return new Promise((resolve, reject)=> {
    resolve({
      "code" : 1,
      "data" : [
        {value: parseInt(Math.random()*100), name:'官方'},
        {value:parseInt(Math.random()*100), name:'非官方'}
      ],
      "success" : true
    })
  })
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
// 网站监控_top
export const api_service_web_top = (params) => {
  return axiosPost('service_web_top', params)
}

// app监控 - 获取类型的名字
export const api_service_app_getTypeNames = (params) => {
  return axiosPost('service_app_getTypeNames', params, false)
}
// app监控
export const api_service_app = (params) => {
  return axiosPost('service_app', params)
}
// app监控-top
export const api_service_app_top = (params) => {
  return axiosPost('service_app_top', params)
}

// 气象局自有栏目监控 - 获取类型的名字
export const api_service_weather_getTypeNames = (params) => {
  return axiosPost('service_weather_getTypeNames', params, false)
}
// 气象局自有栏目监控
export const api_service_weather = (params) => {
  return axiosPost('service_weather', params)
}
// 气象局自有栏目监控-top
export const api_service_weather_top = (params) => {
  return axiosPost('service_weather_top', params)
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
  if (params.type == 0) {
    return new Promise((resolve, reject)=> {
      resolve({
        "code" : 1,
        "data" : [
          {
            date: '2018-01',
            names: ['新闻1', '新闻2', '新闻3', '新闻4', '新闻5'],
            values: [parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100)]
          },
          {
            date: '2018-02',
            names: ['测试1', '测试2', '测试3', '测试4', '测试5'],
            values: [parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100)]
          },
          {
            date: '2018-03',
            names: ['数据1', '数据2', '数据3', '数据4', '数据5'],
            values: [parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100),parseInt(Math.random()*100)]
          }
        ],
        "success" : true
      })
    })
  } else {
    return axiosPost('public_flow', params)
  }

}
// 热点热词 - 获取类型的名字
export const api_public_hot_getTypeNames = (params) => {
  return axiosPost('public_hot_getTypeNames', params, false)
}
// 热点热词
export const api_public_hot = (params) => {
  return axiosPost('public_hot', params)
}
