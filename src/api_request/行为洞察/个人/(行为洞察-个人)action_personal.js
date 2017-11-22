/**
*  -------------------  行为洞察-个人 -------------------
**/

请求数据：
{
  areaId : '001_0' (查看枚举表)
  areaName : '长寿路' （查看枚举表）
  dataRange : [
    ‘2017 - 01 - 01 ’,
    ‘2017 - 01 - 31 ’
  ]
}

请求地址 ： http : //127.0.0.1:8080/action_personal

返回数据：
{
  "code" : 1,
  "data" : [
    {
      name: '性别',
      id: 0,
      type: 'mobile',
      data: {
        value: '30%',
        name: '男'
      }
    },
    {
      name: '年龄',
      id: 1,
      type: 'mobile',
      data: {
        value: '50%',
        name: '23-28'
      }
    },
    {
      name: '住宅区',
      id: 2,
      type: 'mobile',
      data: {
        value: '30%',
        name: '静安区'
      }
    },
    {
      name: '工作区',
      id: 3,
      type: 'mobile',
      data: {
        value: '25%',
        name: '徐汇区'
      }
    },
    {
      name: '娱乐区',
      id: 4,
      type: 'mobile',
      data: {
        value: '28%',
        name: '浦东新区'
      }
    },
    {
      name: '电信端消费能力',
      id: 5,
      type: 'mobile',
      data: {
        value: '100',
        name: '中'
      }
    },
    {
      name: '银联消费能力',
      id: 6,
      type: 'mobile',
      data: {
        value: '120',
        name: '中'
      }
    },
    {
      name: '气象类服务消费能力',
      id: 7,
      type: 'mobile',
      data: {
        value: '300',
        name: '中'
      }
    },
    {
      name: '车辆情况',
      id: 8,
      type: 'mobile',
      data: {
        value: '60%',
        name: '有车'
      }
    },
    {
      name: '住宅情况',
      id: 9,
      type: 'mobile',
      data: {
        value: '20%',
        name: '5-6w'
      }
    },
    {
      name: '互联网行为分布',
      id: 10,
      type: 'mobile',
      data: {
        value: '15%',
        name: '购物'
      }
    }
  ],
  "success" : true
}
