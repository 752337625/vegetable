---
prev: false
next: falses
category:
  - Plugins
tag:
  - GreenSock
---

# TweenLite

## TweenLite 状态函数

- TweenLite.delay( value:Number)：设置获取延迟时间
- TweenLite.duration()：设置获取动画时长
- TweenLite.totalDuration(value:Number)：设置获取动画时长
- TweenLite.endTime()：略
- TweenLite.startTime()：略
- TweenLite.isActive()：Boolean：动画执行状态完成 false，进行中 true
- TweenLite.pausedvalue:Boolean ()：Boolean：获取是否暂停或者 sets paused state to true (just like pause())
- TweenLite.reversed(value:Boolean )：Boolean：获取动画方向或者 sets the orientation to reversed
- TweenLite.progress()：(value:Number, suppressEvents:Boolean)：设置获取动画进度
- TweenLite.totalProgress(value:Number, suppressEvents:Boolean)：设置获取动画进度
- TweenLite.totalTime(time:Number, suppressEvents:Boolean)： 获取运行时长(duration 范围内)或者 sets total time, jumping to new value just like seek().
- TweenLite.time(time:Number, suppressEvents:Boolean)：获取运行时长(duration 范围内)或者 sets total time, jumping to new value just like seek().

## TweenLite 案例

<ClientOnly>
  <TweenLite></TweenLite>
</ClientOnly>

## TweenLite.to

```vue:no-line-numbers
<script setup>
// import  {TweenLite} from "gsap/all";
import { ElButton } from "element-plus";
import { nextTick, ref } from "vue";
import { TweenLite  } from "gsap/umd/TweenMax"; 
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
    delay: 0,
    repeat: -1, // 无效
    yoyo: true, // 无效
    ease: "Power0.easeIn",
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


```

## TweenLite.from

```vue:no-line-numbers
<script setup>
// import  {TweenLite} from "gsap/all";
import { ElButton } from "element-plus";
import { nextTick } from "vue";
import { TweenLite  } from "gsap/umd/TweenMax"; 
var tweenLite = null;
nextTick(() => {
  let logo = document.getElementById("from");
  tweenLite = TweenLite.from(logo, 10, {
    css: {
      left: "610px",
      backgroundColor: "black",
      borderBottomColor: "#90e500",
    },
    // 延迟
    delay: 0,
    // paused: true, // 覆盖上面的delay
    // repeat: -1, // 无效
    // yoyo: true, // 无效
    ease: 'Power4.easeOut',
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
    <div id="from">
      <span>TweenLite.from</span>
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
#from {
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

```

## TweenLite.fromTo

```vue:no-line-numbers
<script setup>
import { ElButton } from "element-plus";
import { nextTick } from "vue";
import { TweenLite  } from "gsap/umd/TweenMax"; 
var tweenLite = null;
nextTick(() => {
  let logo = document.getElementById("fromTo");
  tweenLite = TweenLite.fromTo(
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


```

## TweenLite.invalidate

```vue:no-line-numbers
<script setup>
import { ElButton } from "element-plus";
import { nextTick } from "vue";
import { TweenLite  } from "gsap/umd/TweenMax"; 
var tweenLite = null;
nextTick(() => {
  let logo = document.getElementById("invalidate");
  tweenLite = TweenLite.to(logo, 2, {
    css: {
      left: "+=100",
      backgroundColor: "black",
      borderBottomColor: "#90e500",
    },
    delay: 0,
    ease: 'Power4.easeInOut',
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
```

## TweenLite.delay

```vue:no-line-numbers
<script setup>
import { ElButton } from "element-plus";
import { nextTick } from "vue";
import { TweenLite  } from "gsap/umd/TweenMax"; 
var tweenLite = null;
nextTick(() => {
  let logo = document.getElementById("delay");
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
      <span>TweenLite.delay</span>
    </div>
    <div>
      <el-button type="primary" @click="restart">restart</el-button>
      <el-button type="primary" @click="reverse">reverse</el-button>
      <el-button type="primary" @click="delay(5)">delay(5)</el-button>
      <el-button type="primary" @click="delay(0)">delay(0)</el-button>
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


```

## TweenLite 基本属性和函数（option）

```vue:no-line-numbers
<script setup>
// import  {TweenLite} from "gsap/all";
import { ElButton } from "element-plus";
import { nextTick, ref } from "vue";
import { TweenLite  } from "gsap/umd/TweenMax"; 
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


```
