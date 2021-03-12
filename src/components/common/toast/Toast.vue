<template>
  <div v-show="isShow" class="toast">
    <div>{{isMessage}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // show: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      isMessage: '',
      isShow: false
    }
  },
  methods: {
    show(message,duration = 2000) {
      this.isShow = true;
      this.isMessage = message
      setTimeout(() =>{
        this.isShow = false;
        this.isMessage = ''
      },duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  width: 70%;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  padding: 8px 10px;
  z-index: 999;
  background-color: rgba(0,0,0,.6);
}
</style>
