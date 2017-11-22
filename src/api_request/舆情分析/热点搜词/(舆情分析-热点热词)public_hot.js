/**
*  -------------------  舆情分析-热点热词 -------------------
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
  "code" : 1,
  "data" : [
    {
      name: '全部',
      id: 0,
      values: [
        {
          value: '300',
          name: '股票'
        },
        {
          value: '130',
          name: '教育'
        },
        {
          value: '130',
          name: '医疗'
        },
        {
          value: '130',
          name: '明星'
        },
        {
          value: '130',
          name: '游戏'
        }
      ]
    }, {
      name: '新闻',
      id: 1,
      values: [
        {
          value: '130',
          name: '新闻1'
        },
        {
          value: '130',
          name: '新闻2'
        },
        {
          value: '130',
          name: '新闻3'
        },
        {
          value: '130',
          name: '新闻4'
        },
        {
          value: '130',
          name: '新闻5'
        }
      ]
    }, {
      name: '微博',
      id: 2,
      values: [
        {
          value: '130',
          name: '微博1'
        },
        {
          value: '130',
          name: '微博2'
        },
        {
          value: '130',
          name: '微博3'
        },
        {
          value: '130',
          name: '微博4'
        },
        {
          value: '130',
          name: '微博5'
        }
      ]
    }, {
      name: '公众号',
      id: 3,
      values: [
        {
          value: '130',
          name: '公众号1'
        },
        {
          value: '130',
          name: '公众号3'
        },
        {
          value: '130',
          name: '公众号3'
        },
        {
          value: '130',
          name: '公众号4'
        },
        {
          value: '130',
          name: '公众号5'
        }
      ]
    }
  ],
  "success" : true
}
