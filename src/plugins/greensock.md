---
prev: false
next: false
category:
  - Plugins
tag:
  - Greensock
---

# V2-Greensock 如此简单

啥也不说先上官网：[v2-Greensock](https://greensock.com/docs/v2)

<!-- more -->

## GreenSock 动画平台文件组成

![GreenSock](./img/greensock.jpg)

## GreenSock 动画平台文件组成说明（大概印象）

### 工具（核心工具+其他工具=8 款）

- 核心工具 4 款

  - TweenLite
  - TweenMax
  - TimelineLite
  - TimelineMax

- 其他工具 4 款
  - VelocityTracker
  - Draggable
  - SplitText（按照官网解释也属于插件）
  - GSDevTools（按照官网解释也属于插件）

### 插件（基础插件+拓展插件+商业插件=20 款）

- AttrPlugin
- BezierPlugin
- CSSPlugin
- DirectionalRotationPlugin
- RoundPropsPlugin
- ColorPropsPlugin
- CSSRulePlugin
- EaselPlugin
- ModifiersPlugin
- MorphSVGPlugin
- PixiPlugin
- ScrollToPlugin
- TextPlugin
- 商业
  - DrawSVGPlugin
  - Physics2DPlugin
  - PhysicsPropsPlugin
  - ScrambleTextPlugin
  - RaphaelPlugin
  - SplitText
  - GSDevTools
  - ThrowPropsPlugin
  - TweenPlugin

### 时间轴（核心时间轴+拓展时间轴=26 款）

- 核心时间轴

  - Linear
  - Power0
  - Power1
  - Power2
  - Power3
  - Power4
  - Quad
  - Quart
  - Quint
  - Strong

- 拓展时间轴

  - Back
  - Bounce
  - Circ
  - Elastic
  - Expo
  - ExpoScaleEase
  - Sine
  - SlowMo
  - SteppedEase
  - Ease
  - EaseLookup
  - RoughEase

- 弃用

  - Cubic [自 GSAP 2.0.0 起已弃用；改为使用 Power2，它是相同的]

- 待考察

  - CustomBounce
  - CustomWiggle
  - CustomEase

## Usage

### Install（npm\pnpm）

```sh:no-line-numbers
pnpm add gsap

npm install gsap
```

### Import

最佳导出使用方式

TweenMax 包括 TweenSite、TimelineLite、TimelineMax、CSSPlugin、RoundPropsPlugin、BezierPlugin、DirectionalRotationPlugin、AttrPlugin，以及除 CustomEase、CustomWiggle 和 CustomBounce 之外的 All Eases ）

```js:no-line-numbers
import { TweenMax, TimelineLite, Power2, Elastic, CSSPlugin } from "gsap/TweenMax";
```

## TweenLite

<ClientOnly>
  <TweenLite></TweenLite>
</ClientOnly>
