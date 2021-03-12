import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import store from "./store";
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

import toast from 'components/common/toast'


import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.use(toast)

// 解决移动端300ms延迟
// 1.安装fastclick
// 2.导入
// 3.调用attach函数
FastClick.attach(document.body)

// 使用懒加载的插件
Vue.use(VueLazyload,{
  //导入正在加载时的图片
  loading: require('./assets/img/load/loading.jpg')
})

Vue.use(VueAwesomeSwiper)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
