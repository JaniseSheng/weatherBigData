<template>
  <div class="">
    <search-wrapper @searchInit='searchInit'>
      <div class="search-button" slot-scope="props">
        <Button :type="item.id == type ? 'success' : 'ghost'" v-for='(item , index) in searchButtons' :key="'searchButtons' + index" @click="handleClickSearchType(props, item.id)">{{item.name}}</Button>
      </div>
    </search-wrapper>
    <div class="echart-wrapper">
      <div :ref="'echart' + item" :class="'echart' + item" v-for='item in echartNum'/>
    </div>
  </div>
</template>

<script>
import {api_public_flow, api_public_flow_getTypeNames} from '@/api'
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/dataZoom')

export default {
  data(){
    return {
      searchButtons: null,
      echartNum: 0,
      type: 0
    }
  },
  beforeRouteEnter(to, from, next) {
    api_public_flow_getTypeNames().then(res => {
      next(vm => {
        vm.searchButtons = res.data
      })
    })
  },
  methods: {
    chartInit(data, refName, barColor = '#2d8cf0', seriesName = ['unique view', 'page view']) {
      this.myChart = echarts.init(this.$refs[refName][0], '', {
        height: '240px'
      });
      // 指定图表的配置项和数据
      const legendData = seriesName
      let xAxisData = [] // X轴用户名
      let yAxisDataLineUv = [] // y轴数据
      let yAxisDataLinePv = [] // y轴数据
      data.forEach((item, index)=> {
        xAxisData[index] = item.date
        yAxisDataLineUv[index] = item.value_uv
        yAxisDataLinePv[index] = item.value_pv
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
          type: 'line',
          barWidth: '16',
          barMinHeight: '8',
          itemStyle: {
            normal: {
              barBorderRadius: 6,
              color: barColor
            }
          },
          data: yAxisDataLineUv
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
          data: yAxisDataLinePv
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    api_search_date(params){
      api_public_flow(params).then(res=> {
        this.type = params.type
        const _datas = res.data
        this.echartNum = _datas.length
        this.$nextTick(() => {
          _datas.forEach((item, index)=> {
            this.chartInit(item.values, `echart${index + 1}`)
          })
        })
        // res.data[0].length > 0 && is.chartInit(res.data[0], 'echart1')
        // res.data[1].length > 0 && this.chartInit(res.data[1], 'echart2', '#19be6b', ['unique view', 'unique view变化率'])
        // res.data[2].length > 0 && this.chartInit(res.data[2], 'echart2', '#19be6b', ['unique view', 'unique view变化率'])
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
