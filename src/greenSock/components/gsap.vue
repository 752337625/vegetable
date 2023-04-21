<script setup>
import To from "./to.vue";
// import From from "./from.vue";
// import FromTo from "./fromto.vue";
// import Invalidate from "./invalidate.vue";
// import Delay from "./delay.vue";
// import Kill from "./kill.vue";
// import Option from "./option.vue";
let props = defineProps({
  componentId: String,
});
</script>

<template>
  <To v-if="componentId === 'to'"></To>
  <!-- <Delay></Delay> -->
  <!-- <From></From>
  <FromTo></FromTo>
  <Invalidate></Invalidate>
  <Kill></Kill>
  <Option></Option> -->
</template>
<style lang="less" scoped></style>
