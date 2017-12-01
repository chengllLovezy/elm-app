import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/index'
import Home from '@/page/home/home'
import Find from '@/page/find/find'
import Order from '@/page/order/order'
import Profile from '@/page/profile/profile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component:Index,
      children:[
        {
          path:'home',
          component:Home
        },
        {
          path:'find',
          component:Find
        },
        {
          path:'order',
          component:Order
        },
        {
          path:'profile',
          component:Profile
        }
      ]
    }
  ]
})
