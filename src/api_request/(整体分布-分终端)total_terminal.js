/**
*  -------------------  整体分布-分场景 -------------------
**/
请求地址 ： http : // 127.0.0.1:8080/total_scene
请求数据：
{
  areaId : '001_0' (查看枚举表)
  areaName : '长寿路' （查看枚举表）
  dataRange : [
    ‘2017 - 01 - 01 ’,
    ‘2017 - 01 - 31 ’
  ]
  type : 0;
}

type枚举：
type : [
  {
    name: '室内',
    id: '0'
  }, {
    name: '室外',
    id: '1'
  }
]

返回数据：
{
  "code" : 0,
  "data" : {
    "uv": [
      {
        "date": "2017-01-00",
        "value": 132,
        'changeValue': 100
      }, ....... {
        "date": "2017-01-06",
        "value": 404,
        'changeValue': 100
      }
    ],
    "pv": [
      {
        "date": "2017-01-00",
        "value": 132,
        'changeValue': 100
      }, ....... {
        "date": "2017-01-06",
        "value": 404,
        'changeValue': 100
      }
    ],
  },
  "success" : true
}
