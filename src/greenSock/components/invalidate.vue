<script  lang="ts" setup>
import { ElButton } from "element-plus";
import { gsap } from "gsap";
import { nextTick } from "vue";
var tweenLite: any = null;
nextTick(() => {
  let logo = document.getElementById("invalidate");
  tweenLite = gsap.to(logo, 2, {
    css: {
      left: "+=100",
      backgroundColor: "black",
      borderBottomColor: "#90e500",
    },
    delay: 0,
    ease: "Power4.easeInOut",
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
const invalidate = () => {
  if (tweenLite.isActive()) return;
  tweenLite.invalidate();
  tweenLite.restart();
};
</script>

<template>
  <span class="title">不恢复到任何以前记录的开始值的情况下重新启动动画</span>
  <div id="demo">
    <div id="invalidate">
      <span>TweenLite.to</span>
    </div>
    <div>
      <el-button type="primary" @click="restart">restart</el-button>
      <el-button type="primary" @click="reverse">reverse</el-button>
      <el-button type="primary" @click="invalidate">invalidate</el-button>
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
#invalidate {
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
