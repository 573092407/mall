<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div> </nav-bar>
    <tab-control ref="tabControl1"
                 :titles="['流行','新款','精选']"
                 @tabClick="tabClick"
                 class="tab-control"
                 v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">

      <swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control ref="tabControl2"
                   :titles="['流行','新款','精选']"
                   @tabClick="tabClick"/>
      <goods-list :goods="showGoods"/>
    </scroll>

<!--    修饰.native修饰什么时候使用？
          * 在我们需要监听一个组件的原生事件时，必须给对应的事件
          加上.native修饰符，才能进行监听
 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import Swiper from "./childComps/Swiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "@/components/common/navbar/NavBar";
  import TabControl from "@/components/content/tabControl/TabControl";
  import GoodsList from "@/components/content/goods/GoodsList";
  import Scroll from "@/components/common/scroll/Scroll";
  import BackTop from "@/components/content/backTop/BackTop";

  import { getHomeMultidata, getHomeGoods } from "@/network/home";
  // import { debounce } from "@/common/utils";
  import {itemListenerMixin} from "@/common/mixin";

  export default {
    name: "Home",
    components: {
      BackTop,
      Scroll,
      GoodsList,
      Swiper,
      RecommendView,
      FeatureView,
      NavBar,
      TabControl
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        // itemImgListener: null
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 1.保存Y值
      this.saveY = this.$refs.scroll.getScrollY()

      // 2.取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()

        //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },

    //混入对象,mixins的使用
    mixins: [itemListenerMixin],
    // mounted() {
    //   //1.图片加载完成的监听事件
    //   const refresh = debounce(this.$refs.scroll.refresh,500)
    //
    //   // 对监听的事件进行保存
    //   this.itemImgListener = () => {
    //     refresh()
    //   }
    //
    //   this.$bus.$on('itemImageLoad', this.itemImgListener)
    //
    //   // 2.获取tabControl的offsetTop
    //   // 所有的组件都有一个属性$el: 用于获取组件中的元素
    //   // this.tabOffsetTop =
    //   // console.log(this.$refs.tabControl.$el.offsetTop);
    // },
    methods: {
      /**
       * 事件监听
       */
      //防抖动函数
      // debounce(func,delay) {
      //   let timer = null
      //   return function (...args) {
      //     if (timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       func.apply(this,args)
      //     },delay)
      //   }
      // },
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
                break
          case 1:
            this.currentType = 'new'
                break
          case 2:
            this.currentType = 'sell'
                break
        }
        //
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        this.$refs.scroll.scrollTo(0,0)
      },
      contentScroll(position) {
        //1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) >this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /**
       *网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /*padding-top: 44px;*/
    /*vh -> viewport height*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: deeppink;
    color: #f6f6f6;

    /*在使用浏览器原生滚动时，为了让导航不跟随一起滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  /*.tab-control {*/
  /*  !*停留样式*!*/
  /*  position: sticky;*/
  /*  top: 44px;*/
  /*  !*z-index数值大的可以堆叠在最上面*!*/
  /*  z-index: 9;*/
  /*}*/

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
  /*.content {*/
  /*  !*滚动范围等于百分百减去购物栏和底部栏的高度*!*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
