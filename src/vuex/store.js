import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex);

const state = {
  totalCartGoodsNum:0,//购物车商品数量
  totalPrice:0,//购买商品的总价
  cartLists:{},//购物车信息
};


export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})
