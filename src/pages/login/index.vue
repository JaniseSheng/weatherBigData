<template lang="html">
  <div class="login-wrapper" :style="{'background-image':'url('+ require('../../assets/login-bg.jpeg') +')'}">
    <div :class="$style['login-contaioner']">
      <div class="login-block">
        <div class="login-box">
          <div class="login-title">
            <p style='float: left; font-size: 18px'>气象服务大数据洞察平台</p>
          </div>
          <Form ref="forms" :model="forms" :rules="ruleforms">
            <Form-item prop="userName">
              <Input type="text" v-model="forms.userName" placeholder="请输入用户名" size='large'>
              <Icon type="ios-person-outline" slot="prepend" style='padding-right: 8px; padding-left: 8px' />
              </Input>
            </Form-item>
            <Form-item prop="passWord">
              <Input type="password" v-model="forms.passWord" placeholder="请输入密码" size='large'>
              <Icon type="ios-locked-outline" slot="prepend" style='padding-right: 8px; padding-left: 8px' />
              </Input>
            </Form-item>
            <Form-item prop="vCode">
              <Input type="text" v-model="forms.vCode" placeholder="请输入验证码" size='large' @on-enter="handleSubmit('forms')">
              <Icon type="android-star" slot="prepend" style='padding-right: 8px; padding-left: 8px'></Icon>
              <span slot="append" style="cursor: pointer" @click='test'>{{vCode1}} + {{vCode2}} = ?</span>
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
  empty, validate
} from '@/lib/validator'
import storage from '@/lib/storagejs'
let vCode1 = parseInt(Math.random(1)* 20)
let vCode2 = parseInt(Math.random(1)* 20)
export default {
  beforeRouteEnter (to, from, next) {
    vCode1 = parseInt(Math.random(1)* 20)
    vCode2 = parseInt(Math.random(1)* 20)
    next()
  },
  data() {
    return {
      isRemember: false, //是否记住账号
      vCode1,
      vCode2,
      forms: {
        userName: '',
        passWord: '',
        vCode: ''
      },
      userMenus: [{
          userName: 'weather_a',
          passWord: 'bigData@24129'
        },
        {
          userName: 'weather_b',
          passWord: 'bigData@13512'
        },
        {
          userName: 'weather_c',
          passWord: 'bigData@98881'
        },
        {
          userName: 'weather_d',
          passWord: 'bigData@66512'
        },
        {
          userName: 'weather_e',
          passWord: 'bigData@77615'
        }
      ],
      ruleforms: {
        userName: empty('账号不能为空'),
        passWord: empty('密码不能为空'),
        vCode: validate(vCode1 + vCode2)
      }
    }
  },
  created(){
  //判断是否自动登录
  this.forms.userName = storage.get('mobile')
  this.forms.passWord = storage.get('passWord')
  if (this.forms.userName) {
    this.isRemember = true;
  }
},
  methods: {
    test(){
      var _code1 = parseInt(Math.random(1)* 20)
      var _code2 = parseInt(Math.random(1)* 20)
      this.vCode1 = _code1
      this.vCode2 = _code2
      this.ruleforms.vCode = validate(_code1 + _code2)
    },
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          const _filterObj = this.userMenus.find(item => {
            return item.userName == this.forms.userName && item.passWord == this.forms.passWord
          })
          const isVCode = this.forms.vCode ==  this.vCode1 + this.vCode2
          if (_filterObj) {
            storage.set('weatherIsLogin', true);
            this.$Message.success('您好！欢迎来到气象服务大数据洞察平台!');
            if (this.isRemember) {
              storage.set('mobile', this.forms.userName);
              storage.set('passWord', this.forms.passWord);
            } else {
              storage.remove('mobile');
              storage.remove('passWord');
            }
            storage.set('loginClear', true)
            this.$router.push({
              name: '0-1'
            })
          } else {
            this.$Message.error('账号密码错误');
          }
        } else {
          if (!this.forms.userName || !this.forms.passWord) {
            this.$Message.error('请输入账号或密码');
          } else {
            this.$Message.error('请输入正确的验证码');
          }
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
    height: 350px;
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
