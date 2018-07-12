<template>
<div :class="$style['search-wrapper']">
  <Table ref='table' style="display: none" />
  <div class="search_geader">
    <div style="display: inline-block;width: 100%; text-align: left">
      <div class="search-wrapper" style="display: inline-block; text-align: left">
        <span style="display: inline-block" @click='handleOpenArea'>
            <Input :value="areaName" readonly :disabled='!isArea' icon="ios-location" placeholder="选择区域"  style="width: 200px"></Input>
        </span>
        <DatePicker ref='monthPickerStart' :disabled='!isMonth' :value='monthRange[0]' :clearable=false @on-change='handleChangeMonthStart' type="month" :options="monthOptionStart" placeholder="开始月" style="width: 100px"></DatePicker>
        至
        <DatePicker ref='monthPickerEnd' :disabled='!isMonth' :value='monthRange[1]' :clearable=false @on-change='handleChangeMonthEnd' type="month" :options="monthOptionEnd" placeholder="结束月" style="width: 100px"></DatePicker>
        /
        <DatePicker v-if="dateType == 'daterange'" :value='dateRange' ref='datePickerRange' id='datePickerRange' :clearable=false @on-change='handleChangedateRange' :type="dateType" :options="dateRangeOptions" placement="bottom-end" placeholder="时间区间选择" style="width: 240px"></DatePicker>
        <DatePicker v-else @on-change='handleChangedatePoint' :type="dateType" :options="dateOptions" placement="bottom-end" placeholder="时间选择" style="width: 240px"></DatePicker>
      </div>
      <div style="float: right; text-align: right" v-if='isControlBtn'>
        <Button type='success' icon='search' style="width: 120px" @click='handleClickSearch'>搜索</Button>
        <Button type='info' @click='handleClickExport'>导出excel</Button>
      </div>
    </div>
    <p :class='$style.searchInfo' v-show='areaName_info || date_info'><Icon type="search"></Icon> <Tag v-if='areaName_info'>{{areaName_info}}</Tag>  <Tag v-if='date_info'>{{date_info}}</Tag> </p>
    <Modal v-model="modal1" width="1200" title="区域选择">
      <ul style='max-height: 500px; overflow: scroll'>
        <p>
          <Button type="info" style="margin-bottom: 24px; width: 180px" @click="handleSelectShangHai('上海')">上海</Button>
        </p>
        <li v-for='(area, index) in areas' :key="'area' + index" style="margin-bottom: 6px">
          <p>
            <Button type="success" @click="handleClickArea(area.name)">{{area.name}}</Button>
          </p>
          <p :class="$style['item-button']" >
            <Button type="text" :disabled='!show_area_level3' v-for="(item, index) in area.childrens" :style="(area.name + '/' + item) == areaName ? buttonActiveStyle : ''" @click="handleClickAreaItem(area.name + '/' + item)" :key="'button' + index">{{item}}</Button>
          </p>
        </li>
      </ul>
      <div slot='footer' style="display: none" />
    </Modal>
  </div>
  <div style="text-align: left;">
    <slot>
    </slot>
  </div>
</div>
</template>

