<script setup>
// import TweenLite from "gsap/TweenLite";
import { ElButton } from "element-plus";
import { TweenLite, Linear } from "gsap/TweenMax";
import { nextTick, ref } from "vue";
var tweenLite = null;
nextTick(() => {
  let logo = document.getElementById("to");
  tweenLite = TweenLite.to(logo, 10, {
    css: {
      left: "610px",
      backgroundColor: "black",
      borderBottomColor: "#90e500",
    },
    // 延迟
    delay: 0,
    // paused: true, // 覆盖上面的delay
    // repeat: -1, // 无效
    // yoyo: true, // 无效
    ease: Linear.easeIn,
  });
  // tweenLite.value.delay(5); // 覆盖上面的delay
  // tweenLite.value.duration(10); // 覆盖上面的duration
});

const restart = () => {
  // 参数意思：考虑delay属性
  tweenLite.restart(true, false);
};
const reverse = () => {
  tweenLite.reverse(0);
};
</script>

<template>
  <div id="demo">
    <div id="to">
      <span>TweenLite.to</span>
    </div>
    <div>
      <el-button type="primary" @click="restart">restart</el-button>
      <el-button type="primary" @click="reverse">reverse</el-button>
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
