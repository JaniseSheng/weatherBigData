<template>
<div>
  <search-wrapper @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName" monthRangePromise='3'>
    <div class="search-button" :class="$style['search-btns']">
      <Tabs :class='$style.tabsWrapper' :value='type' @on-click='handleTabClick'>
        <TabPane label="PC" name="pc">
          <div class="swiper-container swiper-container-pc">
            <div class="swiper-wrapper">
              <div class="swiper-slide" :class="type == 'pc' && pcId == item.id && $style.swiper_active" @click="handleClickSearchType({type: 'pc', id: item.id, typeName: item.name, index: index})" v-for="(item, index) in searchButtonsPc" :key="'searchButtonsPc' + index">
                <ui-icon size='96' :icon="'family' + item.id" />
                <p style="font-size: 18px">{{item.name}}</p>
                <label style="margin-top: 6px; display:block;">{{item.data.value}}</label>
                <p>{{item.data.name}}</p>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination swiper-pagination-pc"></div>
          </div>
        </TabPane>
        <TabPane label="IPTV" name="iptv">
          <div class="swiper-container swiper-container-iptv">
            <div class="swiper-wrapper">
              <div class="swiper-slide" :class="type == 'iptv' && iptvId == item.id && $style.swiper_active" @click="handleClickSearchType({type: 'iptv', id: item.id, typeName: item.name, index: index})" v-for="(item, index) in searchButtonsIptv" :key="'searchButtonsIptv' + index">
                <ui-icon size='96' :icon="'family' + item.id" />
                <p>{{item.name}}</p>
                <label>{{item.data.value}}</label>
                <p>{{item.data.name}}</p>
              </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination swiper-pagination-iptv"></div>
          </div>
        </TabPane>
      </Tabs>
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
  api_action_family,
  api_action_family_echart
} from '@/api'
import swiper from 'Swiper/dist/js/swiper.min.js'
import svgIconFamily from '@/components/svg-icon-family'
import uiIcon from '@/components/ui-icon'
import color from '@/lib/color'
import echartConfig from '@/lib/echartConfig'
import _Math from 'lodash/Math'
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
      searchButtonsIptv: [],
      searchButtonsPc: [],
      type: 'pc',
      pcId: '999999',
      iptvId: '999999',
      id: 999999,
      cacheData: {}, //缓存数据
      typeName: '',
      tableColums: [],
      tableData: [],
      tableName: ''
    }
  },
  methods: {
    get_family_swiper() {
      api_action_family().then(res => {
        this.searchButtonsIptv = res.data.iptv
        this.searchButtonsPc = res.data.pc
        this.$nextTick(() => {
          this.swiperPc = new swiper('.swiper-container-pc', {
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
              el: '.swiper-pagination-pc'
            }
          });
          this.swiperIptv = new swiper('.swiper-container-iptv', {
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
              el: '.swiper-pagination-iptv'
            }
          });
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
      // 指定图表的配置项和数据
      const legendData = seriesName
      let xAxisData = [] // X轴用户名
      let yAxisData = [] // y轴数据
      let yAxisDataLine = [] // y轴数据
      let max_value = 0
      let maxObj = {}
      data.forEach((item, index) => {
        var _value = parseInt(item.value)
        if ( _value > max_value) {
          max_value = _value
          maxObj = item
        }
        xAxisData[index] = item.name
        yAxisData[index] = _value
        yAxisDataLine[index] = item.perValue
      })
      if(this.type == 'pc') {
        this.searchButtonsPc[this.id].data = maxObj
      } else {
        this.searchButtonsIptv[this.id].data = maxObj
      }
      var optionBar = {
        xAxis: {
          data: xAxisData
        },
        yAxis: [
          {
              type: 'value',
              name: seriesName[0] + '(户数)',
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
            },
            {
                type: 'value',
                name: seriesName[1],
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
              }
        ],
        legend: {
          data: legendData,
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
          formatter: "<p style='text-align: left'>{a0}: {c0}<br />{a1}: {c1}%</p>"
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
          name: seriesName[0],
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
          name: seriesName[1],
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
      api_action_family_echart(params).then(res => {
        this.exportExcel(res.data)
        this.drawChart(res.data)
        this.cacheData[`${this.type}_${this.id}`] = res.data
      })
    },
    exportExcel(data){
      let _tableColums = []
      let _tableData = {}
      data.forEach((item, index)=> {
        _tableColums[index] = {
          title: item.name,
          key: 'value' + index
        }
        _tableData[`value${index}`] = item.value
      })
      this.tableColums = _tableColums
      this.tableData = [_tableData]
    },
    drawChart(data){
      this.chartInit(data, 'echart1')
    },
    handleClickSearchType(params) {
      this.typeName = params.typeName
      this.type = params.type
      this.id = params.id
      if (params.type == 'pc') {
        this.pcId = params.id
      }
      if (params.type == 'iptv') {
        this.iptvId = params.id
      }
      this.tableName = `${params.typeName}(${params.type})` //设置execl的文件名

      // swiper to slide
      if (params.type == 'pc') {
        this.swiperPc.slideTo(params.index)
      }
      if (params.type == 'iptv') {
        this.swiperIptv.slideTo(params.index)
      }
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
    },
    handleTabClick(label){
      this.type = label
    }
  },
  mounted() {
    this.get_family_swiper()
  },
  beforeDestroy() {
    this.swiperPc.destroy(true)
    this.swiperIptv.destroy(true)
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
