---
article: false
prev: false
next: ./gsap2
category:
  - Plugins
tag:
  - GreenSock
---

# V3-Greensock 如此简单[1]

啥也不说先上官网：[v2-Greensock](https://greensock.com/docs/v3)

<!-- more -->

## GreenSock 动画平台文件组成

![GreenSock](./img/greensock.jpg)

## GreenSock 动画平台文件组成说明（大概印象）

### 核心工具（8 款）

GSAP(including Tween、 Timeline、Utility Methods(17) and Core Plugins(5) )

### 插件（核心插件+拓展插件+商业插件=24 款）

- 核心插件(5 款)

  - AttrPlugin
  - CSSPlugin
  - EndArrayPlugin
  - ModifiersPlugin
  - SnapPlugin

- 拓展插件(9 款)

  - Draggable
  - EaselPlugin
  - Flip
  - MotionPathPlugin
  - Observer
  - PixiPlugin
  - ScrollToPlugin
  - ScrollTrigger
  - TextPlugin

- 商业插件(10 款)（官网将俩个 Ease 归结于插件，这里不包含）

  - DrawSVGPlugin
  - Physics2DPlugin
  - PhysicsPropsPlugin
  - ScrambleTextPlugin
  - InertiaPlugin
  - MorphSVGPlugin
  - MotionPathHelper
  - ScrollSmoother
  - SplitText
  - GSDevTools

### Ease（基础 Ease+拓展 Ease= 18 款）

- 基础 Ease

  - Power0 (a.k.a. "Linear")
  - Power1 (a.k.a. "Quad")
  - Power2 (a.k.a. "Cubic")
  - Power3 (a.k.a. "Quart")
  - Power4 (a.k.a. "Strong" or "Quint")
  - Back
  - Bounce
  - Circ
  - Elastic
  - Expo
  - Sine

**注意：在 GreenSock 2.0 后，Power0 取代了 Linear，Power1 取代了 Quad，Power2 取代了 Cubic，Power3 取代了 Quart，Power4 取代了 Quint/Strong。**

- 拓展 Ease=商业+Ease

  - RoughEase
  - SlowMo
  - ExpoScaleEase
  - SteppedEase
  - CustomEase
  - CustomBounce(商业 Eases)
  - CustomWiggle(商业 Eases)

- 弃用

  - Cubic [自 GSAP 2.0.0 起已弃用；改为使用 Power2，它是相同的]

### 工具函数(17 款)

- checkPrefix（）//获取属性的相关浏览器前缀
- clamp（）//将值箝位到范围
- distribute（）//在和数组之间分配值
- getUnit（）//获取字符串的单位
- interpolate（）//在值之间进行插值
- mapRange（）//将一个范围映射到另一个范围
- normalize（）//将范围映射到 0-1 范围
- pipe（）//序列函数调用
- random（）//生成一个随机值
- selector（）//获取一个作用域选择器函数
- shuffle（）//将数组打乱到位
- snap（）//将值捕捉到增量或数组
- splitColor（）//将颜色拆分为 RGB 数组
- toArray（）//将类似数组的东西转换为数组
- unitize（）//将指定的单位添加到函数结果中
- wrap（）//将数字放在范围内，换行开始
- wrapYoyo（）//将数字放在范围内，反向换行

```js:no-line-numbers
gsap.utils.clamp(0, 100, 105); // returns 100
gsap.utils.checkPrefix("filter");
```

## Usage

### Install（npm\pnpm）

```sh:no-line-numbers

pnpm add gsap

pnpm add -D @types/gsap

npm install gsap

npm install -D @types/gsap

```

### Import

- 最佳导出使用方式

```js:no-line-numbers
import { gsap } from "gsap";
import { PixiPlugin } from "gsap/PixiPlugin.js";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";

//without this line, PixiPlugin and MotionPathPlugin may get dropped by your bundler (tree shaking)...
gsap.registerPlugin(PixiPlugin, MotionPathPlugin);
```

- 如果使用服务器端渲染，则可能需要在配置设置（如 nuxt.config）中将 GSAP 添加到 transfile 属性中：

```js:no-line-numbers
build: {
   transpile: ['gsap'],
},
```

- 如果使用服务器端渲染，您可能还需要检查进程是在服务器上还是在客户端上：

```js:no-line-numbers
import { gsap } from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

if (process.client) {
  gsap.registerPlugin(MorphSVGPlugin);
}
```

- 我需要为每个插件添加 gsap.registerPlugin（）吗？

通常情况下，是的。如果您通过＜ script ＞标签（即不是构建工具）加载 GSAP，只要核心已经加载，GSAP 就会尝试自动注册插件，但我们仍然建议注册插件，这样构建工具就不会在树摇动时丢弃它们。

- Club Plugins

要访问 Club Plugins，请确保您已登录，然后下载文件并安装 gsap-banus.tgz 文件，而不是常规的 gsap 安装文件。

Club Plugins 仅适用于 Club GreenSock 会员，因此它们不在 CDN 上。您必须从（登录）帐户仪表板下载它们。

## 特殊属性

- target：目标 dom

- vars

  - **callbackScope: Object：我的理解提供给函数的作用域**
  - **delay: Number：动画开始前的延迟量（秒）**
  - **duration: Number：动画持续时间（秒）**
  - **ease: Ease (or Function or String)：你可以从各种 Easing 中进行选择，以控制动画过程中的变化率，给它一种特定的“感觉”。例如，Elastic.easeOut 或 Strong.easeInOut。为了获得最佳性能，使用 GreenSock 的其中一个简易程序（Linear、Power0、Power1、Power2、Power3、Power4、Quad、Cubic、Quart、Quint 和 Strong，每个程序都有.eseIn、.eseOut 和.eseInOut。当然你也可以使用它的扩展 Easing Elastic、Back、Bounce、SlowMo、SteppedEase、Rough、Circ、Expo 和 Sine）。通过名称（字符串）定义 Easing，如“Strong.eseOut”。默认值：“power1.out”。**
  - **id: 为 tween 实例分配一个唯一的标识符，以便 gsap.getById（）找到它.供其他使用**
  - immediateRender: Boolean：通常情况下，除非指定延迟，否则会等第一次渲染后，直到下一个刻度（更新周期）。将 immediateRender:true 设置为强制它在实例化时立即渲染。默认值：在 to（）函数为 false，对于 from（）和 fromTo（）函数为 true。
  - inherit: Boolean：不考虑
  - lazy: Boolean：官网：在大多数情况下，您不需要设置懒惰。官网有一个视频可以看看
  - **onComplete: Function：动画完成后触发**
  - **onCompleteParams: Array： 用于传递 onComplete 函数的参数数组。例如，`gsap.to(“.class”，｛x:100，onComplete:myFunction，onCompleteParams:[“param1”，“param2”]})；`。**
  - onInterrupt: Function：
  - onInterruptParams: Array：
  - onRepeat: Function：
  - onRepeatParams: Array：
  - onReverseComplete: Function：
  - onReverseCompleteParams: Array：
  - onStart: Function：
  - onStartParams: Array：
  - onUpdate: Function：
  - onUpdateParams: Array：
  - onUpdateScope: Object：
  - overwrite: String (or integer)：
  - **paused: Boolean：paused:布尔值-如果为 true，动画将在创建时立即暂停。等待示例函数手动触发。**
  - **repeat: Number：动画循环次数**
  - **repeatDelay: Number：动画循环延迟**
  - repeatRefresh
  - **reversed: Boolea：如果为 true，一直停在开始（如果为 true，动画开始时其播放头将反转，这意味着它将朝着开始方向移动。由于游戏头无论如何都是在 0 的时间开始的，因此反转的 tween 最初会显示为暂停，因为它的游戏头无法向后移动超过开始。）。如果为 false 任何意义**
  - runBackwards
  - stagger：如果提供了多个目标每个目标动画开始之间的时间（以秒为单位）（）
  - startAt
  - **yoyo: Boolea：动画循环模式 if repeat is 2 and yoyo is false, it will look like: start - 1 - 2 - 3 - 1 - 2 - 3 - 1 - 2 - 3 - end. But if yoyo is true, it will look like: start - 1 - 2 - 3 - 3 - 2 - 1 - 1 - 2 - 3 - end. Default: false.**
  - **yoyoEase： String：设置 yoyo 往返的动画模式，取值和 ease 类似**
  - keyframes: Boolean：

## 最常用的转换值

|            GSAP            |             CSS              |
| :------------------------: | :--------------------------: |
|           x: 100           | transform: translateX(100px) |
|           y: 100           | transform: translateY(100px) |
|       xPercent: -50        | transform: translateX(-50%)  |
|       yPercent: -50        | transform: translateY(-50%)  |
|       rotation: 360        |  transform: rotate(360deg)   |
|          scale: 2          |    transform: scale(2, 2)    |
| transformOrigin: "0% 100%" |  transform-origin: 0% 100%;  |
|       rotationX: 360       |  transform: rotateX(360deg)  |
|       rotationY: 360       |  transform: rotateY(360deg)  |
|         skewX: 45          |   transform: skewX(45deg)    |
|         skewY: 45          |   transform: skewY(45deg)    |
|         scaleX: 2          |     transform: scaleX(2)     |
|         scaleY: 2          |     transform: scaleY(2)     |

==默认情况下，GSAP 将使用 px 和度数进行转换，但您可以使用其他单位，如 vw、弧度，甚至可以自己进行 JS 计算或相对值！==

```js:no-line-numbers
x: 200, // use default of px
x: "+=200" // relative values
x: '40vw', // or pass in a string with a different unit for GSAP to parse
x: () => window.innerWidth / 2, // you can even use functional values to do a calculation!
rotation: 360 // use default of degrees
rotation: "1.25rad" // use radians
```

## CSS 属性

变换，颜色，填充，边界半径，GSAP 可以将其全部动画化！只需记住对财产进行 camelCase 即可，例如 background-color 变为 background color。

> 尽管 GSAP 可以为几乎所有 CSS 属性设置动画，但我们建议尽可能坚持变换和不透明度。类似 filter 和 boxShadow 的属性对于浏览器来说是 CPU 密集型的。

## SVG 属性

就像 HTML 元素一样，SVG 元素也可以通过转换快捷方式进行动画处理。此外，您可以使用 attr 对象为 SVG 属性设置动画，如宽度、高度、填充、笔划、cx、不透明度，甚至 SVG viewBox 本身。

## Staggers

非常伟大的动画交错属性，上官网[Staggers](https://greensock.com/docs/v3/Staggers)

### API Details

- Number (simple)

```js:no-line-numbers
gsap.to(".box", {
  y: 100,
  stagger: 0.1 // 0.1 seconds between when each ".box" element starts animating
});
```

- Object (advanced)

  - amount：[Number]：所有元素之间分配的总时间（以秒为单位）。如果 amount 是 1，并且有 100 个元素交错，那么每个元素的开始时间之间将有 0.01 秒。
  - each：[Number]：为每一个元素指定开始时间间隔。如果每个元素都是 1（无论元素有多少），那么每个子元素的开始时间之间就会有 1 秒。如果您更喜欢指定在交错中分配的总时间，请改用 amount 属性。
  - from ：[String|Integer|Array]：数组中产生交错的位置。例如，要从某个特定元素开始，请使用表示该元素在目标数组中的索引的数字。因此，from：4 在数组中的第 5 个元素处开始交错（因为数组使用基于零的索引）。每个元素的动画将根据元素与“阵列”中“from”值的接近程度开始（距离越近，开始的时间就越早）。您也可以使用以下字符串值： "start", "center", "edges", "random", or "end" ("random" was added in version 3.1.0)【“开始”、“中心”、“边缘”、“随机”或“结束”（“随机”在 3.1.0 版本中添加）】。如果您定义了网格，您可以指定指示每个轴上进度的十进制值，例如[0.5,0.5]将是中心，[1,0]将是右上角，等等。默认值：0。
  - grid：css 定义网格【略】
  - axis：基于网格的属性【略】
  - ease：[String|Function]：类似全局属性 ease

```js:no-line-numbers
gsap.to(".box", {
  y: 100,
  stagger: { // wrap advanced options in an object
    each: 0.1,
    from: "center",
    grid: "auto",
    ease: "power2.inOut",
    repeat: -1 // Repeats immediately, not waiting for the other staggered animations to finish
  }
});
```

- Function

## Timelines

当你将 tweens 添加到时间线上时，默认情况下，它们会按照添加的顺序依次播放。上官网[Timelines](https://greensock.com/get-started/#timelines)

```js:no-line-numbers
// create a timeline
let tl = gsap.timeline()

// add the tweens to the timeline - Note we're using tl.to not gsap.to
tl.to(".green", { x: 600, duration: 2 });
tl.to(".purple", { x: 600, duration: 1 });
tl.to(".orange", { x: 600, duration: 1 });
```
