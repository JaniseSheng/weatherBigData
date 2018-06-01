<template>
<div class="">
  <search-wrapper ref='search' :isControlBtn=false :isArea='isArea' :show_area_level3=false>
    <div style='padding: 12px 0;'>
      <Button :type="down_time_btn.id == type ? 'success' : 'ghost'" @click="handle_down_time" style="margin:12px 12px 12px 0">{{down_time_btn.name}}</Button>
      <Button :type="item.id == type ? 'success' : 'ghost'" @click="handle_down_others(item)" v-for='item in allDownBtns' style="margin:12px 12px 12px 0">{{item.name}}</Button>
    </div>
  </search-wrapper>
  <p>
    <Button type="primary" shape="circle" icon="arrow-down-a" @click='handleClickDown'>
      点我下载数据
    </Button>
  </p>

</div>
</template>

<script>
import {
  api_down_data_time, down_Front_fzdDl, down_Front_fcjDl, down_Front_familyDl,down_Front_personDl,down_Front_websiteDl,down_Front_appDl,down_Front_iptvDl,down_Front_yqllDl,down_Front_hotDl
} from '@/api'

export default {
  data() {
    return {
      searchButtons: null,
      type: 999999,
      down_item : {},
      isArea: true,
      down_time_btn: {
        id: '1',
        name: '数据下载',
        tableColums: [],
        tableData: [],
      },
      allDownBtns: [
        {
          id: '2',
          name: '分终端',
          downUrl: down_Front_fzdDl
        },
        {
          id: '3',
          name: '分场景',
          downUrl: down_Front_fcjDl
        },
        {
          id: '4',
          name: '行为洞察-家庭',
          downUrl: down_Front_familyDl
        },
        {
          id: '5',
          name: '行为洞察-个人',
          downUrl: down_Front_personDl
        },
        {
          id: '6',
          name: '服务监控-网站',
          downUrl: down_Front_websiteDl
        },
        {
          id: '7',
          name: '服务监控-APP',
          downUrl: down_Front_appDl
        },
        {
          id: '8',
          name: '服务监控-IPTV',
          downUrl: down_Front_iptvDl
        },
        {
          id: '9',
          name: '舆情流量',
          downUrl: down_Front_yqllDl
        },
        {
          id: '10',
          name: '热点热词',
          downUrl: down_Front_hotDl
        }
      ]
    }
  },
  methods: {
    // 分时数据下载
    handle_down_time() {
      this.type = this.down_time_btn.id
      this.isArea = false
      this.$refs.search.areaName = '上海'
    },
    // 其他分类数据下载
    handle_down_others(item) {
      this.type = item.id
      this.down_item = item
      this.isArea = true
    },

    handleClickDown(){
      const searchData = this.$refs.search.handleReturnSearchData()
      if (!((searchData.monthRange.length > 0) || (searchData.dateRange.length > 0))) {
        this.$Message.error('您还没有选择日期范围')
        return
      }
      if (this.type ==1){
        api_down_data_time(searchData).then(res => {
          this.$refs.search.handleExportScv({
            tableName: this.down_time_btn.name,
            tableColums: res.data.colums,
            tableData: res.data.values
          })
          this.$Message.success('下载完成！')
        })
      } else {
        const dateRange = searchData.dateRange.length > 0 ? searchData.dateRange.toString() : searchData.monthRange.toString()
        this.$Message.success('正在下载中...')
        window.open(this.down_item.downUrl({
          areaName: searchData.areaName,
          dateRange
        }))
      }
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
