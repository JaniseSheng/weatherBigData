<template>
<div>
  <search-wrapper>
    <div class="search-button" :class="$style['search-btns']" slot-scope="props">
      <div :class='$style.tabsWrapper'>
        <div class="swiper-container swiper-container-mobile">
          <div class="swiper-wrapper">
            <div class="swiper-slide" :class="id == item.id && $style.swiper_active" @click="handleClickSearchType(props, {type: 'mobile', id: item.id})" v-for="(item, index) in searchButtonsMobile" :key="'searchButtonsMobile' + index">
              <ui-icon size='96' :icon="'user' + index" />
              <p style="font-size: 18px">{{item.name}}</p>
              <label style="margin-top: 6px; display:block;">{{item.data.value}}</label>
              <p>{{item.data.name}}</p>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination swiper-pagination-mobile"></div>
        </div>
      </div>
    </div>
  </search-wrapper>
  <div class="echart-wrapper-s">
    <div class="echart-content-s">
      <div ref='echart1' />
    </div>
  </div>
  <svg-icon-family />
</div>
</template>

<script>
import {
  api_action_user,
  api_action_user_echart
} from '@/api'
import swiper from 'Swiper/dist/js/swiper.min.js'
import svgIconFamily from '@/components/svg-icon-family'
import uiIcon from '@/components/ui-icon'
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
      searchButtonsMobile: [],
      type: '',
      id: ''
    }
  },
  methods: {
    get_family_swiper() {
      api_action_user().then(res => {
        this.searchButtonsMobile = res.data
        this.$nextTick(() => {
          this.swiperMobile = new swiper('.swiper-container-mobile', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            },
            pagination: {
              el: '.swiper-pagination-mobile'
            }
          })
        })
      })
    },
    chartInit(data, refName, barColor = '#2d8cf0', seriesName = '') {
      if (this.myChart) {
        this.myChart.clear()
        this.myChart.dispose()
      }
      this.myChart = echarts.init(this.$refs[refName], '', {
        height: '380px'
      });
      // 指定图表的配置项和数据
      const legendData = [seriesName]
      let xAxisData = [] // X轴用户名
      let yAxisData = [] // y轴数据
      data.forEach((item, index) => {
        xAxisData[index] = item.name
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
          barWidth: echartConfig.barWidth,
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
      this.type = params.type
      this.id = params.id
      api_action_user_echart(params).then(res => {
        this.chartInit(res.data, 'echart1')
      })
    },
    handleClickSearchType(props, params) {
      const _params = Object.assign({}, props, params)
      this.api_search_date(_params)
    }
  },
  mounted() {
    this.get_family_swiper()
  },
  components: {
    uiIcon,
    svgIconFamily
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
.tabsWrapper {
    :global(.swiper-slide) {
        padding: 12px;
        width: 300px;
        height: 300px;
        background-color: @warning-color;
        color: white;
    }
    & svg {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
}
.swiper_active {
  background-color: @success-color !important;
}
</style>
