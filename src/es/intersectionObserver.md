---
prev: ./module
next: ./getBoundingClientRect
category:
  - ECMAScript
tag:
  - ECMAScript
star: true
---

# IntersectionObserver

传统的实现方法是，监听到 scroll 事件后，调用目标元素（绿色方块）的 getBoundingClientRect()方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于 scroll 事件密集发生，计算量很大，容易造成性能问题。

IntersectionObserver API，可以自动“观察”元素是否可见，Chrome 51+ 已经支持。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做“交叉观察器”（intersection oberserver）。

<!-- more -->

## 简介

```js:no-line-numbers
var observer = new IntersectionObserver(callback, options);
observer.observe(target);
```

上面代码中，IntersectionObserver 是浏览器原生提供的构造函数，接受两个参数：callback 是可见性变化时的回调函数，option 是配置对象（该参数可选）。

IntersectionObserver()的返回值是一个观察器实例。实例的 observe()方法可以指定观察哪个 DOM 节点。

```js:no-line-numbers
// 开始观察
observer.observe(document.getElementById('example'));

// 停止观察
observer.unobserve(element);

// 关闭观察器
observer.disconnect();
```

上面代码中，observe()的参数是一个 DOM 节点对象。如果要观察多个节点，就要多次调用这个方法。

```js:no-line-numbers
observer.observe(elementA);
observer.observe(elementB);
```

**注意，IntersectionObserver API 是异步的，不随着目标元素的滚动同步触发。规格写明，IntersectionObserver 的实现，应该采用 requestIdleCallback()，即只有线程空闲下来，才会执行观察器。这意味着，这个观察器的优先级非常低，只在其他任务执行完，浏览器有了空闲才会执行。**

## IntersectionObserverEntry 对象

IntersectionObserverEntry 对象提供目标元素的信息，一共有六个属性。

```js:no-line-numbers
{
  time: 3893.92,
  rootBounds: ClientRect {
    bottom: 920,
    height: 1024,
    left: 0,
    right: 1024,
    top: 0,
    width: 920
  },
  boundingClientRect: ClientRect {
     // ...
  },
  intersectionRect: ClientRect {
    // ...
  },
  intersectionRatio: 0.54,
  target: element
}
```

每个属性的含义如下。

> - time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
> - target：被观察的目标元素，是一个 DOM 节点对象
> - rootBounds：容器元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有容器元素（即直接相对于视口滚动），则返回 null
> - boundingClientRect：目标元素的基本信息
> - intersectionRect：目标元素与视口（或容器元素）的交叉区域的信息
> - intersectionRatio：目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为 1，完全不可见时小于等于 0

::: center
![IntersectionObserverEntry](./img/IntersectionObserverEntry.png '这就是我' =550x544)
:::

上图中，灰色的水平方框代表视口，深红色的区域代表四个被观察的目标元素。它们各自的 intersectionRatio 图中都已经注明。

## callback 参数

callback 会触发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）。

```js:no-line-numbers
var observer = new IntersectionObserver(
  (entries, observer) => {
    console.log(entries);
  }
);
```

上面代码中，回调函数采用的是箭头函数的写法。callback 函数的参数（entries）是一个数组，每个成员都是一个 **IntersectionObserverEntry 对象**。举例来说，如果同时有两个被观察的对象的可见性发生变化，entries 数组就会有两个成员。

## Option 对象

### threshold 属性

threshold：可以是单一的 number 也可以是 number 数组，target 元素和 root 元素相交程度达到该值的时候 IntersectionObserver 注册的回调函数将会被执行。如果你只是想要探测当 target 元素的在 root 元素中的可见性超过 50%的时候，你可以指定该属性值为 0.5。如果你想要 target 元素在 root 元素的可见程度每多 25%就执行一次回调，那么你可以指定一个数组 [0, 0.25, 0.5, 0.75, 1]。默认值是 0 (意味着只要有一个 target 像素出现在 root 元素中，回调函数将会被执行)。该值为 1.0 含义是当 target 完全出现在 root 元素中时候 回调才会被执行。如果值为[0.3, 0.6]，则当元素进入 30％和 60％是触发回调函数。

### root 属性，rootMargin 属性

root：指定根(root)元素，用于检查目标的可见性。必须是目标元素的父级元素。如果未指定或者为 null，则默认为浏览器视窗 viewport。

rootMargin：该属性用来扩展或缩小 rootBounds 这个矩形的大小，从而影响 intersectionRect 交叉区域的大小。它的写法类似于 CSS 的 margin 属性，比如 0px 0px 0px 0px，依次表示 top、right、bottom 和 left 四个方向的值。

rootMargin: '0px 0px -200px 0px'

上例的 0px 0px -200px 0px，表示容器的下边缘向上收缩 200 像素，导致页面向下滚动时，目标元素的顶部进入可视区域 200 像素以后，才会触发回调函数。

## 实例

### 惰性加载（lazy load）

有时，我们希望某些静态资源（比如图片），只有用户向下滚动，它们进入视口时才加载，这样可以节省带宽，提高网页性能。这就叫做“惰性加载”。

有了 IntersectionObserver API，实现起来就很容易了。图像的 HTML 代码可以写成下面这样。

```html:no-line-numbers
<img src="placeholder.png" data-src="img-1.jpg">
<img src="placeholder.png" data-src="img-2.jpg">
<img src="placeholder.png" data-src="img-3.jpg">
```

上面代码中，图像默认显示一个占位符，data-src 属性是惰性加载的真正图像。

```js:no-line-numbers
function query(selector) {
  return Array.from(document.querySelectorAll(selector));
}

var observer = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    });
  }
);

query('.lazy-loaded').forEach(function (item) {
  observer.observe(item);
});
```

上面代码中，只有图像开始可见时，才会加载真正的图像文件。

### 无限滚动

无限滚动（infinite scroll）指的是，随着网页滚动到底部，不断加载新的内容到页面，它的实现也很简单。

```js:no-line-numbers
var intersectionObserver = new IntersectionObserver(
  function (entries) {
    // 如果不可见，就返回
    if (entries[0].intersectionRatio <= 0) return;
    loadItems(10);
    console.log('Loaded new items');
  }
);

// 开始观察
intersectionObserver.observe(
  document.querySelector('.scrollerFooter')
);
```

无限滚动时，最好像上例那样，页面底部有一个页尾栏（又称 sentinels，上例是.scrollerFooter）。一旦页尾栏可见，就表示用户到达了页面底部，从而加载新的条目放在页尾栏前面。否则就需要每一次页面加入新内容时，都调用 observe()方法，对新增内容的底部建立观察。

### 视频自动播放

下面是一个视频元素，希望它完全进入视口的时候自动播放，离开视口的时候自动暂停。

```html:no-line-numbers
<video src="foo.mp4" controls=""></video>
```

```js:no-line-numbers
let video = document.querySelector('video');
let isPaused = false;

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio != 1  && !video.paused) {
      video.pause();
      isPaused = true;
    } else if (isPaused) {
      video.play();
      isPaused=false;
    }
  });
}, {threshold: 1});

observer.observe(video);
```

上面代码中，IntersectionObserver()的第二个参数是配置对象，它的 threshold 属性等于 1，即目标元素完全可见时触发回调函数。

## 参考链接

- [https://wangdoc.com/webapi/intersectionObserver](https://wangdoc.com/webapi/intersectionObserver)
