<script  lang="ts" setup>
import { ElButton } from "element-plus";
import { gsap } from "gsap";
import { nextTick } from "vue";

var tweenLite: any = null;
nextTick(() => {
  let logo = document.getElementById("fromTo");
  tweenLite = gsap.fromTo(
    logo,
    10,
    {
      css: {
        left: "-75px",
        backgroundColor: "#90e500",
        borderBottomColor: "#000",
      },
      delay: 0,
      ease: "Bounce.easeIn",
    },
    {
      css: {
        left: "610px",
        backgroundColor: "black",
        borderBottomColor: "#90e500",
      },
      delay: 0,
      ease: "Circ.easeInOut",
    }
  );
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
    <div id="fromTo">
      <span>TweenLite.fromTo</span>
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
#fromTo {
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