<script>
import {
  areas
} from '@/lib/enum.js'
import {
  getCurMonth,
  dateDiff,
  getMct
} from '@/lib/date'
import _Array from 'lodash/Array'
export default {
  data() {
    return {
      _Array,
      buttonActiveStyle: {
        color: '#19be6b'
      },
      areaName: '上海', //选择的区域
      areaName_info: '', // 当前已经选中的区域
      date_info: '', //当前已经选中的时间
      monthRange: [], // 月范围
      dateRange: [], // 天范围
      areas,
      modal1: false, //是否选择区域
      monthOptionStart: {
        disabledDate(date) {
          const startTime = date.valueOf() < new Date().setFullYear(2017,7,31)
          const endTime = date.valueOf() > Date.now()
          return startTime || endTime
        }
      },
      monthOptionEnd: {
        disabledDate(date) {
          const startTime = date.valueOf() < new Date().setFullYear(2017,7,31)
          const endTime = date.valueOf() > Date.now()
          return startTime || endTime
        }
      },
      dateOptions: {
        disabledDate: (date)=> {
          const startTime = date.valueOf() < new Date().setFullYear(2017,7,31)
          const endTime = date.valueOf() > Date.now()
          return startTime || endTime
        }
      },
      dateRangeOptions: {
        shortcuts: [{
            text: '一个星期',
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: '二个星期',
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
              return [start, end];
            }
          },
          {
            text: '三个星期',
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 21);
              return [start, end];
            }
          }
        ],
        disabledDate: (date)=> {
          const startTime = date.valueOf() < new Date().setFullYear(2017,7,31)
          const endTime = date.valueOf() > Date.now()
          return startTime || endTime
        }
      }
    }
  },
  props: {
    dateType: {
      default: 'daterange',
      type: String
    },
    tableColums: {
      default: ()=>{
        return []
      },
      type: Array
    },
    tableData: {
      default: ()=>{
        return []
      },
      type: Array
    },
    tableName: {
      default: '',
      type: String
    },
    limitDates: {
      default: 31,
      type: Number
    },
    monthRangePromise: {
      default: 5,
      type: [String, Number]
    },
    isControlBtn: {
      default: true,
      type: Boolean
    },
    isArea: {
      default: true,
      type: Boolean
    },
    isMonth: {
      default: true,
      type: Boolean
    },
    show_area_level3: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    handleReturnSearchData(){
      return {
        areaName: this.areaName,
        dateRange: _Array.compact(this.dateRange),
        monthRange: _Array.compact(this.monthRange)
      }
    },
    handleClickSearch() {
      if (!this.areaName && this.isArea) {
        this.$Message.error('您还没有选择行政区域')
        return
      }
      if (!((this.monthRange[0] && this.monthRange[1]) || (this.dateRange[0] && this.dateRange[1]))) {
        this.$Message.error('您还没有选择日期范围')
        return
      }
      const dateRange = _Array.compact(this.dateRange)
      const monthRange = _Array.compact(this.monthRange)
      this.areaName_info = this.areaName
      this.date_info = dateRange.length > 1 ? dateRange.toString().replace(',','-') : monthRange.toString('-').replace(',','-')
      this.$emit('changeSearch', {
        areaName: this.areaName,
        dateRange,
        monthRange
      })
    },
    handleOpenArea() {
      if (!this.isArea) return
      this.modal1 = true
    },
    handleSelectShangHai(val) {
      this.areaName = val
      this.modal1 = false
    },
    handleClickArea(val) {
      this.areaName = val
      this.modal1 = false
    },
    handleClickAreaItem(val) {
      this.areaName = val
      this.modal1 = false
    },
    handleChangeMonthStart(val) {
      this.monthRange[0] = val
      if (this.monthRange[1] && this.monthRange[0]) {
        const monthIndex = getMct(this.monthRange[0], this.monthRange[1])
        if (monthIndex >= this.monthRangePromise) {
          this.$Message.error(`最多查询${this.monthRangePromise}个月的是数据`)
          this.$refs.monthPickerStart.currentValue = ''
          this.$refs.monthPickerEnd.currentValue = ''
          this.monthRange = []
          return
        }
        this.dateRange = []
      }
    },
    handleChangeMonthEnd(val) {
      this.monthRange[1] = val
      if (this.monthRange[1] && this.monthRange[0]) {
        const monthIndex = getMct(this.monthRange[0], this.monthRange[1])
        if (monthIndex >= this.monthRangePromise) {
          this.$Message.error(`最多查询${this.monthRangePromise}个月的是数据`)
          this.$refs.monthPickerStart.currentValue = ''
          this.$refs.monthPickerEnd.currentValue = ''
          this.monthRange = []
          return
        }
        this.dateRange = []
      }
    },
    handleChangedateRange(val) {
      const selectDatas = dateDiff(val[0], val[1])
      if (selectDatas > this.limitDates) {
        this.$Message.error(`最大查询天数为${this.limitDates}天`)
        this.dateRange = []
        return false
      }
      this.dateRange = val
      this.$refs.monthPickerStart.currentValue = ''
      this.$refs.monthPickerEnd.currentValue = ''
      this.monthRange = []
    },
    handleChangedatePoint(val){
      this.dateRange = [val,val]
    },
    handleClickExport() {
      if (!this.tableData) {
        this.$Message.error('没有数据可以导出！')
        return
      }
      this.$refs.table.exportCsv({
        filename: this.tableName,
        columns: this.tableColums,
        data: this.tableData
      });
    },
    handleExportScv(params){
      console.log(params);
      this.$refs.table.exportCsv({
        filename: params.tableName,
        columns: params.tableColums,
        data: params.tableData
      });
    }
  }
}
</script>

<style lang="less" module>
@import "../style/mythemes.less";
.searchInfo {
  text-align: left;
  padding-top: 6px;
  & i {
    color: @success-color;
    font-size: 20px;
    line-height: 32px;
    vertical-align: middle;
    margin-right: 6px;
  }
}
.search-wrapper {
    padding: 12px;
}
.item-button {
    & button {
        position: relative;
        &:nth-last-of-type(n + 2) {
            &:after {
                content: '';
                position: absolute;
                right: 0;
                top: 6px;
                bottom: 6px;
                width: 1px;
                background-color: fade(@text-color, 50%);
            }
        }
    }
}
</style>
