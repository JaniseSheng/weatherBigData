import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login'
import dashboard from '@/pages/dashboard'
import terminal from '@/pages/dashboard/page_0/terminal'
import scene from '@/pages/dashboard/page_0/scene'
import family from '@/pages/dashboard/page_1/family'
import personal from '@/pages/dashboard/page_1/personal'
import user from '@/pages/dashboard/page_1/user'
import webtraffic from '@/pages/dashboard/page_2/webtraffic'
import apptraffic from '@/pages/dashboard/page_2/apptraffic'
import meteortraffic from '@/pages/dashboard/page_2/meteortraffic'
import sentiment from '@/pages/dashboard/page_3/sentiment'
import hotsearch from '@/pages/dashboard/page_4/hotsearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/',
      name: 'dashboard',
      component: dashboard,
      children: [
        {
          path: '',
          name: '0-1',
          component: terminal
        }, {
          path: '/scene',
          name: '0-2',
          component: scene
        },
        {
          path: '/family',
          name: '1-1',
          component: family
        },
        {
          path: '/personal',
          name: '1-2',
          component: personal
        },
        {
          path: '/user',
          name: '1-3',
          component: user
        },
        {
          path: '/webtraffic',
          name: '2-1',
          component: webtraffic
        },
        {
          path: '/apptraffic',
          name: '2-2',
          component: apptraffic
        },
        {
          path: '/meteortraffic',
          name: '2-3',
          component: meteortraffic
        },
        {
          path: '/sentiment',
          name: '3-1',
          component: sentiment
        },
        {
          path: '/hotsearch',
          name: '4-1',
          component: hotsearch
        }
      ]
    }
  ]
})
