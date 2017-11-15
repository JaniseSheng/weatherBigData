import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import dashboard from '@/pages/dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'dashboard',
      component: dashboard
    }
  ]
})
