/**
*  -------------------  服务监控-APP -------------------
**/
请求地址 ： http : // 127.0.0.1:8080/service_app
请求数据：
{
  areaId : '001_0' (查看枚举表)
  areaName : '长寿路' （查看枚举表）
  dateRange : [
    ‘2017 - 01 - 01 ’,
    ‘2017 - 01 - 31 ’
  ],
  monthRange: ["2017-01", "2017-03"],
  type : 0; // 根据  接口(service_app_getTypeNames)返回的type
}


返回数据： {
  "code" : 1,
  "data" : {
    star: '3.5',
    // 预报准确率
    'percentage': [
      {
        "date": "2017-01-00",
        "value": 132
      },
      .......{
        "date": "2017-01-06",
        "value": 404
      }
    ],
    "uv": [
      {
        "date": "2017-01-00",
        "value": 132, // uv值
        "perValue": 140 //占比
      },
      .......{
        "date": "2017-01-06",
        "value": 404, // uv值
        "perValue": 140 //占比
      }
    ],
    "pv": [
      {
        "date": "2017-01-00",
        "value": 132, // uv值
        "perValue": 140 //占比
      },
      .......{
        "date": "2017-01-06",
        "value": 404, // uv值
        "perValue": 140 //占比
      }
    ]
  },
  "success" : true
}
