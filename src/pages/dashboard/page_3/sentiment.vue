<template>
<div class="">
  <search-wrapper ref='searchWrapper' @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName" :isArea=false>
    <div class="search-button">
      <Button :type="item.id == type ? 'success' : 'ghost'" v-for='(item , index) in searchButtons' :key="'searchButtons' + index" @click="handleClickSearchType(item)">{{item.name}}</Button>
    </div>
  </search-wrapper>
  <div class="echart-wrapper">
    <div class="echart-content" style='padding: 6px 12px'>
      <div :ref="'echart' + item" :class="'echart' + item" v-for='item in echartNum' />
    </div>
  </div>
</div>
</template>

<script>
import {
  api_public_flow,
  api_public_flow_getTypeNames
} from '@/api'
import color from '@/lib/color'
import echartConfig from '@/lib/echartConfig'
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/dataZoom')

export default {
  data() {
    return {
      searchButtons: null,
      echartNum: 0,
      cacheData: {}, //缓存数据
      type: 999999,
      tableColums: [{
        title: '日期',
        key: 'date'
      }],
      tableData: [],
      tableName: '舆情流量(全部)'
    }
  },
  beforeRouteEnter(to, from, next) {
    api_public_flow_getTypeNames().then(res => {
      next(vm => {
        vm.searchButtons = res.data
      })
    })
  },
  mounted() {
    this.$refs.searchWrapper.areaName = ''
  },
  methods: {
    chartInit(data, refName, lineColor1 = color.infoColor, lineColor2 = color.warningColor, seriesName = ['unique view', 'page view']) {
      this.myChart = echarts.init(this.$refs[refName][0], '', {
        height: '280px'
      });
      const _data = data.values
      // 指定图表的配置项和数据
      const legendData = seriesName
      let xAxisData = [] // X轴用户名
      let yAxisDataLineUv = [] // y轴数据
      let yAxisDataLinePv = [] // y轴数据
      _data.forEach((item, index) => {
        xAxisData[index] = item.date
        yAxisDataLineUv[index] = item.value_uv
        yAxisDataLinePv[index] = item.value_pv
      })
      var option = {
        title: {
          text: data.name
        },
        xAxis: {
          data: xAxisData
        },
        yAxis: {
          axisLabel: {
            fontSize: this.echartYAxisFontSize
          }
        },
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
          }
        },
        dataZoom: {
          show: !!_data.length && _data.length > 10,
          realtime: true,
          start: 0,
          end: 10 * 100 / _data.length,
          handleStyle: {
            color: color.color1
          },
          dataBackground: {
            areaStyle: {
              color: color.color1
            }
          }
        },
        series: [{
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
    XBarChartInit(refName) {
      this.myChart = echarts.init(this.$refs[refName][0], '', {
        height: '280px'
      });
      const option = {
        title: {
          text: '13'
        },
        tooltip: {
          show: true,
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          type: 'value',
          // axisTick: {
          //   show: false
          // },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#333333',
            }
          },
          splitLine: {
            show: false
          }
        },
        yAxis: [{
            type: 'category',
            // axisTick: {
            //   show: false
            // },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#333333',
              }
            },
            data: ['广州', '深圳', '东莞', '天津', '惠州']
          },
          {
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitArea: {
              show: false
            },
            splitLine: {
              show: false
            },
            data: ['广州', '深圳', '东莞', '天津', '惠州']
          },

        ],
        series: [{
            name: '有效房源量',
            type: 'bar',
            yAxisIndex: 1,
            itemStyle: {
              normal: {
                show: true,
                color: '#d7dde4',
                barBorderRadius: 50,
                borderWidth: 0,
                borderColor: '#d7dde4',
              }
            },
            barGap: '0%',
            barCategoryGap: '50%',
            data: [120, 120, 120, 120, 120]
          },
          {
            name: '钥匙量',
            type: 'bar',
            itemStyle: {
              normal: {
                show: true,
                color: '#19be6b',
                barBorderRadius: 50,
                borderWidth: 0,
                borderColor: '#19be6b',
              }
            },
            barGap: '0%',
            barCategoryGap: '50%',
            data: [32, 52, 41, 64, 15]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(option);
    },
    api_search_date(params) {
      api_public_flow(params).then(res => {
        this.type = params.type
        this.exportExcel(res.data)
        this.drawChart(res.data)
        this.cacheData[params.type] = res.data
      })
    },
    exportExcel(data) {
      let _tableColums = [{
        title: '日期',
        key: 'date'
      }]
      let _tableData = [{}]
      var _data = data.map(item => {
        return {
          name: item.name,
          values_uv: item.values.map(item2 => {
            return {
              value: item2.value_uv,
              date: item2.date
            }
          }),
          values_pv: item.values.map(item3 => {
            return {
              value: item3.value_pv,
              date: item3.date
            }
          })
        }
      })
      _data.forEach((item, index) => {
        for (let i = 0; i < 2; i++) {
          const colum_index = index * 2 + i
          _tableColums[colum_index + 1] = {
            title: `${item.name}(${i == 0 ? '阅读数' : '点赞数'})`,
            key: `value${index}_${i == 0 ? 'u' : 'p'}`
          }
        }

        item.values_uv.forEach((_item, _index) => {
          let _obj = {}
          _obj.date = _item.date
          _obj[`value${index}_u`] = `${_item.value}`
          _tableData[_index] = Object.assign({}, _tableData[_index], _obj)
        })
        item.values_pv.forEach((_item, _index) => {
          let _obj = {}
          _obj.date = _item.date
          _obj[`value${index}_p`] = `${_item.value}`
          _tableData[_index] = Object.assign({}, _tableData[_index], _obj)
        })
      })
      this.tableColums = _tableColums
      this.tableData = _tableData
    },
    drawChart(data) {
      this.echartNum = data.length
      this.$nextTick(() => {
        data.forEach((item, index) => {
          if (this.type == 0) {
            const seriesName = ['unique view', 'page view']
            this.XBarChartInit(`echart${index + 1}`)
          } else {
            const seriesName = ['阅读数', '点赞数']
            this.chartInit(item, `echart${index + 1}`, [color.infoColor, color.successColor, color.warningColor, color.errorColor][index], [color.warningColor, color.errorColor, color.successColor, color.infoColor][index], seriesName)
          }
        })
      })
    },
    handleClickSearchType(item) {
      this.tableName = `舆情流量(${item.name})`
      this.type = item.id
      if (this.cacheData[item.id]) {
        this.exportExcel(this.cacheData[item.id])
        this.drawChart(this.cacheData[item.id])
      }
    },
    changeSearch(items) {
      if (this.type == 999999) {
        this.$Message.error('请选择查找类型！')
        return
      }
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
