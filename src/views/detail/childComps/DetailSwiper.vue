<template>
<!--  详情页轮播图  -->
    <swiper :options="swiperOptions">
      <swiper-slide class="swiper-item" v-for="item in topImages">
        <img class="item-img" :src="item" alt="">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
export default {
  name: "DetailSwiper",
  props:{
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: '.swiper-pagination',
        //   // 自动轮播
        autoplay: true,
        //   //  循环
        loop: true
      }
    }
  },
}
</script>


<style scoped>
 .swiper-item {
   height: 300px;
   overflow: hidden;
 }
 .item-img {
   width: 100%;
 }
</style>
