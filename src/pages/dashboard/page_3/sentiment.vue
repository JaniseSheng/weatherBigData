<template>
  <div class="">
    <search-wrapper @searchInit='searchInit' @changeSearch='changeSearch'>
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
    chartInit(data, refName, lineColor1 = color.infoColor, lineColor2 = color.warningColor, seriesName = ['unique view', 'page view']) {
      this.myChart = echarts.init(this.$refs[refName][0], '', {
        height: '280px'
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
            color: color.color1
          },
          dataBackground: {
            areaStyle: {
              color: color.color1
            }
          }
        },
        series: [
          {
            name: seriesName[0],
            type: 'line',
            itemStyle: {
              normal: {
                borderWidth: 6,
                color: lineColor1,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10
              }
            },
            lineStyle: {
              normal: {
                width: echartConfig.lineWidth
              }
            },
            data: yAxisDataLineUv
          }, {
            name: seriesName[1],
            type: 'line',
            itemStyle: {
              normal: {
                borderWidth: 6,
                color: lineColor2,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10
              }
            },
            lineStyle: {
              normal: {
                width: echartConfig.lineWidth
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
            this.chartInit(item.values, `echart${index + 1}`, [color.infoColor, color.successColor, color.warningColor, color.errorColor][index], [color.warningColor, color.errorColor, color.successColor, color.infoColor][index])
          })
        })
      })
    },
    searchInit(item){
      const params = Object.assign({}, item, {type : 0})
      this.api_search_date(params)
    },
    handleClickSearchType(props, id){
      const params = Object.assign({}, props, {type : id})
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
