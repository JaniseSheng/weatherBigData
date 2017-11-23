<template>
<div :class="$style['search-wrapper']">
  <div class="search_geader">
    <Row style="display: inline-block;width: 100%;">
      <Col span='6' style="text-align: left">
      <span style="display: inline-block" @click='modal1 = true'>
          <Input :value="areaName" readonly icon="ios-location" placeholder="选择区域"  style="width: 200px"></Input>
        </span>
      </Col>
      <Col span='12' >
      <DatePicker :value='month' :clearable=false @on-change='handleChangeMonth' type="month" :options="monthOptions" placeholder="选择月份" style="width: 200px"></DatePicker>
      <DatePicker :value='dataRange' ref='datePickerRange' :clearable=false @on-change='handleChangeDataRange' type="daterange" :options="dateRangeOptions" placement="bottom-end" placeholder="时间区间选择" style="width: 240px"></DatePicker>
      </Col>
      <Col span='6' style="text-align: right">
      <Button type='success'>导出excel</Button>
      </Col>
    </Row>
    <Modal v-model="modal1" width="1200" title="区域选择">
      <ul style='max-height: 500px; overflow: scroll'>
        <li v-for='(area, index) in areas' :key="'area' + index" style="margin-bottom: 6px">
          <p>
            <Button type="success" @click="handleClickArea(area)">{{area.name}}</Button>
          </p>
          <p :class="$style['item-button']">
            <Button type="text" v-for="(item, index) in area.childrens" :style="item.id == areaId ? buttonActiveStyle : ''"  @click="handleClickAreaItem(item)" :key="'button' + index">{{item.name}}</Button>
          </p>
        </li>
      </ul>
      <div slot='footer' style="display: none" />
    </Modal>
  </div>
  <div style="text-align: left;">
    <slot :dataRange='dataRange' :areaName='areaName' :areaId='areaId' >
    </slot>
  </div>
</div>
</template>

<script>
import {
  areas
} from '@/lib/enum.js'
import {currMonth_dataRange, currMonthDatas, getCurMonth, dateDiff} from '@/lib/date'

export default {
  data() {
    return {
      buttonActiveStyle: {
        color: '#19be6b'
      },
      areaName: '普陀区', //选择的区域
      areaId: '001', //选择的区域
      dataRange: currMonth_dataRange(),
      month: getCurMonth(),
      currMonthDatas: 30,
      areas,
      modal1: false, //是否选择区域
      monthOptions: {
        disabledDate(date) {
          return date && ( date.valueOf() > Date.now());
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
          return date && ( date.valueOf() > Date.now());
        }
      }
    }
  },
  created(){
    this.$emit('searchInit', {
      areaName: this.areaName,
      areaId: this.areaId,
      dataRange: this.dataRange
    })
  },
  methods: {
    handleChangeSearch() {
      this.$emit('changeSearch', {
        areaName: this.areaName,
        areaId: this.areaId,
        dataRange: this.dataRange
      })
    },
    handleClickArea(val) {
      this.areaName = val.name
      this.areaId = val.id
      this.modal1 = false
      this.handleChangeSearch()
    },
    handleClickAreaItem(val) {
      this.areaName = val.name
      this.areaId = val.id
      this.modal1 = false
      this.handleChangeSearch()
    },
    handleChangeMonth(val) {
      this.dataRange = currMonth_dataRange(val)
      this.handleChangeSearch()
    },
    handleChangeDataRange(val) {
      const selectDatas = dateDiff(val[0], val[1])
      if (selectDatas > 31) {
        this.$Message.error('最大查询天数为31天')
        return false
      }
      this.dataRange = val
      this.handleChangeSearch()
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
