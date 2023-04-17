<script lang="ts" setup>
// import TweenLite from "gsap/TweenLite";
import { TweenLite } from "gsap/TweenMax";
import { onMounted } from "vue";
onMounted(() => {
  let logo = document.getElementById("logo");
  TweenLite.to(logo, 2, {
    left: "542px",
    backgroundColor: "black",
    borderBottomColor: "#90e500",
    color: "white",
  });
});
</script>

<template>
  <div id="demo">
    <div id="logo">
      <p>GreenSock</p>
    </div>
    <div>
      <el-button>开始</el-button>
      <el-button>暂停</el-button>
    </div>
  </div>
</template>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#demo {
  height: 150px;
  background-color: #333;
  padding: 8px;
}
#logo {
  text-align: center;
  position: relative;
  width: 150px;
  height: 100%;
  background-color: #90e500;
  border-bottom: solid #000 10px;
}
#logo p {
  font-size: 17px;
}
</style>
