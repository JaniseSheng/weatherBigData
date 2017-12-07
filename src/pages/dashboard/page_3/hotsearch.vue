
<template>
<div class="">
  <search-wrapper @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName">
    <div class="search-button">
      <Button :type="item.id == type ? 'success' : 'ghost'" v-for='(item , index) in searchButtons' :key="'searchButtons' + index" @click="handleClickSearchType(item)">{{item.name}}</Button>
      <!-- <div style="position: absolute;right: 0;top: 12px;">
        缩放控制：
        <Button type="primary" icon="minus"></Button>
        <Button type="primary" icon="plus" style="margin-right: 0"></Button>
      </div> -->
    </div>
  </search-wrapper>
  <div class="echart-wrapper">
    <div class="echart-content" :class="$style['echart-content']">
      <div ref='wordCloud' style="position: relative; width: 100%; height: 400px; backgroundColor: white">
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
import VueWordCloud from 'vuewordcloud';
let WordCloud = require('../../../lib/wordcloud2.js')
export default {
  data() {
    return {
      searchButtons: null,
      fontSizeRatio: 10,
      maxFontSize: 200,
      words: [
        ['ggg', 12],
        ['aaaa', 15]
      ],
      echartNum: 0,
      type: 0,
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
        this.words = res.data
        this.wordCloud = new WordCloud(this.$refs.wordCloud, {
          list: res.data,
          color: () => {
            return ['#2d8cf0', '#19be6b', '#ff9900', '#ed3f14'][Math.round(Math.random() * 3)]
          },
          gridSize: Math.round(16 * 1000 / 1024),
          weightFactor: function(size) {
            return Math.pow(size, 2.3) * 1000 / 1024;
          }
        })
      })
    },
    changeSearch(items) {
      const params = Object.assign({}, items, {
        type: this.type
      })
      this.api_search_date(params)
    },
    handleClickSearchType(item) {
      this.tableName = `热点热词(${item.name})`
      this.type = item.id
    },
    rotation([, val]) {
      return [0.25, 0, 0.75, 0.875][Math.round(Math.random() * 3)];
    }
  },
  components: {
    VueWordCloud,
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
