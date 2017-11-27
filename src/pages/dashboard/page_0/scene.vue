<template>
<div class="">
  <search-wrapper @searchInit='searchInit' @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName" >
    <div class="search-button" slot-scope="props">
      <Button :type="item.id == type ? 'success' : 'ghost'" v-for='(item , index) in searchButtons' :key="'searchButtons' + index" @click="handleClickSearchType(props, item)">{{item.name}}</Button>
    </div>
  </search-wrapper>
  <div class="echart-wrapper">
    <div ref='echart1' />
    <div ref='echart2' />
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
      type: 0,
      tableColums: [],
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
        yAxis: {},
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
      this.tableColums = []
      this.tableData = []
      api_total_scene(params).then(res => {
        this.tableColums[0] = {
          title: '类型',
          key: 'type'
        }
        let dataUv = {type: 'UV'}
        let changeUv = {type: 'UV-变化率'}
        let dataPv = {type: 'PV'}
        let changePv = {type: 'PV-变化率'}
        res.data.uv.forEach((item, index)=> {
          this.tableColums[index + 1] = {
            "title": item.date,
            "key": "date" + index
          }
          dataUv["date" + index] = item.value
          changeUv["date" + index] = item.changeValue
        })
        res.data.pv.forEach((item, index)=> {
          dataPv["date" + index] = item.value
          changePv["date" + index] = item.changeValue
        })
        this.tableData= [dataUv,changeUv,dataPv,changePv]
        this.type = params.type
        this.chartInit(res.data.uv, 'echart1')
        this.chartInit(res.data.pv, 'echart2', color.successColor, color.errorColor, ['unique view', 'unique view变化率'])
      })
    },
    searchInit(item) {
      const params = Object.assign({}, item, {
        type: 0
      })
      this.api_search_date(params)
    },
    handleClickSearchType(props, item) {
      this.tableName = `分场景(${item.name})`
      const params = Object.assign({}, props, {
        type: item.id
      })
      this.api_search_date(params)
    },
    changeSearch(items) {
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
