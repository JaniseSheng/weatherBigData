<template>
<div class="">
  <search-wrapper @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName" :isArea= 'false' />
  <div style='text-align: center; margin-top: 36px; padding: 120px 0' v-if='tableData.length > 0'>
    <Icon type="checkmark-circled" color='#2d8cf0' size='52'></Icon>
    <p style="margin-top: 12px">数据获取完毕，点击导出下载！</p>
  </div>
</div>
</template>

<script>
import {
  api_down_data_time
} from '@/api'

export default {
  data() {
    return {
      searchButtons: null,
      tableColums: [],
      tableData: [],
      tableName: '分时数据下载'
    }
  },
  methods: {
    exportExcel(data) {
      this.tableColums = data.colums
      this.tableData = data.values
    },
    changeSearch(items) {
      api_down_data_time(items).then(res => {
        this.exportExcel(res.data)
      })
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
