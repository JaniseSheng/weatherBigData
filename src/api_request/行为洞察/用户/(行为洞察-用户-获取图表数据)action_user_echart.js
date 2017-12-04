/**
*  -------------------  行为洞察-个人 -------------------
**/

请求数据：
{
  areaId : '001_0' (查看枚举表)
  areaName : '长寿路' （查看枚举表）
  dateRange : [
    ‘2017 - 01 - 01 ’,
    ‘2017 - 01 - 31 ’
  ],
  type : 'mobile', // 'mobile'
  id : 1 // 0:人群1 , 1:人群2 , 2:人群3
}

请求地址 ： http : //127.0.0.1:8080/action_user_echart

返回数据(人群1 type : 0)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: 'test0_1'
    }, {
      value: '150',
      name: 'test0_2'
    }
  ],
  "success" : true
}

返回数据(人群1 type : 1)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: 'test1_1'
    }, {
      value: '150',
      name: 'test1_2'
    }
  ],
  "success" : true
}

返回数据(人群1 type : 2)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: 'test2_1'
    }, {
      value: '150',
      name: 'test2_2'
    }
  ],
  "success" : true
}
