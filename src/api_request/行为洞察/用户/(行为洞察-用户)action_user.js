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

请求地址 ： http : //127.0.0.1:8080/action_user

返回数据：
{
  "code" : 1,
  "data" : [
    {
      name: '人群1',
      id: 0,
      type: 'mobile',
      data: {
        value: '30%',
        name: 'test1'
      }
    },
    {
      name: '人群2',
      id: 1,
      type: 'mobile',
      data: {
        value: '50%',
        name: 'test2'
      }
    },
    {
      name: '人群3',
      id: 2,
      type: 'mobile',
      data: {
        value: '30%',
        name: 'test3'
      }
    }
  ],
  "success" : true
}
