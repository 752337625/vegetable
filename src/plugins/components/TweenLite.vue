<script setup>
// import TweenLite from "gsap/TweenLite";
import { ElButton } from "element-plus";
import { TweenLite, Linear, Elastic } from "gsap/TweenMax";
import { nextTick, ref } from "vue";
const tweenLite = ref();
nextTick(() => {
  let logo = document.getElementById("logo");
  tweenLite.value = new TweenLite(logo, 2, {
    css: {
      left: "542px",
      backgroundColor: "black",
      borderBottomColor: "#90e500",
      color: "white",
    },
    // 延迟
    delay: 2,
    // paused: true,
    repeat: -1, // 无效
    yoyo: true, // 无效
    ease: Elastic.easeIn,
  });
});

const restart = () => {
  // 参数意思：考虑delay属性
  tweenLite.value.restart(true, false);
};
const reverse = () => {
  tweenLite.value.reverse(0);
};
</script>

<template>
  <div id="demo">
    <div id="logo">
      <span>GreenSock</span>
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
}
#logo {
  text-align: center;
  position: relative;
  width: 150px;
  height: calc(100% - 16px);
  background-color: #90e500;
  border-bottom: solid #000 10px;
}
#logo {
  font-size: 17px;
}
</style>
