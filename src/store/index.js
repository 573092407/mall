import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

//1.安装插件
Vue.use(Vuex)

const state = {
  cartList: []
}
//2.创建Store对象
const store = new Vuex.Store({
  // state: {
  //   cartList: []
  // },
  state,
  mutations,
  actions,
  getters
  // // mutations唯一的目的就是修改state中的状态
  // // mutations中的每个方法尽可能完成的事件比较单一一点
  // mutations: {
  //   addCounter(state, payload) {
  //     payload.count++
  //   },
  //   addToCart(state, payload) {
  //     state.cartList.push(payload)
  //   }
  // },
  // actions: {
    // addCart(context, payload) {
    //   // payload 新添加的商品
    //   // let oldProduct = null;
    //   // for(let item of state.cartList) {
    //   //   if(item.iid ===payload.iid){
    //   //     oldProduct = item;
    //   //   }
    //   // }
    //   //1.查找之前数组中是否有该商品
    //   let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    //   // 2.判断oldProduct
    //   if (oldProduct) {
    //     context.commit('addCounter', oldProduct)
    //   } else {
    //     payload.count = 1
    //     context.commit('addToCart',payload)
    //   }
    // }
  // }
})

export default store
