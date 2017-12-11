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
  monthRange: ["2017-01", "2017-03"],
  type : 'mobile', // 'mobile'
  id : 1 // 0:性别 , 1:年龄 , 2:住宅区 , 3:工作区 , 4:娱乐区 , 5: 电信端消费能力 , 6:银联消费能力， 7:气象类服务消费能力, 8:车辆情况, 9:住宅情况, 10:互联网行为分布
}

请求地址 ： http : //127.0.0.1:8080/action_personal_echart

返回数据(性别 type : 0)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '男',
      "perValue": 30 //占比
    }, {
      value: '150',
      name: '女',
      "perValue": 30 //占比
    }
  ],
  "success" : true
}

返回数据(年龄 type : 1)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '18以下',
      "perValue": 30 //占比
    }, {
      value: '150',
      name: '18-22岁',
      "perValue": 30 //占比
    }, {
      value: '310',
      name: '23-28岁',
      "perValue": 30 //占比
    }, {
      value: '410',
      name: '29-34岁',
      "perValue": 30 //占比
    }, {
      value: '480',
      name: '35-40岁'
      "perValue": 30 //占比
    }, {
      value: '420',
      name: '41-46岁'
      "perValue": 30 //占比
    }, {
      value: '360',
      name: '47-52岁'
      "perValue": 30 //占比
    }, {
      value: '120',
      name: '52-60岁'
      "perValue": 30 //占比
    }, {
      value: '100',
      name: '60岁以上'
      "perValue": 30 //占比
    },
  ],
  "success" : true
}

返回数据(住宅区 type : 2)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '黄浦区'
      "perValue": 30 //占比
    }, {
      value: '150',
      name: '静安区'
      "perValue": 30 //占比
    }, {
      value: '210',
      name: '宝山区'
      "perValue": 30 //占比
    },
    .......所有的行政区
  ],
  "success" : true
}

返回数据(工作区 type : 3)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '黄浦区',
      "perValue": 30 //占比
    }, {
      value: '150',
      name: '静安区',
      "perValue": 30 //占比
    }, {
      value: '210',
      name: '宝山区',
      "perValue": 30 //占比
    },
    .......所有的行政区
  ],
  "success" : true
}

返回数据(娱乐区 type : 4)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '黄浦区',
      "perValue": 30 //占比
    }, {
      value: '150',
      name: '静安区',
      "perValue": 30 //占比
    }, {
      value: '210',
      name: '宝山区',
      "perValue": 30 //占比
    },
    .......所有的行政区
  ],
  "success" : true
}

返回数据(电信端消费能力 type : 5)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '高',
      "perValue": 30 //占比
    }, {
      value: '150',
      name: '中',
      "perValue": 30 //占比
    }, {
      value: '210',
      name: '低',
      "perValue": 30 //占比
    }
  ],
  "success" : true
}

返回数据(银联消费能力 type : 6)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '高',
      "perValue": 30 //占比
    }, {
      value: '150',
      name: '中',
      "perValue": 30 //占比
    }, {
      value: '210',
      name: '低',
      "perValue": 30 //占比
    }
  ],
  "success" : true
}

返回数据(气象类服务消费能力 type : 7)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '高',
      "perValue": 30 //占比
    }, {
      value: '150',
      name: '中',
      "perValue": 30 //占比
    }, {
      value: '210',
      name: '低',
      "perValue": 30 //占比
    }
  ],
  "success" : true
}

返回数据(车辆情况 type : 8)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '有车',
      "perValue": 30 //占比
    }, {
      value: '150',
      name: '无车',
      "perValue": 30 //占比
    }
  ],
  "success" : true
}

返回数据(住宅情况 type : 9)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '2-3w',
      "perValue": 30 //占比
    }, {
      value: '100',
      name: '3-4w',
      "perValue": 30 //占比
    }, {
      value: '100',
      name: '4-5w',
      "perValue": 30 //占比
    }, {
      value: '100',
      name: '5-6w',
      "perValue": 30 //占比
    }, {
      value: '100',
      name: '6-7w',
      "perValue": 30 //占比
    }, {
      value: '100',
      name: '7-8w',
      "perValue": 30 //占比
    }, {
      value: '100',
      name: '8-9w',
      "perValue": 30 //占比
    }, {
      value: '100',
      name: '9-10w',
      "perValue": 30 //占比
    }, {
      value: '100',
      name: '10w以上',
      "perValue": 30 //占比
    }
  ],
  "success" : true
}

返回数据(互联网行为分布 type : 10)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '生活',
      "perValue": 30 //占比
    }, {
      value: '200',
      name: '购物',
      "perValue": 30 //占比
    }, {
      value: '300',
      name: '休闲娱乐',
      "perValue": 30 //占比
    }, {
      value: '150',
      name: '科技',
      "perValue": 30 //占比
    }, {
      value: '210',
      name: '阅读',
      "perValue": 30 //占比
    }, {
      value: '230',
      name: '视频',
      "perValue": 30 //占比
    }, {
      value: '340',
      name: '游戏',
      "perValue": 30 //占比
    }, {
      value: '400',
      name: '教育',
      "perValue": 30 //占比
    }, {
      value: '500',
      name: '财经',
      "perValue": 30 //占比
    }, {
      value: '180',
      name: '区域',
      "perValue": 30 //占比
    }, {
      value: '210',
      name: '体育',
      "perValue": 30 //占比
    }, {
      value: '290',
      name: '政治',
      "perValue": 30 //占比
    }, {
      value: '420',
      name: '音乐',
      "perValue": 30 //占比
    }, {
      value: '310',
      name: '门户',
      "perValue": 30 //占比
    }, {
      value: '360',
      name: '其他',
      "perValue": 30 //占比
    }
  ],
  "success" : true
}
