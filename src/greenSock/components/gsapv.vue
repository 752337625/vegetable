<script setup>
import To from "./to.vue";
import From from "./from.vue";
import FromTo from "./fromto.vue";
import Set from "./set.vue";
import Staggers from "./staggers.vue";
import Staggers1 from "./staggers1.vue";
import Staggers2 from "./staggers2.vue";

let props = defineProps({
  componentId: String,
});
</script>

<template>
  <To v-if="componentId === 'To'"></To>
  <From v-if="componentId === 'From'"></From>
  <FromTo v-if="componentId === 'FromTo'"></FromTo>
  <Set v-if="componentId === 'Set'"></Set>
  <Staggers v-if="componentId === 'Staggers'"></Staggers>
  <Staggers1 v-if="componentId === 'Staggers1'"></Staggers1>
  <Staggers2 v-if="componentId === 'Staggers2'"></Staggers2>
  <!-- <Delay></Delay> -->
  <!-- 
  <Invalidate></Invalidate>
  <Kill></Kill>
  <Option></Option> -->
</template>
<style lang="less" scoped></style>
