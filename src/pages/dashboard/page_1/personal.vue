<template>
<div>
  <search-wrapper @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName" monthRangePromise='3'>
    <div class="search-button" :class="$style['search-btns']">
      <div :class='$style.tabsWrapper'>
        <div class="swiper-container swiper-container-mobile">
          <div class="swiper-wrapper">
            <div v-if='item.id != 7' class="swiper-slide" :class="id == item.id && $style.swiper_active" @click="handleClickSearchType({type: 'mobile', id: item.id, typeName: item.name, index: index})" v-for="(item, index) in searchButtonsMobile" :key="'searchButtonsMobile' + index">
              <ui-icon size='96' :icon="'personal' + item.id" />
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
      type: 'mobile',
      id: 999999,
      index: 0,
      cacheData: {}, //缓存数据
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
    chartInit(data, refName, barColor = color.infoColor, lineColor = color.warningColor, seriesName = [this.typeName, this.typeName + '(占比)']) {
      if (this.myChart) {
        this.myChart.clear()
        this.myChart.dispose()
      }
      this.myChart = echarts.init(this.$refs[refName], '', {
        height: '420px'
      });
      let perValueName = ''

      // 指定图表的配置项和数据

      let xAxisData = [] // X轴用户名
      let yAxisData = [] // y轴数据
      let yAxisDataLine = [] // y轴数据
      let max_value = 0
      let maxObj = {}

      data.forEach((item, index) => {
        var _value = parseInt(item.value)
        if ( _value> max_value) {
          max_value = _value
          maxObj = item
        }
        xAxisData[index] = item.name
        yAxisData[index] = _value
        yAxisDataLine[index] = item.perValue
        if (item.perValue != undefined && perValueName == '' ) {
          perValueName = this.typeName + '占比'
        }
      })
      this.searchButtonsMobile[this.index].data = maxObj
      var optionBar = {
        xAxis: {
          data: xAxisData
        },
        yAxis: [{
          type: 'value',
          name: this.typeName + '(人数)',
          nameTextStyle: {
            fontSize: this.echartYAxisFontSize
          },
          splitLine: {
            lineStyle: {
              color: barColor
            }
          },
          axisLine: {
            lineStyle: {
              color: barColor
            }
          },
          axisLabel: {
            fontSize: this.echartYAxisFontSize
          }
        }, {
          type: 'value',
          name: perValueName,
          show: this.id != 1,
          nameTextStyle: {
            fontSize: this.echartYAxisFontSize
          },
          position: 'right',
          splitLine: {
            show: false,
            lineStyle: {
              color: lineColor,
              opacity: 0.6
            }
          },
          axisLine: {
            lineStyle: {
              color: lineColor
            }
          },
          axisLabel: {
            fontSize: this.echartYAxisFontSize,
            formatter: '{value} %'
          }
        }],
        legend: {
          data: [this.typeName, perValueName],
          textStyle: {
            fontSize: this.legendFontSize
          }
        },
        tooltip: {
          boundaryGap: '50%',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params, ticket, callback) {
                        const barData = params[0]
                        const lineData = params[1]
                        const barLabel = barData ? `${barData.seriesName}: ${barData.data}` : ''
                        const lineLabel = lineData ? `${lineData.seriesName}: ${Number(lineData.data).toFixed(2)}%` : ''
                          return `<p style='text-align: left'>${barLabel}<br />${lineLabel}</p>`
                      }
        },
        dataZoom: {
          show: !!data.length && data.length > 10,
          realtime: true,
          start: 0,
          end: 10 * 100 / data.length,
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
          name: this.typeName,
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
        }, {
          name: perValueName,
          type: 'line',
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              borderWidth: 6,
              color: lineColor,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
              shadowBlur: 10
            }
          },
          lineStyle: {
            normal: {
              width: echartConfig.lineWidth
            }
          },
          data: yAxisDataLine
        }]
      };
      var optionPie = {
        legend: {
          data: [this.typeName, perValueName],
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
          type: 'pie',
          radius: ['40%', '55%'],
          color: ['#2d8cf0', '#19be6b', '#ff9900', '#ed3f14', '#E406AD', '#4918EE'],
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
      api_action_personal_echart(params).then(res => {
        this.exportExcel(res.data)
        this.drawChart(res.data)
        this.cacheData[`${this.type}_${this.id}`] = res.data
      })
    },
    exportExcel(data) {
      let _tableColums = []
      let _tableData = {}
      data.forEach((item, index) => {
        _tableColums[index] = {
          title: item.name,
          key: 'value' + index
        }
        _tableData[`value${index}`] = item.value
      })
      this.tableColums = _tableColums
      this.tableData = [_tableData]
    },
    drawChart(data) {
      this.chartInit(data, 'echart1')
    },
    handleClickSearchType(params) {
      this.type = params.type
      this.id = params.id
      this.index = params.index
      this.typeName = params.typeName
      this.tableName = params.typeName //设置execl的文件名
      // swiper to slide
      this.swiperMobile.slideTo(params.index)
      if (this.cacheData[`${params.type}_${params.id}`]) {
        this.exportExcel(this.cacheData[`${params.type}_${params.id}`])
        this.drawChart(this.cacheData[`${params.type}_${params.id}`])
      }
    },
    changeSearch(items) {
      if (this.id == 999999) {
        this.$Message.error('请选择查找类型！')
        return
      }
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
        width: 200px;
        height: 200px;
        background-color: @warning-color;
        color: white;
    }
    & svg {
        position: absolute;
        width: 35%;
        left: 0;
        right: 0;
        top: 45px;
        bottom: 0;
        margin: auto;
    }
}
.swiper_active {
    background-color: @success-color !important;
}
</style>
