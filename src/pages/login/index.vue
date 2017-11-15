<template lang="html">
  <div class="login-wrapper" :style="{'background-image':'url('+ require('../../assets/login-bg.jpeg') +')'}">
    <div :class="$style['login-contaioner']">
      <div class="login-block">
        <div class="login-box">
          <div class="login-title">
            <p style='float: left; font-size: 18px'>气象服务大数据洞察平台</p>
          </div>
          <Form ref="forms" :model="forms" :rules="ruleforms">
            <Form-item prop="mobile">
              <Input type="text" v-model="forms.mobile" placeholder="请输入用户名" size='large'>
              <Icon type="ios-person-outline" slot="prepend" style='padding-right: 8px; padding-left: 8px' />
              </Input>
            </Form-item>
            <Form-item prop="passWord">
              <Input type="password" v-model="forms.passWord" placeholder="请输入密码" size='large' @on-enter="handleSubmit('forms')">
              <Icon type="ios-locked-outline" slot="prepend" style='padding-right: 8px; padding-left: 8px' />
              </Input>
            </Form-item>
            <Form-item style="text-align: left">
              <Checkbox class='custom-3' v-model='isRemember'>记住密码</Checkbox>
            </Form-item>
            <Form-item>
              <Button class='custom-4' type="primary" @click="handleSubmit('forms')" size='large' long>登录</Button>
            </Form-item>
          </Form>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import {
  empty
} from '@/lib/validator'
export default {
  data() {
    return {
      isRemember: false, //是否记住账号
      forms: {
        mobile: '',
        passWord: ''
      },
      ruleforms: {
        mobile: empty('账号不能为空'),
        passWord: empty('密码不能为空')
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          login(this.forms).then((res) => {
            this.$Message.success('您好！欢迎来到华晚集团客户关系管理系统!');
            storage.set('userInfo', res.user)
            storage.set('resource', res.resource)
            storage.set('address', res.defaultAddr)
            this.rememberforms(this.isRemember);
            storage.set('islogin', true);
            this.$router.push({
              name: '0'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../../style/mythemes.less";
@import "../../style/myfun.less";
.login-wrapper {
    min-height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
}
.bg-img {
    height: 100%;
    background-repeat: repeat-x;
    background-position: bottom;
}
.user-area {
    height: 100%;
    background-repeat: no-repeat;
    background-position: left center;
}
.login-block {
    display: inline-block;
    height: 320px;
    width: 406px;
    margin: auto;
    position: absolute;
    right: 24px;
    top: 0;
    bottom: 0;
    border-radius: 4px;
    padding: 12px 32px;
    background-color: @bg-color;
    box-shadow: 0 0 10px 1px fade(@box-shadow-color, 40%);
}
.login-title {
    padding: 8px 0 16px;
    .clearfix();
}
.custom-3 {
    .ivu-checkbox {
        margin-right: 6px;
    }
}
.custom-4 {
    box-shadow: 0 1px 6px 1px fade(@box-shadow-color, 50%);
}
</style>

<style lang="less" module>
.login-contaioner {
  height: 100vh;
  position: relative;
  max-width: 1200px;
  margin: auto;
}
</style>
