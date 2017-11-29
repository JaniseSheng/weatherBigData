
<template>
<div class="">
  <search-wrapper @searchInit='searchInit' @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName" >
  </search-wrapper>
  <div class="echart-wrapper">
    <div :ref="'echart' + item" v-for='item in echartNum' :class='$style.echartItem' />
  </div>
</div>
</template>

<script>
import {
  api_public_hot
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
      echartNum: 0,
      tableColums: [],
      tableData: [],
      tableName: '热点搜词'
    }
  },
  methods: {
    chartInit(data, refName, barColor = color.infoColor) {
      const _data = data.values
      const seriesName = data.name
      this.myChart = echarts.init(this.$refs[refName][0], '', {
        height: '400px'
      });
      // 指定图表的配置项和数据
      const legendData = [seriesName]
      let xAxisData = [] // X轴用户名
      let yAxisDataBar = [] // y轴数据
      _data.forEach((item, index) => {
        xAxisData[index] = item.name
        yAxisDataBar[index] = item.value
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
          show: !!_data.length && _data.length > 10,
          realtime: true,
          start: 0,
          end: 10 * 100 / _data.length,
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
      this.myChart.setOption(option);
    },
    api_search_date(params) {
      let _tableColums = []
      let _tableData = [{}]
      api_public_hot(params).then(res => {
        res.data.forEach((item, index)=> {
          const tempIndex = index * 2 + 1
          _tableColums[tempIndex - 1] = {title: item.name, key: `name${index}`}
          _tableColums[tempIndex] = {title: `${item.name} - 数值`, key: `value${index}`}
          item.values.forEach((_item, _index)=> {
            let _obj = {}
            _obj[`value${index}`] = _item.value
            _obj[`name${index}`] = _item.name
            _tableData[_index] = Object.assign({}, _tableData[_index], _obj)
          })
        })
        this.tableColums = _tableColums
        this.tableData = _tableData
        const _datas = res.data
        this.echartNum = _datas.length
        this.$nextTick(() => {
          _datas.forEach((item, index) => {
            this.chartInit(item, `echart${index + 1}`, [color.infoColor, color.successColor, color.warningColor, color.errorColor][index])
          })
        })
      })
    },
    searchInit(item) {
      this.api_search_date(item)
    },
    changeSearch(items) {
      this.api_search_date(items)
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

<style lang="less" module>
.echartItem {
    padding-top: 12px;
    width: 50%;
    float: left;
}
</style>
