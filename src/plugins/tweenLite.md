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

- TweenLite.delay( value:Number)：设置获取延迟时间 （获取：delay，一个值）
- TweenLite.duration()：设置获取动画时长（获取：duration，一个值）
- TweenLite.totalDuration(value:Number)：设置获取动画时长 （获取：duration，一个值）
- TweenLite.endTime()：略，不好解释看官网
- TweenLite.startTime()：略，不好解释看官网
- TweenLite.isActive()：Boolean：动画执行状态完成 false，进行中 true
- TweenLite.pausedvalue:Boolean ()：Boolean：获取是否暂停或者 sets paused state to true (just like pause())
- TweenLite.reversed(value:Boolean )：Boolean：获取动画方向或者 sets the orientation to reversed
- TweenLite.progress()：(value:Number, suppressEvents:Boolean)：设置获取动画进度 （min：0，max：100，一个过程）
- TweenLite.totalProgress(value:Number, suppressEvents:Boolean)：设置获取动画进度 （min：0，max：100，一个过程）
- TweenLite.totalTime(time:Number, suppressEvents:Boolean)： 获取运行时长(duration 范围内)或者 sets total time, jumping to new value just like seek(). （min：0，max：duration，一个过程）
- TweenLite.time(time:Number, suppressEvents:Boolean)：获取运行时长(duration 范围内)或者 sets total time, jumping to new value just like seek(). （min：0，max：duration，一个过程）

## TweenLite 案例

<ClientOnly>
  <TweenLite></TweenLite>
</ClientOnly>

## TweenLite.to

```vue:no-line-numbers
<!-- @include: ./components/to.vue -->
```

## TweenLite.from

```vue:no-line-numbers
<!-- @include: ./components/from.vue -->
```

## TweenLite.fromTo

```vue:no-line-numbers
<!-- @include: ./components/fromTo.vue -->
```

## TweenLite.invalidate

```vue:no-line-numbers
<!-- @include: ./components/invalidate.vue -->
```

## TweenLite.delay

```vue:no-line-numbers
<!-- @include: ./components/delay.vue -->
```

## TweenLite 基本属性和函数（option）

```vue:no-line-numbers
<!-- @include: ./components/option.vue -->
```
