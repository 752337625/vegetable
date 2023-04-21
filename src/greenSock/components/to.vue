<script lang="ts" setup>
import { ElButton } from "element-plus";
import { gsap } from "gsap";
import { nextTick, ref } from "vue";
var tweenLite: any = null;
nextTick(() => {
  let logo = document.getElementById("to");
  tweenLite = gsap.to(logo, {
    css: {
      left: "610px",
      backgroundColor: "black",
      borderBottomColor: "#90e500",
    },
    duration: 5,
    delay: 1,
    repeat: -1,
    yoyo: true,
    reversed: false, //不要设置为true，否则会一直停在开始
    ease: "Power0.easeIn",
  });
});
</script>

<template>
  <div id="demo">
    <div id="to">
      <span>gsap.to</span>
      <span>duration: 5</span>
      <span>delay: 1</span>
      <span>repeat: -1</span>
      <span>yoyo: true</span>
      <span>ease: "Power0.easeIn"</span>
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
#to {
  span {
    display: block;
    margin: 0;
    padding-bottom: 2px;
  }
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
