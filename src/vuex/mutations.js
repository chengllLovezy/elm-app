/*
* 声明mutations的类型
* */
const ADD_CART = 'ADD_CART';//添加商品到购物车
const REDUCE_CART = 'REDUCE_CART';//删除购物车中的额商品
const TOTAL_PRICE = 'TOTAL_PRICE';//购买的商品总价计算
const INIT_CART = 'INIT_CART';//网页初始化，调用本地缓存购物列表

import { setCartBuy, getCartBuy } from '../config/until'

export default {
  [ADD_CART](state,foodsItem){
    // let cart = state.cartLists;
    setCartBuy('cartBuy',foodsItem)
  },
  [REDUCE_CART](state,foodsItem){
    setCartBuy('cartBuy',foodsItem)
  },
  [INIT_CART](state){
    let initCart = getCartBuy('cartBuy');
    if(initCart){
      state.cartLists = JSON.parse(initCart);
    }
  },
  [TOTAL_PRICE](state){
    // let num = state.totalCartGoodsNum;
  }
}
