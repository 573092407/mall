<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button @click.native="checkClick"
                    :is-checked="isSelectAll"
                    class="check-button"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计: {{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算 ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "@/components/content/checkButton/CheckButton";
import { mapGetters } from 'vuex'
export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      // 过滤器的使用
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },

    checkLength() {
      // return this.cartList.filter(item => item.checked).count
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count
      }, 0)
    },

    // 判断是否全部选中
    isSelectAll() {
      if(this.cartList.length === 0 ) return false

      //1.普通的遍历
      for (let item of this.cartList) {
        if(!item.checked) {
          return false
        }
      }
      return true
      //2.数组的高阶函数
      // return !(this.cartList.filter(item => !item.checked).length)
      // return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      // 如果原来都是选中，点击一次全部不选中
      // 如果原来都是不选中(某些不选中)，点击一次全选中
      if (this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择需要购买的商品')
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 40px;
    background-color: lightpink;
    position: relative;
    line-height: 40px;
    font-size: 15px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 30px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    background-color: deeppink;
    text-align: center;
  }
</style>
