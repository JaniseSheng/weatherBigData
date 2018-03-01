<template>
  <div class="">
    <search-wrapper @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName" >
      <div class="search-button">
        <Button :type="item.id == type ? 'success' : 'ghost'" v-for='(item , index) in searchButtons' :key="'searchButtons' + index" @click="handleClickSearchType(item)">{{item.name}}</Button>
        <Button :type="type == 888888 ? 'success' : 'ghost'" @click="handleClickSearchType_top">Top 5</Button>
      </div>
    </search-wrapper>
    <div class="echart-wrapper">
      <div class="echart-content">
        <div ref='echart_top' v-if='type == 888888'/>
        <div v-else>
          <div ref='echart1' />
          <div ref='echart2' />
          <div style="position:relative" v-if='false'>
            <div ref='echart3' >
            </div>
            <p style='position: absolute; left: 76px; top: 0' class='star' v-if='stars'>
              <span>权威星：</span>
              <Icon type="ios-star" v-for="item in parseInt(stars.split('.')[0])" :key="'star' + item"></Icon>
              <Icon type="ios-star-half" v-if="stars.split('.')[1]"></Icon>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {api_service_weather, api_service_weather_getTypeNames, api_service_weather_top} from '@/api'
import color from '@/lib/color'
import echartConfig from '@/lib/echartConfig'
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/dataZoom')

