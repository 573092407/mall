<template>
  <div class="cart">
<!--    导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

<!--    商品列表-->
    <cart-list/>
<!--    底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "@/views/cart/childComps/CartList";
import CartBottomBar from "@/views/cart/childComps/CartBottomBar";

import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  components: {
    CartBottomBar,
    NavBar,
    CartList
  },
  computed: {
    // 两种语法
    // ...mapGetters(['cartLength'.'cartList'])
    ...mapGetters({
      length: 'cartLength'
    })
  }

}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar{
  background-color: deeppink;
  color: white;
}
</style>
