import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import home from '@/page/home'
import sdkProtect from '@/page/app/sdkProtect'
import soProtect from '@/page/app/soProtect'
import userManage from '@/page/sys/userManage'
import licenseManage from '@/page/sys/licenseManage'
import logManage from '@/page/sys/logManage'
import aboutSystem from '@/page/sys/aboutSystem'

import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/web',
      component: home,
      children: [
        {
          path: 'app/sdk-protect',
          component: sdkProtect,
        },
        {
          path: 'app/so-protect',
          component: soProtect,
        },
        {
          path: 'sys/user-manage',
          component: userManage,
        },
        {
          path: 'sys/license-manage',
          component: licenseManage,
        },
        {
          path: 'sys/log-manage',
          component: logManage,
        },
        {
          path: 'sys/about',
          component: aboutSystem,
        },
      ]
    }
  ]
})

router.afterEach((to, from) => {
  const {path} = to
  store.commit('global/setActiveMenu', path)
})

export default router
