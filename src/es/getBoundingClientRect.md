---
prev: ./intersectionObserver
next: ./mutationObserver
category:
  - ECMAScript
tag:
  - ECMAScript
star: true
---

# 元素位置

<!-- more -->

## Element.getBoundingClientRect()

::: center
![getBoundingClientRect](./img/getBoundingClientRect.png 'getBoundingClientRect' =300x229)
![getBoundingClientRect1](./img/getBoundingClientRect1.png 'getBoundingClientRect' =300x229)
:::

Element.getBoundingClientRect 方法返回一个对象，提供当前元素节点的大小、位置等信息，基本上就是 CSS 盒状模型的所有信息。
getBoundingClientRect 方法返回的 rect 对象，具有以下属性（全部为只读）。

- x：元素左上角相对于视口的横坐标
- y：元素左上角相对于视口的纵坐标
- height：元素高度
- width：元素宽度
- left：元素左上角相对于视口的横坐标，与 x 属性相等
- right：元素右边界相对于视口的横坐标（等于 x + width）
- top：元素顶部相对于视口的纵坐标，与 y 属性相等
- bottom：元素底部相对于视口的纵坐标（等于 y + height）

由于元素相对于视口（viewport）的位置，会随着页面滚动变化，因此表示位置的四个属性值，都不是固定不变的。如果想得到绝对位置，可以将 left 属性加上 window.scrollX，top 属性加上 window.scrollY。

注意，getBoundingClientRect 方法的所有属性，都把边框（border 属性）算作元素的一部分。也就是说，都是从边框外缘的各个点来计算。因此，width 和 height 包括了元素本身 + padding + border。

## Element.getClientRects()

Element.getClientRects 方法返回一个类似数组的对象，里面是当前元素在页面上形成的所有矩形（所以方法名中的 Rect 用的是复数）。每个矩形都有 bottom、height、left、right、top 和 width 六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度。

## 其他

::: center
![event](./img/event.png 'event' =300x229)
:::

offsetX 和 offsetY（FF 浏览器为 layerX）

- e.offsetX：鼠标点击位置相对于触发事件对象的水平距离（灰色方块即为事件触发对象）
- e.offsetY：鼠标点击位置相对于触发事件对象的垂直距离（灰色方块即为事件触发对象）

clientX 和 clientY

- e.clientX：鼠标点击位置相对于浏览器可视区的水平距离（不会计算水平滚动的距离）
- e.clientY：鼠标点击位置相对于浏览器可视区的垂直距离（不会计算垂直滚动条的距离）

screenX 和 screenY

- e.screenX：鼠标点击位置相对于电脑屏幕左上角的水平距离
- e.screenY：鼠标点击位置相对于电脑屏幕左上角的垂直距离
- e.x、y：和 screenX、screenY 一样

pageX 和 pageY

- e.pageX：clientX+X1（X1 为水平滚动的距离）
- e.pageY：clientY+Y1（Y1 为垂直滚动的距离）

## 参考链接

- [https://www.webhek.com/post/getclientrects-getboundingclientrect/](https://www.webhek.com/post/getclientrects-getboundingclientrect/)
