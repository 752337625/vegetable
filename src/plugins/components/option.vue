<script setup>
// import TweenLite from "gsap/TweenLite";
import { ElButton } from "element-plus";
import { TweenLite } from "gsap/TweenMax";
import { nextTick, ref } from "vue";
var tweenLite = null;
// let startTime = ref(0);
let time = ref(0);
let totalDuration = ref(0);
let progressDuration = ref(0);
let totalTime = ref(0);
nextTick(() => {
  let logo = document.getElementById("play");
  tweenLite = TweenLite.to(logo, 20, {
    css: {
      left: "610px",
      backgroundColor: "black",
      borderBottomColor: "#90e500",
    },
    delay: 0,
    paused: true,
    ease: 'Power0.easeIn',
    onUpdate: () => {
      // startTime.value = tweenLite.startTime().toFixed();
      time.value = tweenLite.time().toFixed();
      totalDuration.value = tweenLite.totalDuration();
      progressDuration.value = tweenLite.totalProgress().toFixed(5);
      totalTime.value = tweenLite.totalTime().toFixed(5);
    },
  });
});
// TweenLite.delayedCall(1, myFunction, ["param1", 2]);
// function myFunction(param1, param2) {
//   console.log(param1, param2);
//   //do stuff
// }
const restart = () => {
  // 参数意思：考虑delay属性
  if (tweenLite.isActive()) return;
  tweenLite.restart();
};
const reverse = () => {
  if (tweenLite.isActive()) return;
  tweenLite.reverse();
};
const pause = () => {
  if (!tweenLite.isActive()) return;
  tweenLite.pause();
};
const play = () => {
  if (!tweenLite.paused()) return;
  tweenLite.play();
};
const resume = () => {
  tweenLite.resume();
};
const seek = () => {
  tweenLite.seek(20);
};
const progress = () => {
  tweenLite.progress(0.5);
};
</script>

<template>
  <span class="title">seek函数会影响状态(时间,进度)</span>
  <div id="demo">
    <div id="play">
      <span>TweenLite函数</span><br />
      <span>进行时长：{{ time }}</span>
      <br />
      <span>totalDuration：{{ totalDuration }}</span>
      <br />
      <span>progressDuration：{{ progressDuration }}</span>
      <br />
      <span>totalTime：{{ totalTime }}</span>
    </div>
    <div>
      <el-button type="primary" @click="restart">restart</el-button>
      <el-button type="primary" @click="pause">pause</el-button>
      <el-button type="primary" @click="play">play</el-button>
      <el-button type="primary" @click="resume">resume</el-button>
      <el-button type="primary" @click="reverse">reverse</el-button>
      <el-button type="primary" @click="seek">seek(20)</el-button>
      <el-button type="primary" @click="progress">progress(0.5)</el-button>
    </div>
  </div>
</template>
<style lang="less" scoped>
.title {
  display: inline-block;
  margin: 10px 0;
}
#demo {
  height: 150px;
  background-color: #333;
  padding: 8px;
  margin-bottom: 25px;
}
#play {
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
