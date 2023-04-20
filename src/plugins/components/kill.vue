<script setup>
// import  {TweenLite} from "gsap/all";
import { ElButton } from "element-plus";
import { TweenLite } from "gsap/TweenMax";
import { nextTick } from "vue";

var tweenLite = null;
nextTick(() => {
  let logo = document.getElementById("kill");
  tweenLite = TweenLite.to(logo, 10, {
    css: {
      left: "610px",
      backgroundColor: "black",
      borderBottomColor: "#90e500",
    },
    delay: 0,
    ease: "Power0.easeIn",
  });
});

const restart = () => {
  // 参数意思：考虑delay属性
  if (tweenLite.isActive()) return;
  tweenLite.restart();
};
const reverse = () => {
  if (tweenLite.isActive()) return;
  tweenLite.reverse();
};
const kill = (properties) => {
  if (properties) {
    tweenLite.kill({ left: true });
  } else {
    tweenLite.kill();
  }
};
</script>

<template>
  <span class="title"
    >杀死动画（并不是删除属性）或者删除动画的指定财产(注意：删除指定财产后该属性就会消失，即使调用restart也无济于事。)</span
  >
  <div id="demo">
    <div id="kill">
      <span>TweenLite.kill</span>
    </div>
    <div>
      <el-button type="primary" @click="restart">restart</el-button>
      <el-button type="primary" @click="reverse">reverse</el-button>
      <el-button type="primary" @click="kill()">kill</el-button>
      <el-button type="primary" @click="kill('left')">kill('left')</el-button>
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
#kill {
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
