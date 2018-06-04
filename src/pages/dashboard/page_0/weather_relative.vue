<template>
<div class="">
  <search-wrapper @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName" :isMonth=false dateType='date'>
    <div class="search-button" slot-scope="props">
      <Button :type="item.id == type ? 'success' : 'ghost'" v-for='(item , index) in searchButtons' :key="'searchButtons' + index" @click="handleClickSearchType(item)">{{item.name}}</Button>
    </div>
  </search-wrapper>
  <div class="echart-wrapper">
    <div class="echart-content">
      <div ref='echart1' />
    </div>
  </div>
</div>
</template>

<script>
import {
  api_weather_relative,
  api_weather_relative_getTypeNames
} from '@/api'
import color from '@/lib/color'
import echartConfig from '@/lib/echartConfig'
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
require('echarts/lib/component/dataZoom')

export default {
  data() {
    return {
      searchButtons: null,
      type: 999999,
      cacheData: {}, //缓存数据
      tableColums: [],
      typeName: '',
      tableData: [],
      tableName: '官方气象网站占比分析-网站'
    }
  },
  beforeRouteEnter(to, from, next) {
    api_weather_relative_getTypeNames().then(res => {
      next(vm => {
        vm.searchButtons = res.data
      })
    })
  },
  methods: {
    chartInit(data, refName) {
      this.myChart = echarts.init(this.$refs[refName], '', {
        height: '380px'
      });

      var optionPie = {
        tooltip: {
          boundaryGap: '50%',
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        series: [{
            name: 'UV占比',
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
      // 使用刚指定的配置项和数据显示图表。
      this.myChart.setOption(optionPie);
    },
    api_search_date(params) {
      api_weather_relative(params).then(res => {
        this.type = params.type
        this.exportExcel(res.data)
        this.drawChart(res.data)
        this.cacheData[params.type] = res.data
      })
    },
    exportExcel(data) {
      let _tableDataArr = []
      data.forEach((item, index) => {
        this.tableColums[index] = {
          title: item.name,
          key: 'official' + index
        }
        const stringify = `"official${index}" : ${item.value}`
        _tableDataArr[index] = stringify
      })

      const strObj = `{${_tableDataArr.toString()}}`
      const _tableData = [JSON.parse(strObj)]
      this.tableData = _tableData
    },
    drawChart(data){
      this.chartInit(data, 'echart1')
    },
    handleClickSearchType(item) {
      this.tableName = `官方气象网站占比分析(${item.name})`
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
