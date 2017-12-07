/**
*  -------------------  整体分布-分终端 -------------------
**/
请求地址 ： http : // 127.0.0.1:8080/total_terminal
请求数据：
{
  areaId : '001_0' (查看枚举表)
  areaName : '长寿路' （查看枚举表）
  dateRange : [
    ‘2017 - 01 - 01 ’,
    ‘2017 - 01 - 31 ’
  ],
  monthRange: ["2017-01", "2017-03"],
  type : 0; // 根据  接口(total_terminal_getTypeNames)返回的type
}


返回数据：
{
  "code" : 1,
  "data" : {
    "uv": {
      // uv值
      values: [
        {
          "date": "2017-01-00",
          "value": 132,
          "changeValue": 100,
        }, ....... {
          "date": "2017-01-06",
          "value": 404,
          "changeValue": 100
        }
      ]
    },
    "pv": {
      // pv值
      values: [
        {
          "date": "2017-01-00",
          "value": 132,
          "changeValue": 100
        }, ....... {
          "date": "2017-01-06",
          "value": 404,
          "changeValue": 100
        }
      ]
    },
  },
  "success" : true
}