export default {
  data(){
    return {
      searchButtons: null,
      type: 999999,
      stars: '',
      cacheData: {}, //缓存数据
      tableColums: [],
      tableData: [],
      tableName: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    api_service_weather_getTypeNames().then(res => {
      next(vm => {
        vm.searchButtons = res.data
        vm.tableName = res.data && `IPTV流量监控(${res.data[0].name})`
      })
    })
  },
  methods: {
    chartInit(data, refName, barColor = color.infoColor, lineColor = color.warningColor, seriesName = ['unique view', 'unique view占比']) {
      this.myChart = echarts.init(this.$refs[refName], '', {
        height: '380px'
      });
      // 指定图表的配置项和数据
      const legendData = seriesName
      let xAxisData = [] // X轴用户名
      let yAxisDataBar = [] // y轴数据
      let yAxisDataLine = [] // y轴数据
      data.forEach((item, index)=> {
        xAxisData[index] = item.date
        yAxisDataBar[index] = item.value
        yAxisDataLine[index] = item.perValue
      })
      var option = {
        xAxis: {
          data: xAxisData
        },
        yAxis: [{
            type: 'value',
            name: seriesName[0],
            nameTextStyle: {
              fontSize: this.echartYAxisFontSize
            },
            splitLine: {
              lineStyle: {
                color: barColor,
                opacity: 1
              }
            },
            axisLine: {
              lineStyle: {
                color: barColor
              }
            },
            axisLabel: {
              fontSize: this.echartYAxisFontSize
            }
          },
          {
            type: 'value',
            name: seriesName[1],
            nameTextStyle: {
              fontSize: this.echartYAxisFontSize
            },
            position: 'right',
            splitLine: {
              show: false,
              lineStyle: {
                color: lineColor,
                opacity: 0.6
              }
            },
            axisLine: {
              lineStyle: {
                color: lineColor
              }
            },
            axisLabel: {
              fontSize: this.echartYAxisFontSize,
              formatter: '{value} %'
            }
          }
        ],
        legend: {
          data: legendData,
          textStyle: {
            fontSize: this.legendFontSize
          }
        },
        tooltip: {
          boundaryGap: '50%',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataZoom: {
          show: !!data.length && data.length > 10,
          realtime: true,
          start: 0,
          end: 10 * 100 / data.length,
          handleStyle: {
            color: barColor
          },
          dataBackground: {
            areaStyle: {
              color: barColor
            }
          }
        },
        series: [{
          name: seriesName[0],
          type: 'bar',
          barWidth: echartConfig.barWidth,
          barMinHeight: '8',
          itemStyle: {
            normal: {
              barBorderRadius: 6,
              color: barColor
            }
          },
          data: yAxisDataBar
        }, {
          name: seriesName[1],
          type: 'line',
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              borderWidth: 6,
              color: lineColor,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            }
          },
          lineStyle: {
            normal: {
              width: echartConfig.lineWidth
            }
          },
          data: yAxisDataLine
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    chartInit_top(data, refName, barColor = color.infoColor, lineColor = color.warningColor, seriesName = 'page view') {
      this.myChart_top = echarts.init(this.$refs[refName], '', {
        height: '380px'
      });
      // 指定图表的配置项和数据
      const legendData = [seriesName]
      let xAxisData = [] // X轴用户名
      let yAxisDataBar = [] // y轴数据
      data.forEach((item, index) => {
        xAxisData[index] = item.name
        yAxisDataBar[index] = item.value
      })
      var option = {
        xAxis: {
          data: xAxisData
        },
        yAxis: [{
            type: 'value',
            name: seriesName,
            nameTextStyle: {
              fontSize: this.echartYAxisFontSize
            },
            splitLine: {
              lineStyle: {
                color: barColor,
                opacity: 1
              }
            },
            axisLine: {
              lineStyle: {
                color: barColor
              }
            },
            axisLabel: {
              fontSize: this.echartYAxisFontSize
            }
          }
        ],
        legend: {
          data: legendData,
          textStyle: {
            fontSize: this.legendFontSize
          }
        },
        tooltip: {
          boundaryGap: '50%',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataZoom: {
          show: !!data.length && data.length > 10,
          realtime: true,
          start: 0,
          end: 10 * 100 / data.length,
          handleStyle: {
            color: barColor
          },
          dataBackground: {
            areaStyle: {
              color: barColor
            }
          }
        },
        series: [{
          name: seriesName,
          type: 'bar',
          barWidth: echartConfig.barWidth,
          barMinHeight: '8',
          itemStyle: {
            normal: {
              barBorderRadius: 6,
              color: barColor
            }
          },
          data: yAxisDataBar
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart_top.setOption(option);
    },
    chartInitLine(data, refName, lineColor = color.color1, seriesName = '预报准确率') {
      this.myChart = echarts.init(this.$refs[refName], '', {
        height: '380px'
      });
      // 指定图表的配置项和数据
      const legendData = [seriesName]
      let xAxisData = [] // X轴用户名
      let yAxisDataLine = [] // y轴数据
      data.forEach((item, index)=> {
        xAxisData[index] = item.date
        yAxisDataLine[index] = item.value
      })
      var option = {
        xAxis: {
          boundaryGap : false,
          data: xAxisData
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              color: lineColor,
              opacity: .3
            }
          },
          axisLine: {
            lineStyle: {
              color: lineColor
            }
          },
        },
        legend: {
          data: legendData
        },
        tooltip: {
          boundaryGap: '50%',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataZoom: {
          show: !!data.length && data.length > 10,
          realtime: true,
          start: 0,
          end: 10 * 100 / data.length,
          handleStyle: {
            color: lineColor
          },
          dataBackground: {
            areaStyle: {
              color: lineColor
            }
          }
        },
        series: [{
          name: seriesName,
          type: 'line',
          itemStyle: {
            normal: {
              barBorderRadius: 6,
              color: lineColor
            }
          },
          areaStyle: {normal: {
            opacity: .5
          }},
          lineStyle: {
            normal: {
              width: echartConfig.lineWidth
            }
          },
          data: yAxisDataLine
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    api_search_date(params){
      api_service_weather(params).then(res=> {
        this.type = params.type
        this.exportExcel(res.data)
        this.drawChart(res.data)
        this.cacheData[params.type] = res.data
      })
    },
    api_search_date_top(params) {
      api_service_weather_top(params).then(res => {
        this.exportExcel_top(res.data)
        this.drawChart_top(res.data)
        this.cacheData[params.type] = res.data
      })
    },
    exportExcel(data) {
      let _tableData = []
      this.tableColums = [{title: '日期', key: 'date'}, {title: 'uv', key: 'uvValue'}, {title: 'uv占比', key: 'perUvValue'}, {title: 'pv', key: 'pvValue'}, {title: 'pv占比', key: 'perPvValue'}, {title: '预报准确率', key: 'percentage'}]
      data.uv.forEach((item, index)=> {
        _tableData[index] = {
          "date": item.date,
          "uvValue": item.value,
          "perUvValue": item.perValue
        }
      })
      data.pv.forEach((item, index)=> {
        _tableData[index] = Object.assign({}, _tableData[index], {
          "date": item.date,
          "pvValue": item.value,
          "perPvValue": item.perValue
        })
      })
      data.percentage.forEach((item, index)=> {
        _tableData[index] = Object.assign({}, _tableData[index], {
          "date": item.date,
          "percentage": item.value
        })
      })
      this.tableData = _tableData
    },
    exportExcel_top(data) {
      let _tableData = []
      this.tableColums = [{
        title: '气象预报时间段',
        key: 'name'
      }, {
        title: 'uv',
        key: 'uvValue'
      }]
      data.uv.forEach((item, index) => {
        _tableData[index] = {
          "name": item.name,
          "uvValue": item.value
        }
      })
      this.tableData = _tableData
    },
    drawChart(data){
      this.$nextTick(()=> {
        console.log(data.star);
        data.uv && this.chartInit(data.uv, 'echart1')
        data.pv && this.chartInit(data.pv, 'echart2', color.successColor, color.errorColor, ['page view', 'page view占比'])
        data.percentage && this.chartInitLine(data.percentage, 'echart3')
        data.star && (this.stars = data.star)
      })
    },
    drawChart_top(data) {
      this.$nextTick(()=> {
        data.uv && this.chartInit_top(data.uv, 'echart_top')
      })
    },
    handleClickSearchType(item){
      this.tableName = `iptv气象预报流量监控(${item.name})`
      this.type = item.id
      if (this.cacheData[item.id]) {
        this.exportExcel(this.cacheData[item.id])
        this.drawChart(this.cacheData[item.id])
      } else {
        this.stars = ''
      }
    },
    handleClickSearchType_top() {
      this.tableName = `iptv气象预报流量监控Top5`
      this.type = 888888
      if (this.cacheData[888888]) {
        this.exportExcel_top(this.cacheData[888888])
        this.drawChart_top(this.cacheData[888888])
      }
    },
    changeSearch(items) {
      if (this.type == 999999) {
        this.$Message.error('请选择查找类型！')
        return
      }
      const params = Object.assign({}, items, {
        type: this.type
      })
      if (this.type == 888888) {
        this.api_search_date_top(params)
        return
      }
      this.api_search_date(params)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../style/mythemes.less';
  .search-button {
    padding: 12px 0;
    & button {
      margin-right: 6px;
    }
  }
  .star {
    span {
      line-height: 24px;
      vertical-align: top;
    }
    i {
      font-size: 24px;
      color: @error-color;
    }
  }
</style>
