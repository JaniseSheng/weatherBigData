/**
*  -------------------  (服务监控-app流量监测) -------------------
**/
请求地址 ： http : // 127.0.0.1:8080/service_app_top
请求数据： {
  areaId : '001_0' (查看枚举表)
  areaName : '长寿路' （查看枚举表）
  dateRange : [
    ‘2017 - 01 - 01 ’,
    ‘2017 - 01 - 31 ’
  ],
  monthRange: ["2017-01", "2017-03"],
  type : '';  //这type 传不传无所谓
}


返回数据： {
  "code" : 1,
  "data" : [
    {
      "name": "app1",
      "value": 132, // uv值
    },
    {
      "name": "app2",
      "value": 102, // uv值
    },
    ................
    {
      "name": "app10",
      "value": 98, // uv值
    }
  ],
  "success" : true
}
