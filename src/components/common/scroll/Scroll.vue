<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
      },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
    },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    // ref如果是绑定在组件中的,那么通过this.$refs.refname获取到的是一个组件对象
    // ref如果是绑定在元素中的,那么通过this.$refs.refname获取到的是一个元素对象
   // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper,{
      //false时，按钮可以点击，div不行，改成true都可以点击
      click: true,
      //监听滚动0,1,2,鼠标，3惯性滚动
      probeType: this.probeType,
      //监听滚到底部
      pullUpLoad: this.pullUpLoad
    })

    // 2.监听滚动的位置
    if(this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll',(position) => {
        // console.log(position);
        this.$emit('scroll',position)
      })
    }

    // 3.上拉加载更多(监听scroll滚动到底部)
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
}
</script>

<style scoped>

</style>
