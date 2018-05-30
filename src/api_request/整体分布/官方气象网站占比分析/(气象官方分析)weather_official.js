/**
*  -------------------  整体分布-官方气象网站占比分析 -------------------
**/
请求地址 ： http : // 127.0.0.1:8080/weather_official
请求数据：
{
  areaId : '001_0' (查看枚举表)
  areaName : '长寿路' （查看枚举表）
  dateRange : [
    ‘2017 - 01 - 01 ’,
    ‘2017 - 01 - 31 ’
  ],
  monthRange: ["2017-01", "2017-03"],
  type : 0; // 根据  接口(weather_official_getTypeNames)返回的type
}

返回数据：
{
  "code" : 1,
  "data" : [
    {value:100, name:'官方'},
    {value:225, name:'非官方'}
  ],
  "success" : true
}
