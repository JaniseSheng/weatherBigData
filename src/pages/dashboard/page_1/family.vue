<template>
<div>
  <search-wrapper @searchInit='searchInit'>
    <div class="search-button" :class="$style['search-btns']" slot-scope="props">
      <div class="masonry-wrapper" id='masonry_wrapper' :class="$style['masonry-wrapper']">
        <div class="grid-item" :data-item="'item-' + index" v-for="(item, index) in searchButtons" :key="'masonry' + index">
          <div class="grid-one">
            <p>{{item.value}}</p>
            <p>{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </search-wrapper>
  <div class="echart-wrapper">
    <div ref='echart1' />
  </div>
</div>
</template>

<script>
import {
  api_action_family
} from '@/api'
import {
  action_family
} from '@/lib/enum'
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
      searchButtons: action_family,
      type: 0
    }
  },
  methods: {
    chartInit(data, refName, barColor = '#2d8cf0', seriesName = 'unique view') {
      this.myChart = echarts.init(this.$refs[refName], '', {
        height: '420px'
      });
      // 指定图表的配置项和数据
      const legendData = [seriesName]
      let xAxisData = [] // X轴用户名
      let yAxisData = [] // y轴数据
      data.forEach((item, index) => {
        xAxisData[index] = item.date
        yAxisData[index] = item.value
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
          name: seriesName,
          type: 'bar',
          barWidth: '16',
          barMinHeight: '8',
          itemStyle: {
            normal: {
              barBorderRadius: 6,
              color: barColor
            }
          },
          data: yAxisData
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    api_search_date(params) {
      api_action_family(params).then(res => {
        this.searchButtons = res.data
      })
    },
    searchInit(item) {
      const params = Object.assign({}, item, {
        type: 0
      })
      this.api_search_date(params)
    },
    // handleClickSearchType(props, id) {
    //   const params = Object.assign({}, props, {
    //     type: id
    //   })
    //   this.api_search_date(params)
    // }
  }
}
</script>

<style lang="less" scoped>
@import "../../../style/mythemes.less";
.search-button {
    padding: 12px 0;
    & button {
        margin-right: 6px;
    }
}
.button-item {
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background-color: white;
  &:hover {
    box-shadow: 0 0 1px 1px @success-color;
  }
}
</style>

<style lang="less" module>
@import "../../../style/mythemes.less";
  .search-btns {
    & :global(.vue-waterfall-slot) {
      background-color: @content-bg-color;
    }
  }
  .masonry-wrapper {
    border-radius: 2px;
    background-color: @content-bg-color;
    position: relative;
    & :global(.grid-item) {
      position: absolute;
      }
    & :global(.grid-one) {
      position: absolute;
      top:2px;
      left: 2px;
      right: 2px;
      bottom: 2px;
      background-color: red;
      }
    & [data-item = 'item-0'] {
      width: 20%;
      height: 200px;
    }
    & [data-item = 'item-1'] {
      width: 20%;
      left: 20%;
      top: 0;
      height: 200px;
    }
    & [data-item = 'item-2'] {
      width: 20%;
      height: 200px;
    }
    & [data-item = 'item-3'] {
      width: 20%;
      height: 200px;
    }
    & [data-item = 'item-4'] {
      width: 20%;
      height: 200px;
    }
    & [data-item = 'item-5'] {
      width: 20%;
      height: 200px;
    }
    & [data-item = 'item-6'] {
      width: 20%;
      height: 200px;
    }
    & [data-item = 'item-7'] {
      width: 20%;
      height: 200px;
    }
    & [data-item = 'item-8'] {
      width: 20%;
      height: 200px;
    }
    & [data-item = 'item-9'] {
      width: 20%;
      height: 200px;
    }
    & [data-item = 'item-10'] {
      width: 20%;
      height: 200px;
    }
    & [data-item = 'item-11'] {
      width: 20%;
      height: 200px;
    }
    & [data-item = 'item-12'] {
      width: 20%;
      height: 200px;
    }
    & [data-item = 'item-13'] {
      width: 20%;
      height: 200px;
    }
  }
</style>
