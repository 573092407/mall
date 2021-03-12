<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsListItem from "@/components/content/goods/GoodsListItem";
  export default {
    name: "GoodsList",
    components: {
      GoodsListItem
    },
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
 .goods{
   /*水平布局*/
   display: flex;
   /*包裹*/
   flex-wrap: wrap;
   /*均等分*/
   justify-content: space-around;
   padding: 10px;
 }


</style>
