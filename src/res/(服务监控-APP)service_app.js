/**
*  -------------------  整体分布-分场景 -------------------
**/
请求地址 ： http : // 127.0.0.1:8080/service_app
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
    name: 'app1',
    id: 0
  }, {
    name: 'app2',
    id: 1
  }, {
    name: 'app3',
    id: 2
  }
]

返回数据：
{
  "code" : 0,
  "data" : {
    // 预报准确率
    'percentage': [
      {
        "date": "2017-01-00",
        "value": 132
      }, ....... {
        "date": "2017-01-06",
        "value": 404
      }
    ],
    "uv": {
      // uv值
      values: [
        {
          "date": "2017-01-00",
          "value": 132
        }, ....... {
          "date": "2017-01-06",
          "value": 404
        }
      ],
      // uv变化率
      change: [
        {
          "date": "2017-01-00",
          "value": 162
        }, ....... {
          "date": "2017-01-06",
          "value": 304
        }
      ],
    },
    "pv": {
      // pv值
      values: [
        {
          "date": "2017-01-00",
          "value": 132
        }, ....... {
          "date": "2017-01-06",
          "value": 404
        }
      ],
      // pv变化率
      change: [
        {
          "date": "2017-01-00",
          "value": 162
        }, ....... {
          "date": "2017-01-06",
          "value": 304
        }
      ],
    },
    ]
  },
  "success" : true
}
