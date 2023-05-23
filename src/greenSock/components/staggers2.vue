<script lang="ts" setup>
import { gsap } from "gsap";
import { nextTick } from "vue";
nextTick(() => {
  gsap.to(".box1", 1, {
    scale: 0,
    y: 0,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut",
    delay: 0,
    stagger: {
      each: 0.1,
      from: "end",
    },
  });
});
</script>

<template>
  <div id="demo">
    <div class="box1 green" v-for="item in 50" :key="item"></div>
  </div>
</template>
<style lang="less" scoped>
#demo {
  display: flex;
}
.box1 {
  width: 10px;
  height: 90px;
}
.green {
  background-color: green;
}
</style>
