<template>
<div>
  <search-wrapper @searchInit='searchInit'>
    <div class="search-button" :class="$style['search-btns']" slot-scope="props">
      <waterfall :line-gap="200" :watch="searchButtons">
        <waterfall-slot v-for="(item, index) in searchButtons" :width='item.width' :height="item.height" :order="index" :key="'family' + index">
          <div class='button-item' :class="$style['buttonItem-' + index]" @click="handleClickSearchType(props, item.id)">
            <label>{{item.value}}</label>
            <p>{{item.name}}</p>
          </div>
        </waterfall-slot>
      </waterfall>
    </div>
  </search-wrapper>
  <div class="echart-wrapper">
    <div ref='echart1' />
  </div>
</div>
</template>

<script>
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
import {
  api_action_family, api_action_family_echart
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
    searchInit(item) {
      let _searchDatas = []
      api_action_family(item).then(res => {
        res.data.forEach((_item, index) => {
          _searchDatas[index] = Object.assign({}, action_family[index], _item)
        })
        this.searchButtons = _searchDatas
      })
    },

    api_search_date(params){
      api_action_family_echart(params).then(res=> {
        this.type = params.type
        this.chartInit(res.data, 'echart1')
      })
    },

    handleClickSearchType(props, id) {
      const params = Object.assign({}, props, {type : id})
      this.api_search_date(params)
    }
  },
  components: {
    Waterfall,
    WaterfallSlot
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
.buttonItem-0 {
    color: red;
}
</style>
