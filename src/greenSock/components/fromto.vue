<script lang="ts" setup>
import { gsap } from "gsap";
import { nextTick } from "vue";
nextTick(() => {
  let logo = document.getElementById("fromTo");
  gsap.fromTo(
    logo,
    10,
    {
      css: {
        left: "-75px",
        backgroundColor: "#90e500",
        borderBottomColor: "#000",
      },
      duration: 5, // 动画执行时间
      delay: 0, // 动画延迟执行时间
      repeat: -1, // 动画循环次数
      repeatDelay: 0,
      yoyo: true, // 动画循环模式
      yoyoEase: "strong.inOut", // 反向动画
      reversed: false, //不要设置为true，否则会一直停在开始
      ease: "Bounce.easeIn",
    },
    {
      css: {
        left: "610px",
        backgroundColor: "black",
        borderBottomColor: "#90e500",
      },
      duration: 5, // 动画执行时间
      delay: 0, // 动画延迟执行时间
      repeat: -1, // 动画循环次数
      repeatDelay: 0,
      yoyo: true, // 动画循环模式
      yoyoEase: "strong.inOut", // 反向动画
      reversed: false, //不要设置为true，否则会一直停在开始
      ease: "Circ.easeInOut",
    }
  );
});
</script>

<template>
  <div id="demo">
    <div id="fromTo">
      <span>TweenLite.fromTo</span>
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
#fromTo {
  border-radius: 30px;
  font-size: 18px;
  text-align: center;
  position: relative;
  width: 150px;
  height: calc(100% - 16px);
  background-color: #90e500;
  border-bottom: solid #000 10px;
  line-height: 130px;
  margin-bottom: 5px;
  color: #fff;
}
</style>
