<template>
  <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="item in banners">
          <a :href="item.link">
            <img :src="item.image" alt="" @load="imageLoad">
          </a>
        </div>
      </div>
    </div>
</template>

<script>
// import Swiper from "swiper";
// import 'swiper/css/swiper.css'
// import {getHomeMultidata} from "@/network/home";

export default {
  name: "Swiper",
  props: {
    banners: {
      type: Array,
      default() {
        return[]
      }
    }
  },
  data() {
    return {
      isLoad: false,
    }
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  },
  // data() {
  //   return {
  //     banners: [],
  //     recommends: []
  //   }
  // },
  mounted(){
    new Swiper(".swiper-container")
  },
  // created() {
  //   //1.请求多个数据
  //   getHomeMultidata().then(res => {
  //     this.banners = res.data.banner.list;
  //     this.recommends = res.data.recommend.list
  //   })
  // }
}

</script>

<style scoped>
/*body {*/
/*  position: relative;*/
/*  !*position: fixed;*!*/
/*  height: 100%;*/
/*}*/

/*body {*/
/*  background: #eee;*/
/*  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;*/
/*  font-size: 14px;*/
/*  color: #000;*/
/*  margin: 0;*/
/*  padding: 0;*/
/*}*/

.swiper-container {
  position: relative;
  /*position: fixed;*/
  height: 100%;

  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;

  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-slide img {
  width: 100%;
  height: 100%;
}
</style>
