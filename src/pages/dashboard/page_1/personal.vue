<template>
<div>
  <search-wrapper @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName" >
    <div class="search-button" :class="$style['search-btns']" slot-scope="props">
      <div :class='$style.tabsWrapper'>
        <div class="swiper-container swiper-container-mobile">
          <div class="swiper-wrapper">
            <div class="swiper-slide" :class="id === item.id && $style.swiper_active" @click="handleClickSearchType(props, {type: 'mobile', id: item.id, typeName: item.name})" v-for="(item, index) in searchButtonsMobile" :key="'searchButtonsMobile' + index">
              <ui-icon size='96' :icon="'personal' + index" />
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
  <div class="echart-wrapper">
    <div ref='echart1' />
  </div>
  <svg-icon-personal />
</div>
</template>

<script>
import {
  api_action_personal,
  api_action_personal_echart
} from '@/api'
import swiper from 'Swiper/dist/js/swiper.min.js'
import svgIconPersonal from '@/components/svg-icon-personal'
import uiIcon from '@/components/ui-icon'
import color from '@/lib/color'
import echartConfig from '@/lib/echartConfig'
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/dataZoom')

export default {
  data() {
    return {
      searchButtonsMobile: [],
      type: '',
      id: '',
      typeName: '',
      tableColums: [],
      tableData: [],
      tableName: ''
    }
  },
  methods: {
    get_family_swiper() {
      api_action_personal().then(res => {
        this.searchButtonsMobile = res.data
        this.$nextTick(() => {
          this.swiperMobile = new swiper('.swiper-container-mobile', {
            initialSlide: 2,
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
    chartInit(data, refName, barColor = '#2d8cf0', seriesName = this.typeName) {
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
      var optionBar = {
        xAxis: {
          data: xAxisData
        },
        yAxis: {
            type: 'value',
            name: seriesName + '(户数)',
            splitLine: {
              lineStyle: {
                color: barColor
              }
            },
            axisLine: {
              lineStyle: {
                color: barColor
              }
            }
          },
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
      var optionPie = {
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
        series: [{
            name: this.typeName,
              type:'pie',
              radius: ['40%', '55%'],
              color:['#2d8cf0', '#19be6b','#ff9900','#ed3f14', '#E406AD', '#4918EE'],
              label: {
                  normal: {
                      formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                      backgroundColor: '#eee',
                      borderColor: '#aaa',
                      borderWidth: 1,
                      borderRadius: 4,
                      rich: {
                          a: {
                              color: '#999',
                              lineHeight: 22,
                              align: 'center'
                          },
                          hr: {
                              borderColor: '#aaa',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                          },
                          b: {
                              fontSize: 16,
                              lineHeight: 33
                          },
                          per: {
                              color: '#eee',
                              backgroundColor: '#334455',
                              padding: [2, 4],
                              borderRadius: 2
                          }
                      }
                  }
              },
              data
          }]
      };
      const option = data.length <= 6 ? optionPie : optionBar
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },

    api_search_date(params) {
      this.type = params.type
      this.id = params.id
      api_action_personal_echart(params).then(res => {
        let _tableColums = []
        let _tableData = {}
        res.data.forEach((item, index)=> {
          _tableColums[index] = {
            title: item.name,
            key: 'value' + index
          }
          _tableData[`value${index}`] = item.value
        })
        this.tableColums = _tableColums
        this.tableData = [_tableData]
        this.chartInit(res.data, 'echart1')
      })
    },
    handleClickSearchType(props, params) {
      this.typeName = params.typeName
      this.tableName = params.typeName //设置execl的文件名
      const _params = Object.assign({}, props, params)
      this.api_search_date(_params)
    },
    changeSearch(items) {

      if(!this.type) return
      const params = Object.assign({}, items, {
        type: this.type,
        id: this.id
      })
      this.api_search_date(params)
    }
  },
  mounted() {
    this.get_family_swiper()
  },
  beforeDestroy() {
    this.swiperMobile.destroy(true)
  },
  components: {
    uiIcon,
    svgIconPersonal
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
