/**
*  -------------------  舆情分析-舆情流量 -------------------
**/
请求地址 ： http : // 127.0.0.1:8080/public_flow
请求数据：
{
  areaId : '001_0' (查看枚举表)
  areaName : '长寿路' （查看枚举表）
  dataRange : [
    ‘2017 - 01 - 01 ’,
    ‘2017 - 01 - 31 ’
  ],
  type : 0; // 根据  接口(public_flow_getTypeNames)返回的type
}

返回数据(根据type 返回不同的数据)：
{
  "code" : 1,
  "data" : [
    {
      name: '全部（新闻+微博+公众号）',
      values: [
        {
          "date": "2017-01-00",
          "value_uv": 132,
          "value_pv": 112
        },
        .......{
          "date": "2017-01-06",
          "value_uv": 132,
          "value_pv": 112
        }
      ]
    },
    {
      name: '全部（新闻）',
      values: [
        {
          "date": "2017-01-00",
          "value_uv": 132,
          "value_pv": 112
        },
        .......{
          "date": "2017-01-06",
          "value_uv": 132,
          "value_pv": 112
        }
      ]
    },
    {
      name: '全部（微博）',
      values: [
        {
          "date": "2017-01-00",
          "value_uv": 132,
          "value_pv": 112
        },
        .......{
          "date": "2017-01-06",
          "value_uv": 132,
          "value_pv": 112
        }
      ]
    },
    {
      name: '全部（公众号）',
      values: [
        {
          "date": "2017-01-00",
          "value_uv": 132,
          "value_pv": 112
        },
        .......{
          "date": "2017-01-06",
          "value_uv": 132,
          "value_pv": 112
        }
      ]
    }
  ],
  "success" : true
}
