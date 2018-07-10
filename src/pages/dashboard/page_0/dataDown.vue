<template>
<div class="">
  <search-wrapper ref='search' :isControlBtn=false :isArea='isArea' :isMonth='isMonth' :show_area_level3=false :limitDates='limitDates'>
    <div style='padding: 12px 0;'>
      <Button :type="down_time_btn.id == type ? 'success' : 'ghost'" @click="handle_down_time" style="margin:12px 12px 12px 0">{{down_time_btn.name}}</Button>
      <Button :type="item.id == type ? 'success' : 'ghost'" @click="handle_down_others(item)" v-for='item in allDownBtns' style="margin:12px 12px 12px 0">{{item.name}}</Button>
    </div>
  </search-wrapper>
  <p>
    <Button type="primary" shape="circle" icon="arrow-down-a" @click='handleClickDown' style="margin-bottom: 20px">
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
      isMonth: true,
      limitDates: 1000,
      down_time_btn: {
        id: '1',
        name: '分时数据下载',
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
          downUrl: down_Front_familyDl,
          extends: [
            {
              type: 'pc',
              id: '0'
            },
            {
              type: 'pc',
              id: '1'
            },
            {
              type: 'pc',
              id: '2'
            },
            {
              type: 'pc',
              id: '3'
            },
            {
              type: 'iptv',
              id: '0'
            },
            {
              type: 'iptv',
              id: '1'
            },
            {
              type: 'iptv',
              id: '2'
            },
            {
              type: 'iptv',
              id: '3'
            }
          ]
        },
        {
          id: '5',
          name: '行为洞察-个人',
          downUrl: down_Front_personDl,
          extends: [
            {
              id: '0'
            },
            {
              id: '1'
            },
            {
              id: '2'
            },
            {
              id: '3'
            },
            {
              id: '4'
            },
            {
              id: '5'
            },
            {
              id: '6'
            },
            {
              id: '7'
            },
            {
              id: '8'
            }
          ]
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
      this.isMonth = true
      this.$refs.search.areaName = '上海'
      this.limitDates = 1000
    },
    // 其他分类数据下载
    handle_down_others(item) {
      this.type = item.id
      this.down_item = item
      this.isArea = true
      this.isMonth = false
      this.$refs.search.monthRange = []
      if (['4','5'].indexOf(item.id) > -1) {
          this.limitDates = 30
      } else {
          this.limitDates = 1000
      }
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
        const requestUrl = this.down_item.downUrl({
          areaName: searchData.areaName,
          dateRange
        })
        if (this.down_item.extends) {
          this.down_item.extends.forEach(item=>{
            const _type = item.type ? `&type=${item.type}` : ''
            const _id = '&id=' + item.id
            const _requestUrl = requestUrl + _type + _id
            window.open(_requestUrl)
          })
          return
        }
        window.open(requestUrl)
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
