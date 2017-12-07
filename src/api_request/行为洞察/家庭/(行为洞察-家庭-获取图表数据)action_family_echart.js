/**
*  -------------------  行为洞察-家庭 -------------------
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
  type : 'pc', // pc、 iptv
  id : 1 // 0:人口数量 , 1:电信端消费能力 , 2:银联消费能力 , 3:气象类服务消费能力 , 4:车辆情况 , 5: 住宅情况 , 6:互联网行为分布
}

请求地址 ： http : //127.0.0.1:8080/action_family_echart

返回数据(人口数量 type : 0)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '1口之家'
    }, {
      value: '150',
      name: '2口之家'
    }, {
      value: '210',
      name: '3口之家'
    }, {
      value: '200',
      name: '4口之家'
    }, {
      value: '120',
      name: '5口之家'
    }, {
      value: '70',
      name: '其他'
    }
  ],
  "success" : true
}

返回数据(电信端消费能力 type : 1)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '高'
    }, {
      value: '150',
      name: '中'
    }, {
      value: '210',
      name: '低'
    }
  ],
  "success" : true
}

返回数据(银联消费能力 type : 2)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '高'
    }, {
      value: '150',
      name: '中'
    }, {
      value: '210',
      name: '低'
    }
  ],
  "success" : true
}

返回数据(气象类服务消费能力 type : 3)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '高'
    }, {
      value: '150',
      name: '中'
    }, {
      value: '210',
      name: '低'
    }
  ],
  "success" : true
}

返回数据(车辆情况 type : 4)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '有车'
    }, {
      value: '150',
      name: '无车'
    }
  ],
  "success" : true
}

返回数据(住宅情况 type : 5)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '2-3w'
    }, {
      value: '100',
      name: '3-4w'
    }, {
      value: '100',
      name: '4-5w'
    }, {
      value: '100',
      name: '5-6w'
    }, {
      value: '100',
      name: '6-7w'
    }, {
      value: '100',
      name: '7-8w'
    }, {
      value: '100',
      name: '8-9w'
    }, {
      value: '100',
      name: '9-10w'
    }, {
      value: '100',
      name: '10w以上'
    }
  ],
  "success" : true
}

返回数据(互联网行为分布 type : 6)：
{
  "code" : 1,
  "data" : [
    {
      value: '100',
      name: '生活'
    }, {
      value: '200',
      name: '购物'
    }, {
      value: '300',
      name: '休闲娱乐'
    }, {
      value: '150',
      name: '科技'
    }, {
      value: '210',
      name: '阅读'
    }, {
      value: '230',
      name: '视频'
    }, {
      value: '340',
      name: '游戏'
    }, {
      value: '400',
      name: '教育'
    }, {
      value: '500',
      name: '财经'
    }, {
      value: '180',
      name: '区域'
    }, {
      value: '210',
      name: '体育'
    }, {
      value: '290',
      name: '政治'
    }, {
      value: '420',
      name: '音乐'
    }, {
      value: '310',
      name: '门户'
    }, {
      value: '360',
      name: '其他'
    }
  ],
  "success" : true
}
