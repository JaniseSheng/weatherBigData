/**
*  -------------------  分时数据下载 -------------------
**/
请求地址 ： http : // 127.0.0.1:8080/down_data_time
请求数据：
{
  areaName : '上海市', //写死
  dateRange : [
    ‘2017 - 01 - 01 ’,
    ‘2017 - 01 - 31 ’
  ],
  monthRange: ["2017-01", "2017-03"]
}


返回数据：
{
  "code" : 1,
  "data" : {
    colums : [
      {
        title: '日期',
        key: 'dta_date'
      }, {
        title: '终端类型',
        key: 'uatype'
      },
      {
        title: '人数',
        key: 'uv'
      }, {
        title: '小数点',
        key: 'hour'
      }
    ],
    values : [
      {
        "dta_date": "2018-05-01",
        "uatype": 'pc',
        "uv": '200',
        'hour': '01'
      },
      {
        "dta_date": "2018-05-01",
        "uatype": 'mobile',
        "uv": '420',
        'hour': '07'
      },
      {
        "dta_date": "2018-05-01",
        "uatype": 'iptv',
        "uv": '310',
        'hour': '03'
      },
      {
        "dta_date": "2018-05-01",
        "uatype": 'pc',
        "uv": '510',
        'hour': '05'
      },
      {
        "dta_date": "2018-05-01",
        "uatype": 'mobile',
        "uv": '150',
        'hour': '02'
      },
      {
        "dta_date": "2018-05-01",
        "uatype": 'pc',
        "uv": '280',
        'hour': '09'
      }
    ]
  },
  "success" : true
}
