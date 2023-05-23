<script lang="ts" setup>
import { ElButton } from "element-plus";
import { gsap } from "gsap";
import { nextTick } from "vue";
var tweenLite: any = null;
nextTick(() => {
  let logo = document.getElementById("delay");
  tweenLite = gsap.to(logo, {
    css: {
      left: "610px",
      backgroundColor: "black",
      borderBottomColor: "#90e500",
    },
    duration: 10,
    delay: 5,
    repeat: -1, // 无效
    yoyo: true, // 无效
    ease: "Power0.easeIn",
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
      <span>delay：5</span>
    </div>
    <!-- <div>
      <el-button type="primary" @click="restart">restart</el-button>
      <el-button type="primary" @click="reverse">reverse</el-button>
      <el-button type="primary" @click="delay(5)">delay(5)</el-button>
      <el-button type="primary" @click="delay(0)">delay(0)</el-button>
    </div> -->
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
