
<template>
<div class="">
  <search-wrapper @changeSearch='changeSearch' :tableColums="tableColums" :tableData="tableData" :tableName="tableName" :isArea= false>
    <div class="search-button">
      <Button :type="item.id == type ? 'success' : 'ghost'" v-for='(item , index) in searchButtons' :key="'searchButtons' + index" @click="handleClickSearchType(item)">{{item.name}}</Button>
      <div :class="$style['button-cotrol']">
        <Button type="success" size='small' icon="arrow-return-left" @click='handletransformReturn'>复位</Button>
        <Button type="info" size='small' icon="arrow-up-b" @click='translateY -= 30'></Button>
        <Button type="info" size='small' icon="arrow-down-b" @click='translateY += 30'></Button>
        <Button type="info" size='small' icon="arrow-left-b" @click='translateX -= 20'></Button>
        <Button type="info" size='small' icon="arrow-right-b" @click='translateX += 20'></Button>
        <Button type="warning" shape="circle" icon="plus-round" @click='scale += 0.5'></Button>
        <Button type="error" shape="circle" icon="minus" @click='scale -= 0.5'></Button>
      </div>
    </div>
  </search-wrapper>
  <div class="echart-wrapper" style="overflow: hidden;">
    <div style="background-color: white;">
      <div class="echart-content" :class="$style['echart-content']" :style="'transform: translate3d(' + translateX + '%,' + translateY + '%,' + '0'">
        <div ref='wordCloud' :class="$style.wordCloud" :style="'transform: scale(' + scale + '); position: relative; width: 100%; height: 700px; backgroundColor: white'" @wordcloudstop='wordcloudStop'>
        </div>
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
      translateX: 0,
      translateY: 0,
      scale: 1,
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
      let _tableData = {}
      this.wordCloud = null
      api_public_hot(params).then(res => {
        res.data.forEach((item, index)=> {
          _tableColums[index] = {title: `${item[0]}`, key: `value${index}`}
          let _obj = {}
          _obj[`value${index}`] = item[1]
          _tableData = Object.assign({}, _tableData, _obj)
        })
        this.tableColums = _tableColums
        this.tableData = [_tableData]
        this.drawChart(res.data)
      })
    },
    drawChart(data, verSize= 5000){
      this.wordCloud = new WordCloud(this.$refs.wordCloud, {
        list: data,
        color: (a, size) => {
          console.log(size);
          return ['#2d8cf0', '#19be6b', '#ff9900', '#ed3f14'][size % 4]
        },
        gridSize: Math.round(16 * 1000 / 1024),
        weightFactor: function(size) {
          return Math.round(size / verSize)
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
    },
    handletransformReturn() {
      this.translateY = 0
      this.translateX = 0
      this.scale = 1
    }
  }
}
</script>

<style lang="less" scoped>
.search-button {
    position: relative;
    padding: 12px 0;
    display: inline-block;
    width: 100%;
    &:after {
      display: table;
      content: '';
      clear: both;
    }
    & button {
        margin-right: 6px;
    }
}
</style>

<style lang="less" module>
.wordCloud {
  transform-origin: center center;
  transition: transform .5s ease;
}
.button-cotrol {
  display: inline-block;
  float: right;
}
.echart-content {
    width: 100%;
    display: inline-block;
    transition: transform .5s ease;
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
