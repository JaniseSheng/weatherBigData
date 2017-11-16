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
      <DatePicker :value='month' @on-change='handleChangeMonth' type="month" placeholder="选择月份" style="width: 200px"></DatePicker>
      <DatePicker :value='dataRange' @on-change='handleChangeDataRange' type="daterange" :options="dateRangeOptions" placement="bottom-end" placeholder="时间区间选择" style="width: 240px"></DatePicker>
      </Col>
      <Col span='6' style="text-align: right">
      <Button type='success'>导出excel</Button>
      </Col>
    </Row>
    <Modal v-model="modal1" width="1200" title="区域选择">
      <ul style='max-height: 500px; overflow: scroll'>
        <li v-for='(area, index) in areas' :key="'area' + index" style="margin-bottom: 6px">
          <p>
            <Button type="success" size='small' @click="handleClickArea(area)">{{area.name}}</Button>
          </p>
          <p :class="$style['item-button']">
            <Button type="text" v-for="(item, index) in area.childrens" @click="handleClickAreaItem(item)" :key="'button' + index">{{item.name}}</Button>
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

export default {
  data() {
    return {
      areaName: '', //选择的区域
      areaId: '', //选择的区域
      month: '',
      dataRange: '',
      areas,
      modal1: false, //是否选择区域
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
          return date && ( date.valueOf() > Date.now() || date.valueOf() < (Date.now() - 86400000 * 30));
        }
      }
    }
  },
  methods: {
    handleClickArea(val) {
      this.areaName = val.name
      this.areaId = val.id
      this.modal1 = false
    },
    handleClickAreaItem(val) {
      this.areaName = val.name
      this.areaId = val.id
      this.modal1 = false
    },
    handleChangeMonth(val) {
      this.month = val
    },
    handleChangeDataRange(val) {
      this.dataRange = val

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
