<template>
  <div class="">
    <search-wrapper @searchInit='searchInit'>
      <div class="search-button" slot-scope="props">
        <Button :type="item.id == type ? 'success' : 'ghost'" v-for='(item , index) in searchButtons' :key="'searchButtons' + index" @click="handleClickSearchType(props, item.id)">{{item.name}}</Button>
      </div>
    </search-wrapper>
    <div class="echart-wrapper">
      <div ref='echart1' />
      <div ref='echart2' />
    </div>
  </div>
</template>

<script>
import {api_total_terminal} from '@/api'
import {total_terminal} from '@/lib/enum'
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
      searchButtons: total_terminal,
      type: 0
    }
  },
  methods: {
    chartInit(data, refName, barColor = '#2d8cf0', seriesName = ['unique view', 'unique view变化率']) {
      this.myChart = echarts.init(this.$refs[refName], '', {
        height: '420px'
      });
      // 指定图表的配置项和数据
      const legendData = seriesName
      let xAxisData = [] // X轴用户名
      let yAxisDataBar = [] // y轴数据
      let yAxisDataLine = [] // y轴数据
      data.forEach((item, index)=> {
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
            color: '#ff9900'
          },
          dataBackground: {
            areaStyle: {
              color: '#ff9900'
            }
          }
        },
        series: [{
          name: seriesName[0],
          type: 'bar',
          barWidth: '16',
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
          barWidth: '16',
          barMinHeight: '8',
          itemStyle: {
            normal: {
              barBorderRadius: 6,
              color: barColor
            }
          },
          data: yAxisDataLine
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    api_search_date(params){
      api_total_terminal(params).then(res=> {
        this.type = params.type
        this.chartInit(res.data.uv, 'echart1')
        this.chartInit(res.data.pv, 'echart2', '#19be6b', ['page view', 'page view变化率'])
      })
    },
    searchInit(item){
      const params = Object.assign({}, item, {type : 0})
      this.api_search_date(params)
    },
    handleClickSearchType(props, id){
      const params = Object.assign({}, props, {type : id})
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
