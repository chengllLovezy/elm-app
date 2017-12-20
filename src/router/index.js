import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/index'
import Home from '@/page/home/home'
import Find from '@/page/find/find'
import Order from '@/page/order/order'
import Profile from '@/page/profile/profile'

import Shop from '@/page/shop/shop'
import Pay from '@/page/pay/pay'
import Category from '@/page/category/category'
import Login from '@/page/login/login'
import Psdlogin from '@/page/login/psdlogin'
import Search from '@/page/search/search'
import Address from '@/page/address/address'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      component:Index,
      children:[
        {
          path:'home',
          name:'home',
          component:Home
        },
        {
          path:'find',
          name:'find',
          component:Find
        },
        {
          path:'order',
          name:'order',
          component:Order
        },
        {
          path:'profile',
          name:'profile',
          component:Profile
        }
      ]
    },
    {
      path:'/shop',
      name:'shop',
      component:Shop,
    },
    {
      path:'/pay',
      name:'pay',
      component:Pay
    },
    {
      path:'/category',
      name:'category',
      component:Category
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/psdlogin',
      name:'psdlogin',
      component:Psdlogin
    },
    {
      path:'/search',
      name:'search',
      component:Search
    },
    {
      path:'/address',
      name:'address',
      component:Address
    }
  ]
})
