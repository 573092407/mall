<template>
  <div class="check-button">
    <img src="../../../assets/cart/cart.png" alt="" v-show="isChecked"/>
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
 .check-button {
   width: 20px;
   height: 20px;
   border-radius: 50%;
   border: 1px solid #aaa;
 }
 .check-button img {
   width: 20px;
   height: 20px;
   border-radius: 50%;
 }

 /*.check {*/
 /*  border-color: magenta;*/
 /*}*/
</style>
