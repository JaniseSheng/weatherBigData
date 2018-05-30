<template>
<div class="w-contaioner">
  <div class="header-wrapper">
    <p class='header-title'>
      <Icon type="stats-bars" size='36' style="vertical-align: middle"></Icon>
      气象服务大数据洞察平台
    </p>
    <p style="float: right">
      欢迎{{userName}}登陆!
      <Button type="warning" icon="log-out" size='small' style="margin-left: 6px;" @click="loginOut">登出</Button>
    </p>
  </div>
  <div class="main-wrapper">
    <div :class="$style['menu-wrapper']">
      <Menu theme="dark" :open-names="[$route.name.split('-')[0]]" :active-name="$route.name" accordion @on-select='handleSelectRoute'>
        <Submenu name="0">
          <template slot="title">
                          <Icon type="flag"></Icon>
                          整体分布
                      </template>
          <MenuItem name="0-1">分终端</MenuItem>
          <MenuItem name="0-2">分场景</MenuItem>
          <MenuItem name="0-3">分时数据下载</MenuItem>
          <MenuItem name="0-4">官方气象网站占比分析</MenuItem>
          <MenuItem name="0-5">气象相关占比分析</MenuItem>
        </Submenu>
        <Submenu name="1">
          <template slot="title">
                          <Icon type="arrow-graph-up-right"></Icon>
                          行为洞察
                      </template>
          <MenuItem name="1-1">家庭类人群分类</MenuItem>
          <MenuItem name="1-2">个人类人群分类</MenuItem>
          <!-- <MenuItem name="1-3">用户聚类分类</MenuItem> -->
        </Submenu>
        <Submenu name="2">
          <template slot="title">
                          <Icon type="stats-bars"></Icon>
                          服务监控
                      </template>
          <MenuItem name="2-1">网站流量监测</MenuItem>
          <MenuItem name="2-2">APP流量监测</MenuItem>
          <MenuItem name="2-3">IPTV流量监测</MenuItem>
        </Submenu>
        <Submenu name="3">
          <template slot="title">
                          <Icon type="pie-graph"></Icon>
                          舆情分析
                      </template>
          <MenuItem name="3-1">舆情流量</MenuItem>
          <MenuItem name="3-2">热点热词</MenuItem>
        </Submenu>
      </Menu>
    </div>
    <div class="content-wrapper">
      <div class="router-content">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </div>
  </div>

</div>
</template>

<script>
import storage from '@/lib/storagejs'
export default {
  data() {
    return {
      userName: 'admin'
    }
  },
  created(){
    this.userName = storage.get('mobile')
    const loginClear = storage.get('loginClear')
    if (loginClear) return
    this.$router.push('/login')
  },
  methods: {
    handleSelectRoute(name){
      this.$router.push({
          name: name
        })
    },
    loginOut(){
      storage.remove('loginClear')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mythemes.less";
.w-contaioner {
    position: relative;
    background-color: @content-bg-color;
    border: 1px solid @border-color;
    border-radius: 2px;
}
.header-wrapper {
    background-color: @menu-dark-title;
    color: white;
    padding: 0 12px;
    line-height: 64px;
    height: 64px;
    &:after {
        content: '';
        display: table;
        clear: both;
    }
}
.header-title {
    display: inline-block;
    margin-top: 1px;
    float: left;
    font-size: 24px;
}
.main-wrapper {
  margin-top: 1px;
    position: relative;
        min-height: 86vh;
    &:after {
        content: '';
        display: table;
        clear: both;
    }
}
.content-wrapper {
    padding: 12px 12px 0px 252px;
    position: relative;
}
.router-content {
    background-color: white;
}
</style>
<style lang="less" module>
@import "../../style/mythemes.less";
.menu-wrapper {
    width: 240px;
    float: left;
    :global(.ivu-menu) {
        height: 100%;
    }
    :global(.ivu-menu-item) {
        padding-left: 24px !important;
    }
    &:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 240px;
        background-color: @menu-dark-title;
    }
}
</style>
