
<template>
<div class="">
  <search-wrapper @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName" :isArea= false>
    <div class="search-button">
      <Button :type="item.id == type ? 'success' : 'ghost'" v-for='(item , index) in searchButtons' :key="'searchButtons' + index" @click="handleClickSearchType(item)">{{item.name}}</Button>
    </div>
  </search-wrapper>
  <div class="echart-wrapper">
    <div class="echart-content" :class="$style['echart-content']">
      <div ref='wordCloud' style="position: relative; width: 100%; height: 400px; backgroundColor: white" @wordcloudstop='wordcloudStop'>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  api_public_hot,
  api_public_hot_getTypeNames
} from '@/api'
import color from '@/lib/color'
let WordCloud = require('../../../lib/wordcloud2.js')
export default {
  data() {
    return {
      searchButtons: null,
      cacheData: {}, //缓存数据
      echartNum: 0,
      type: 999999,
      tableColums: [],
      tableData: [],
      tableName: '热点搜词'
    }
  },
  beforeRouteEnter(to, from, next) {
    api_public_hot_getTypeNames().then(res => {
      next(vm => {
        vm.searchButtons = res.data
      })
    })
  },
  methods: {
    api_search_date(params) {
      let _tableColums = []
      let _tableData = [{}]
      this.wordCloud = null
      api_public_hot(params).then(res => {
        this.drawChart(res.data)
      })
    },
    drawChart(data){
      this.wordCloud = new WordCloud(this.$refs.wordCloud, {
        list: data,
        color: (a, size) => {
          console.log(size);
          return ['#2d8cf0', '#19be6b', '#ff9900', '#ed3f14'][size % 4]
        },
        gridSize: Math.round(16 * 1000 / 1024),
        weightFactor: function(size) {
          return Math.pow(size, 2) * 1000 / 1024;
        }
      })
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
    },
    wordcloudStop(){
      this.cacheData[this.type] = this.$refs.wordCloud.innerHTML
    },
    handleClickSearchType(item) {
      this.tableName = `热点热词(${item.name})`
      this.type = item.id
      if (this.cacheData[item.id]) {
        this.$refs.wordCloud.innerHTML = this.cacheData[this.type]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-button {
    position: relative;
    padding: 12px 0;
    & button {
        margin-right: 6px;
    }
}
</style>

<style lang="less" module>
.echart-content {
    width: 100%;
    display: inline-block;
    &:after {
        content: '';
        display: table;
        clear: both;
    }
}
.echartItem {
    padding-top: 12px;
    width: 50%;
    float: left;
}
</style>
