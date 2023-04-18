<script setup>
// import TweenLite from "gsap/TweenLite";
import { ElButton } from "element-plus";
import { TweenLite, Linear } from "gsap/umd/TweenMax";
import { nextTick, ref } from "vue";
var tweenLite = null;
let endTime = ref(0);
let startTime = ref(0);
let totalDuration = ref(0);
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
    repeat: -1, // 无效
    yoyo: true, // 无效
    ease: Linear.easeIn,
    onUpdate: () => {
      totalDuration.value = tweenLite.totalDuration();
      startTime.value = tweenLite.startTime().toFixed(5);
      endTime.value = tweenLite.endTime().toFixed(5);
    },
  });
  // tweenLite.value.delay(5); // 覆盖上面的delay
  // tweenLite.value.duration(10); // 覆盖上面的duration
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
</script>

<template>
  <div id="demo">
    <div id="to">
      <span>TweenLite.to</span>
      <br />
      <span>totalDuration：{{ totalDuration }}</span>
      <br />
      <span>startTime：{{ startTime }}</span>
      <br />
      <span>endTime：{{ endTime }}</span>
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
  font-size: 12px;
  text-align: center;
  position: relative;
  width: 150px;
  height: calc(100% - 16px);
  background-color: #90e500;
  border-bottom: solid #000 10px;
  line-height: 30px;
  margin-bottom: 5px;
  color: #fff;
}
</style>
