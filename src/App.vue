<template>
<div id="app">
  <router-view/>
  <template v-if='isSHowLoading'>
    <div class="loading-wrapper" v-if='loading.isLoading'>
      <div class="loading-block">
        <Button style="position: absolute;right: -12px;top: -12px;" type="primary" shape="circle" icon="close-round" @click='handleClickClose' ></Button>
        <img style="width: 100%" src="./assets/Cube.gif" alt="">
        <p style="padding-top: 6px;">...</p>
      </div>
    </div>
  </template>
</div>
</template>

<script>
import {
  mapState, mapActions
} from 'vuex'

export default {
  name: 'app',
  data(){
    return {
      isSHowLoading: false
    }
  },
  mounted(){
    setTimeout(()=>{
      this.isSHowLoading = true
    }, 2000)
  },
  methods: {
    ...mapActions(['set_loading_state']),
    handleClickClose(){
      this.set_loading_state(false)
    }
  },
  computed: {
    ...mapState(['loading'])
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

<style lang="less" scoped>
@import './style/mythemes.less';
.loading-wrapper {
    position: fixed;
    z-index: 1000;
    background: fade(@text-color, 60%);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.loading-block {
    width: 200px;
    position: absolute;
    height: 240px;
    border-radius: 12px;
    padding: 12px;
    background: white;
    top: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    left: 0;
    right: 0;
}
</style>
