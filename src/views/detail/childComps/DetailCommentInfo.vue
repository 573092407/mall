<template>
<!--  评论信息  -->
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="heider-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>

    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt="">
      <span>{{commentInfo.user.uname}}</span>
    </div>

    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="data">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>

      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in commentInfo.images" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from "@/common/utils";

export default {
  name: "DetailCommentInfo",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
//  问题： 如何将时间戳转成事件格式化字符串(常用)
//  时间戳: 1535694719(秒)
//  1.将时间戳转成Date对象
//  const date = new Date(1535694719*1000)
//  2.将data进行格式化,转成对应的字符串
//  方法一：date.getYear() + data.getMonth() + 1
//  方法二: data -> FormatString(太常用)
//  *fmt.format(date, 'yyyy-MM-dd hh:mm:ss')
  filters: {
    showDate(value) {
      //1.先将时间戳转成Date对象
      const date = new Date(value * 1000)

      //2.将date进行格式化
      return formatDate(date, 'yyyy/MM/dd HH:mm:ss')
    }
  }
}
</script>

<style scoped>

</style>
