<template>
  <div class="">
    <search-wrapper>
      <div class="search-button">
        <Button type='success'>全部</Button>
        <Button type='info'>PC</Button>
        <Button type='info'>Mobile</Button>
        <Button type='info'>IPTV</Button>
      </div>
    </search-wrapper>
    <div class="echart-wrapper">
      <div ref='echart1' />
      <div ref='echart2' />
    </div>
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/dataZoom')
export default {
  methods: {
    chartInit(data, refName) {
      this.myChart = echarts.init(this.$refs[refName], '', {
        height: '420px'
      });
      // 指定图表的配置项和数据
      const legendData = ['unique']
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
          name: 'unique',
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
    }
  },
  mounted(){
    const data1 = [
      {
        val: 400,
        data: '2017-01-01',
      },
      {
        val: 500,
        data: '2017-01-02',
      },
      {
        val: 300,
        data: '2017-01-03',
      },
      {
        val: 600,
        data: '2017-01-04',
      },
      {
        val: 420,
        data: '2017-01-05',
      },
      {
        val: 930,
        data: '2017-01-06',
      },
      {
        val: 730,
        data: '2017-01-07',
      },
      {
        val: 680,
        data: '2017-01-08',
      },
      {
        val: 610,
        data: '2017-01-09',
      },
      {
        val: 560,
        data: '2017-01-10',
      },
      {
        val: 630,
        data: '2017-01-11',
      },
      {
        val: 680,
        data: '2017-01-12',
      },
      {
        val: 530,
        data: '2017-01-13',
      },
      {
        val: 480,
        data: '2017-01-14',
      },
      {
        val: 530,
        data: '2017-01-15',
      },
      {
        val: 230,
        data: '2017-01-16',
      },
      {
        val: 440,
        data: '2017-01-17',
      },
      {
        val: 630,
        data: '2017-01-18',
      },
      {
        val: 460,
        data: '2017-01-19',
      },
      {
        val: 180,
        data: '2017-01-20',
      }
    ]
    this.chartInit(data1, 'echart1')
  }
}
</script>

<style lang="less" scoped>
  .search-button {
    padding: 12px 0;
  }
</style>
