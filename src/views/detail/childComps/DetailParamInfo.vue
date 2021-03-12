<template>
<!--  商品详细参数  -->
  <div class="param-info" v-if="Object.keys(paramInfo).length !== 0">
    <table v-for="(table, index) in paramInfo.sizes"
           class="info-size" :key="index">
      <tr v-for="(tr, indey) in table" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{td}}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr v-for="(info, index) in paramInfo.infos" :key="index">
        <td class="info-param-key">{{info.key}}</td>
        <td class="param-value">{{info.value}}</td>
      </tr>
    </table>
    <div class="info-img" v-if="paramInfo.image.length !== 0">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.info-size{
  border: 1px solid rgba(0,0,0,.1);
  width: 100%;
  margin-bottom: 48px;
}
.info-size td {
  text-align: center;
  border-bottom: 1px solid rgba(0,0,0,.1);
}
.param-info {
  height: 440px;
  padding:  20px 15px;
}
.info-param {
  /*border: 1px solid rgba(0,0,0,.1);*/
}
.info-param-key {
  text-align: center;
  width: 50px;
  margin-right: 0px;
  line-height: 20px;
  border-bottom: 1px solid rgba(0,0,0,.1);
  /*border-right: 0px;*/
}
.param-value {
  font-size: 5px;
  text-align: center;
  padding-left: 0px;
  line-height: 15px;
  border-bottom: 1px solid rgba(0,0,0,.1);
  /*border-left: 0px;*/
  color: deeppink;
}
</style>
