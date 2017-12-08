<template>
<div class="">
  <search-wrapper @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName">
    <div class="search-button" slot-scope="props">
      <Button :type="item.id == type ? 'success' : 'ghost'" v-for='(item , index) in searchButtons' :key="'searchButtons' + index" @click="handleClickSearchType(item)">{{item.name}}</Button>
    </div>
  </search-wrapper>
  <div class="echart-wrapper">
    <div class="echart-content">
      <div ref='echart1' />
      <div ref='echart2' />
    </div>
  </div>
</div>
</template>

<script>
import {
  api_total_scene,
  api_total_scene_getTypeNames
} from '@/api'
import color from '@/lib/color'
import echartConfig from '@/lib/echartConfig'
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/dataZoom')

export default {
  data() {
    return {
      searchButtons: null,
      type: 999999,
      cacheData: {}, //缓存数据
      tableColums: [{
        title: '日期',
        key: 'date'
      }, {
        title: 'uv',
        key: 'uvValue'
      }, {
        title: 'uv变化率',
        key: 'changeUvValue'
      }, {
        title: 'pv',
        key: 'pvValue'
      }, {
        title: 'pv变化率',
        key: 'changePvValue'
      }],
      tableData: [],
      tableName: '分场景(室内)'
    }
  },
  beforeRouteEnter(to, from, next) {
    api_total_scene_getTypeNames().then(res => {
      next(vm => {
        vm.searchButtons = res.data
      })
    })
  },
  methods: {
    chartInit(data, refName, barColor = color.infoColor, lineColor = color.warningColor, seriesName = ['unique view', 'unique view变化率']) {
      this.myChart = echarts.init(this.$refs[refName], '', {
        height: '380px'
      });
      // 指定图表的配置项和数据
      const legendData = seriesName
      let xAxisData = [] // X轴用户名
      let yAxisDataBar = [] // y轴数据
      let yAxisDataLine = [] // y轴数据
      data.forEach((item, index) => {
        xAxisData[index] = item.date
        yAxisDataBar[index] = item.value
        yAxisDataLine[index] = item.changeValue
      })
      var option = {
        xAxis: {
          data: xAxisData
        },
        yAxis: [{
            type: 'value',
            name: seriesName[0],
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
          },
          {
            type: 'value',
            name: seriesName[1],
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
              formatter: '{value} %'
            }
          }
        ],
        legend: {
          data: legendData
        },
        tooltip: {
          boundaryGap: '50%',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "<p style='text-align: left'>{a0}: {c0}<br />{a1}: {c1}%</p>"
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
    api_search_date(params) {
      api_total_scene(params).then(res => {
        this.type = params.type
        this.exportExcel(res.data)
        this.drawChart(res.data)
        this.cacheData[params.type] = res.data
      })
    },
    exportExcel(data) {
      let _tableData = []
      data.uv.forEach((item, index) => {
        _tableData[index] = {
          "date": item.date,
          "uvValue": item.value,
          "changeUvValue": item.changeValue
        }
      })
      data.pv.forEach((item, index) => {
        _tableData[index] = Object.assign({}, _tableData[index], {
          "date": item.date,
          "pvValue": item.value,
          "changePvValue": item.changeValue
        })
      })
      this.tableData = _tableData
    },
    drawChart(data){
      this.chartInit(data.uv, 'echart1')
      this.chartInit(data.pv, 'echart2', color.successColor, color.errorColor, ['page view', 'page view变化率'])
    },
    handleClickSearchType(item) {
      this.tableName = `分场景(${item.name})`
      this.type = item.id
      if (this.cacheData[item.id]) {
        this.drawChart(this.cacheData[item.id])
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
      this.api_search_date(params)
    }
  }
}
</script>

<style lang="less" scoped>
.search-button {
    padding: 12px 0;
    & button {
        margin-right: 6px;
    }
}
</style>
