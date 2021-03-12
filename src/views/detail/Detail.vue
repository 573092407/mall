<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <Scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods ="goods"/>
      <detail-shop-info :shop ="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </Scroll>
    <detail-bottom-bar @addCart="addToCart"/>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
<!--    <toast :message="message" :show="show"/>-->
  </div>
</template>

<script>
import DetailNavBar from "@/views/detail/childComps/DetailNavBar";
import DetailSwiper from "@/views/detail/childComps/DetailSwiper";
import DetailBaseInfo from "@/views/detail/childComps/DetailBaseInfo";
import DetailShopInfo from "@/views/detail/childComps/DetailShopInfo";
import DetailGoodsInfo from "@/views/detail/childComps/DetailGoodsInfo";
import DetailParamInfo from "@/views/detail/childComps/DetailParamInfo";
import DetailCommentInfo from "@/views/detail/childComps/DetailCommentInfo";
import DetailBottomBar from "@/views/detail/childComps/DetailBottomBar";


import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
// import Toast from "@/components/common/toast/Toast";

import {getDetail, Goods, Shop, GoodsParam,getRecommend} from "@/network/detail";
import {debounce} from "@/common/utils";
import {itemListenerMixin,backTopMixin} from "@/common/mixin";
import { mapActions } from 'vuex'

export default {
  name: "Detail",
  components: {
    // Toast,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      // message: '',
      // show: false
      // isShowBackTop: false,
      // itemImgListener: null
    }
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // console.log('-------');
      // this.$refs.scroll.refresh()
      this.refresh()

      this.getThemeTopY()
      // this.themeTopYs = []
      // this.themeTopYs.push(0)
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.common.$el.offsetTop)
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    //监听滚动
    contentScroll(position) {
      // 1.获取Y值
      const positionY = -position.y

      //2.positionY和主题中的值进行对比
      //[0,7938,9120,9452]
      //positionY在0~7938  index=0
      //positionY在=7398~9120 index=1
      //positionY在=9120~9452 index=2
      //positionY超过=9452 index=3
      let length = this.themeTopYs.length
      // for(let i = 0; i < length; i++) {
      //   // 1. 普通做法
      //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY <
      //     this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
      //       this.currentIndex = i;
      //     console.log(this.currentIndex);
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }
      for(let i = 0; i < length-1; i++) {
        //  2.HACK写法
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY <
          this.themeTopYs[i+1])) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      this.listenShowBackTop(position)
    },
    //加入购物车
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2.将商品添加到购车界面
      // this.$store.cartList.push(product)

      // .commit是添加到mutations中
      // this.$store.commit('addCart',product)

      // .dispatch添加到actions中
      this.addCart(product).then(res => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = ''
        // },1500)

        this.$toast.show(res,2000)
        console.log(this.$toast);
      })
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      // 0.获取数据
      const data = res.result;
      // 1.获取顶部的图片轮播图
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 4.获取商品详细信息
      this.detailInfo = data.detailInfo

      // 5.获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      // 6.获取评论信息
      if(data.rate.cRate !== 0){
        this.commentInfo = data.rate.list[0]
      }

      /*
      // 1.第一次获取,值不对
      // 值不对的原因: this.$refs.params.$el压根没有渲染
      this.themeTopYs = []

      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.common.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs);

      this.$nextTick(() => {
        // 2.第二次获取： 值不对
        // 值不对的原因：图片没有计算在内
        //根据最新的数据,对应的dom是已经被渲染出来
        //但是图片依然是没有加载完(目前获取到的offsetTop不包含其中的图片)
        //offsetTop值不对的时候，都是因为图片的问题
        this.themeTopYs = []

        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.common.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        console.log(this.themeTopYs);
      })
      */
    })


    //  3.请求推荐数据
    getRecommend().then(res => {
      // console.log(res);
      this.recommends = res.data.list
    })

    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // 加一个最大值就不用了做两次判断
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    })
  },
  updated() {
  },

  //混入对象,mixins的使用
  mixins: [itemListenerMixin,backTopMixin],


  // mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh,500)
    //
    // this.itemImgListener = () => {
    //   refresh()
    // }
    // this.$bus.$on('itemImageLoad', this.itemImgListener)
  // },

  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
#detail{
  overflow: hidden;
  position: relative;
  z-index: 11;
  background-color: #fff;
  height: 100vh;
}
.detail-nav{
  position: relative;
  z-index: 12;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
}
</style>
