<script lang="ts" setup>
import { gsap } from "gsap";
import { nextTick } from "vue";
nextTick(() => {
  let logo = document.getElementById("from");
  gsap.from(logo, {
    css: {
      rotation: -360,
      x: "610px",
      backgroundColor: "black",
      borderBottomColor: "#90e500",
    },
    duration: 5, // 动画执行时间
    delay: 1, // 动画延迟执行时间
    repeat: -1, // 动画循环次数
    repeatDelay: 1,
    yoyo: true, // 动画循环模式
    yoyoEase: "strong.inOut", // 反向动画
    reversed: false, //不要设置为true，否则会一直停在开始
    ease: "elastic", //yoyoEase不存在正向或者反向动画，yoyoEase存在只能表示正向动画
  });
});
</script>

<template>
  <div id="demo">
    <div id="from">
      <span>gsap.from</span>
      <span>duration: 5</span>
      <span>delay: 1</span>
      <span>repeat: -1</span>
      <span>yoyo: true</span>
      <span>ease: "elastic"</span>
      <span>reversed: false,</span>
    </div>
  </div>
</template>
<style lang="less" scoped>
#demo {
  height: 150px;
  background-color: #333;
  padding: 8px;
  margin-bottom: 25px;
}
#from {
  span {
    display: block;
    margin: 0;
    padding-bottom: 2px;
  }
  border-radius: 30px;
  text-align: left;
  font-size: 12px;
  text-align: center;
  position: relative;
  width: 150px;
  height: calc(100% - 16px);
  background-color: #90e500;
  border-bottom: solid #000 10px;
  margin-bottom: 5px;
  color: #fff;
}
</style>
