
<template>
<div class="">
  <search-wrapper @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName">
    <div class="search-button">
      <Button :type="item.id == type ? 'success' : 'ghost'" v-for='(item , index) in searchButtons' :key="'searchButtons' + index" @click="handleClickSearchType(item)">{{item.name}}</Button>
    </div>
  </search-wrapper>
  <div class="echart-wrapper">
    <div class="echart-content" :class="$style['echart-content']">
      <div ref='wordCloud' style="width: 100%; height: 400px; backgroundColor: white">
        <vue-word-cloud
          :words='words'
          :maxFontSize= 'maxFontSize'
          :color="wordColor"
          :rotation= 'rotation'
          font-family="Roboto"
        ></vue-word-cloud>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  api_public_hot, api_public_hot_getTypeNames
} from '@/api'
import color from '@/lib/color'
import VueWordCloud from 'vuewordcloud';

export default {
  data() {
    return {
      searchButtons: null,
      fontSizeRatio: 10,
      maxFontSize: 100,
      words: [
        ['1', 12],
        ['2', 3],
        ['3', 7],
        ['4', 3],
        ['5', 19],
        ['6', 3],
        ['7', 7],
        ['9', 3],
        ['9', 19],
        ['10', 3],
        ['11', 7],
        ['12', 3],
        ['13', 19],
        ['14', 3],
        ['15', 7],
        ['16', 3],
        ['17', 19],
        ['18', 3],
        ['19', 7],
        ['20', 3]
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
      api_public_hot(params).then(res => {
        this.words = res.data
      })
    },
    changeSearch(items) {
      this.api_search_date(items)
    },
    wordColor([, weight]) {
      return weight > 10 ? '#2d8cf0' : weight > 5 ? '#19be6b' : '#ed3f14'
    },
    rotation([, val]) {
      const _val = Math.random()
      return [0.25, 0, 0.75, 0.875][Math.round(Math.random()*3)];
    }
  },
  components: {
    VueWordCloud,
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
