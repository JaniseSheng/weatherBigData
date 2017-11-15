<template>
  <div class="w-contaioner">
    <Row>
      <Col span="8">
        <Menu theme="dark" :open-names="['1']" accordion>
                  <Submenu name="1">
                      <template slot="title">
                          <Icon type="ios-paper"></Icon>
                          整体分布
                      </template>
                      <MenuItem name="1-1">文章管理</MenuItem>
                      <MenuItem name="1-2">评论管理</MenuItem>
                      <MenuItem name="1-3">举报管理</MenuItem>
                  </Submenu>
                  <Submenu name="2">
                      <template slot="title">
                          <Icon type="ios-people"></Icon>
                          行为洞察
                      </template>
                      <MenuItem name="2-1">新增用户</MenuItem>
                      <MenuItem name="2-2">活跃用户</MenuItem>
                  </Submenu>
                  <Submenu name="3">
                      <template slot="title">
                          <Icon type="stats-bars"></Icon>
                          统计分析
                      </template>
                      <MenuGroup title="使用">
                          <MenuItem name="3-1">新增和启动</MenuItem>
                          <MenuItem name="3-2">活跃分析</MenuItem>
                          <MenuItem name="3-3">时段分析</MenuItem>
                      </MenuGroup>
                      <MenuGroup title="留存">
                          <MenuItem name="3-4">用户留存</MenuItem>
                          <MenuItem name="3-5">流失用户</MenuItem>
                      </MenuGroup>
                  </Submenu>
              </Menu>
      </COl>
      <Col span="16">
          <router-view/>
      </COl>
    </Row>
  </div>
</template>

<script>
export default {

}
</script>
