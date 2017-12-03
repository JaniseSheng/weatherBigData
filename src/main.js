// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import storage from '@/lib/storagejs'
import {searchWrapper} from '@/components/global'

import '@/style/global.less'
import '@/style/themes.less'

Vue.use(iView)
Vue.component('searchWrapper', searchWrapper)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  console.log(storage.get('weatherIsLogin'));
  if ((to.name !== 'login') && !storage.get('weatherIsLogin')) {
    next({path: 'login'});
  } else {
    next();
  }
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
