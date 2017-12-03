<template>
<div :class="$style['search-wrapper']">
  <Table ref='table' style="display: none" />
  <div class="search_geader">
    <div style="display: inline-block;width: 100%; text-align: left">
      <div class="search-wrapper" style="display: inline-block; text-align: left">
        <span style="display: inline-block" @click='handleOpenArea'>
            <Input :value="areaName" readonly :disabled='!isArea' icon="ios-location" placeholder="选择区域"  style="width: 200px"></Input>
        </span>
        <DatePicker ref='monthPickerStart' :value='monthRange[0]' :clearable=false @on-change='handleChangeMonthStart' type="month" :options="monthOptionStart" placeholder="开始月" style="width: 100px"></DatePicker>
        至
        <DatePicker ref='monthPickerEnd' :value='monthRange[1]' :clearable=false @on-change='handleChangeMonthEnd' type="month" :options="monthOptionEnd" placeholder="结束月" style="width: 100px"></DatePicker>
        /
        <DatePicker :value='dataRange' ref='datePickerRange' id='datePickerRange' :clearable=false @on-change='handleChangeDataRange' type="daterange" :options="dateRangeOptions" placement="bottom-end" placeholder="时间区间选择" style="width: 240px"></DatePicker>
      </div>
      <div style="float: right; text-align: right">
        <Button type='success' icon='search' style="width: 120px" @click='handleClickSearch'>搜索</Button>
        <Button type='info' @click='handleClickExport'>导出excel</Button>
      </div>

    </div>
    <Modal v-model="modal1" width="1200" title="区域选择">
      <ul style='max-height: 500px; overflow: scroll'>
        <p>
          <Button type="info" style="margin-bottom: 24px; width: 180px" @click="handleSelectShangHai('上海')">上海</Button>
        </p>
        <li v-for='(area, index) in areas' :key="'area' + index" style="margin-bottom: 6px">
          <p>
            <Button type="success" @click="handleClickArea(area.name)">{{area.name}}</Button>
          </p>
          <p :class="$style['item-button']">
            <Button type="text" v-for="(item, index) in area.childrens" :style="(area.name + '/' + item) == areaName ? buttonActiveStyle : ''" @click="handleClickAreaItem(area.name + '/' + item)" :key="'button' + index">{{item}}</Button>
          </p>
        </li>
      </ul>
      <div slot='footer' style="display: none" />
    </Modal>
  </div>
  <div style="text-align: left;">
    <slot :dataRange='dataRange' :areaName='areaName' :monthRange='monthRange'>
    </slot>
  </div>
</div>
</template>

<script>
import {
  areas
} from '@/lib/enum.js'
import {
  currMonth_dataRange,
  getCurMonth,
  dateDiff,
  getMct
} from '@/lib/date'

export default {
  data() {
    return {
      buttonActiveStyle: {
        color: '#19be6b'
      },
      areaName: '', //选择的区域
      monthRange: [], // 月范围
      dataRange: [], // 天范围
      areas,
      modal1: false, //是否选择区域
      monthOptionStart: {
        disabledDate(date) {
          return date && (date.valueOf() > Date.now());
        }
      },
      monthOptionEnd: {
        disabledDate(date) {
          return date && (date.valueOf() > Date.now());
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
        disabledDate(date) {
          return date && (date.valueOf() > Date.now());
        }
      }
    }
  },
  props: {
    tableColums: {
      default: [],
      type: Array
    },
    tableData: {
      default: [],
      type: Array
    },
    tableName: {
      default: '',
      type: String
    },
    monthRangePromise: {
      default: 5,
      type: [String, Number]
    },
    isArea: {
      default: true,
      type: Boolean
    }
  },
  methods: {
    handleClickSearch() {
      this.$emit('changeSearch', {
        areaName: this.areaName,
        dataRange: this.dataRange,
        monthRange: this.monthRange
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
        this.dataRange = []
        const monthIndex = getMct(this.monthRange[0], this.monthRange[1])
        if (monthIndex > this.monthRangePromise) {
          this.$Message.error('最多查询5个月的是数据')
          this.monthRange[0] = ''
          this.monthRange[1] = ''
          this.$refs.monthPickerStart.currentValue = ''
          this.$refs.monthPickerEnd.currentValue = ''
        }
      }
    },
    handleChangeMonthEnd(val) {
      this.monthRange[1] = val
      if (this.monthRange[1] && this.monthRange[0]) {
        this.dataRange = []
        const monthIndex = getMct(this.monthRange[0], this.monthRange[1])
        if (monthIndex > this.monthRangePromise) {
          this.$Message.error('最多查询5个月的是数据')
          this.monthRange[0] = ''
          this.monthRange[1] = ''
          this.$refs.monthPickerStart.currentValue = ''
          this.$refs.monthPickerEnd.currentValue = ''
        }
      }

      this.monthRange[1] && this.monthRange[0] && (this.dataRange = [])
    },
    handleChangeDataRange(val) {
      const selectDatas = dateDiff(val[0], val[1])
      if (selectDatas > 31) {
        this.$Message.error('最大查询天数为31天')
        this.dataRange = []
        return false
      }
      this.dataRange = val
      this.monthRange = []
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
    }
  }
}
</script>

<style lang="less" module>
@import "../style/mythemes.less";
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
