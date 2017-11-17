<template>
  <div class="">
    <search-wrapper>
      <div class="search-button" slot-scope="props">
        <Button :type="item.id == 0 ? 'success' : 'info'" v-for='(item , index) in total_terminal' :key="'total_terminal' + index" @click="handleClickSearchType(props, item.id)">{{item.name}}</Button>
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
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/dataZoom')

export default {
  data(){
    return {
      total_terminal
    }
  },
  methods: {
    chartInit(data, refName) {
      this.myChart = echarts.init(this.$refs[refName], '', {
        height: '420px'
      });
      // 指定图表的配置项和数据
      const legendData = ['unique view']
      let xAxisData = [] // X轴用户名
      let yAxisData = [] // y轴数据
      data.forEach((item, index)=> {
        xAxisData[index] = item.data
        yAxisData[index] = item.val
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
          show: !!data.length && data.length > 18,
          realtime: true,
          start: 0,
          end: 18 * 100 / data.length,
          handleStyle: {
            color: '#19be6b'
          },
          dataBackground: {
            areaStyle: {
              color: '#19be6b'
            }
          }
        },
        series: [{
          name: 'unique view',
          type: 'bar',
          barWidth: '16',
          barMinHeight: '8',
          itemStyle: {
            normal: {
              barBorderRadius: 6,
              color: '#2d8cf0'
            }
          },
          data: yAxisData
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },

    handleClickSearchType(props, id){
      const params = Object.assign({}, props, {type : id})
      api_total_terminal(params).then(res=> {
        console.log(res);
      }).catch(err=> {
        console.log(err);
      })
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
