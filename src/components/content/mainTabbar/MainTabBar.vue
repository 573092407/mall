<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="deeppink">
<!--      起别名，在HTML中必须加~号来引用别名     -->
      <img slot="item-icon" src="~assets/img/tabbar/home0.jpg">
      <img slot="item-icon-active" src="~assets/img/tabbar/home1.jpg">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="deeppink">
      <img slot="item-icon" src="~assets/img/tabbar/category0.jpg">
      <img slot="item-icon-active" src="~assets/img/tabbar/category1.jpg">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="deeppink">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart0.jpg">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart1.jpg">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="deeppink">
      <img slot="item-icon" src="~assets/img/tabbar/profile0.jpg">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile1.jpg">
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
//起别名
import TabBar from "../../common/tabbar/TabBar";
import TabBarItem from "../../common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>
