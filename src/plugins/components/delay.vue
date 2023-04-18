<script setup>
// import TweenLite from "gsap/TweenLite";
import { ElButton } from "element-plus";
import { TweenLite, Linear } from "gsap/TweenMax";
import { nextTick } from "vue";
var tweenLite = null;
nextTick(() => {
  let logo = document.getElementById("delay");
  tweenLite = TweenLite.to(logo, 10, {
    css: {
      left: "610px",
      backgroundColor: "black",
      borderBottomColor: "#90e500",
    },
    delay: 0,
    ease: Linear.easeIn,
  });
});

const restart = () => {
  // 参数意思：考虑delay属性
  if (tweenLite.isActive()) return;
  tweenLite.restart(true, false);
};
const reverse = () => {
  if (tweenLite.isActive()) return;
  tweenLite.reverse();
};
const delay = (num = 5) => {
  if (tweenLite.isActive()) return;
  tweenLite.delay(num);
  tweenLite.restart(true, false);
};
</script>

<template>
  <div id="demo">
    <div id="delay">
      <span>TweenLite.delay</span>
    </div>
    <div>
      <el-button type="primary" @click="restart">restart</el-button>
      <el-button type="primary" @click="reverse">reverse</el-button>
      <el-button type="primary" @click="delay(5)">delay(5)</el-button>
      <el-button type="primary" @click="delay(0)">delay(0)</el-button>
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
#delay {
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
