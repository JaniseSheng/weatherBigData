/**
*  -------------------  整体分布-分场景 -------------------
**/
请求地址 ： http : // 127.0.0.1:8080/public_hot
请求数据：
{
  areaId : '001_0' (查看枚举表)
  areaName : '长寿路' （查看枚举表）
  dataRange : [
    ‘2017 - 01 - 01 ’,
    ‘2017 - 01 - 31 ’
  ]
}


返回数据：
{
  "code" : 0,
  "data" : [
    {
      name: '全部',
      id: 0,
      values: [
        {
          value: '40%', // 注意: 数字是百分比
          name: '股票'
        },
        {
          value: '30%',
          name: '教育'
        },
        {
          value: '20%',
          name: '医疗'
        },
        {
          value: '5%',
          name: '明星'
        },
        {
          value: '5%',
          name: '游戏'
        }
      ]
    }, {
      name: '新闻',
      id: 1,
      values: [
        {
          value: '40%', // 注意: 数字是百分比
          name: '股票'
        },
        {
          value: '30%',
          name: '教育'
        },
        {
          value: '20%',
          name: '医疗'
        },
        {
          value: '5%',
          name: '明星'
        },
        {
          value: '5%',
          name: '游戏'
        }
      ]
    }, {
      name: '微博',
      id: 2,
      values: [
        {
          value: '40%', // 注意: 数字是百分比
          name: '股票'
        },
        {
          value: '30%',
          name: '教育'
        },
        {
          value: '20%',
          name: '医疗'
        },
        {
          value: '5%',
          name: '明星'
        },
        {
          value: '5%',
          name: '游戏'
        }
      ]
    }, {
      name: '公众号',
      id: 3,
      values: [
        {
          value: '40%', // 注意: 数字是百分比
          name: '股票'
        },
        {
          value: '30%',
          name: '教育'
        },
        {
          value: '20%',
          name: '医疗'
        },
        {
          value: '5%',
          name: '明星'
        },
        {
          value: '5%',
          name: '游戏'
        }
      ]
    }
  ],
  "success" : true
}
