---
prev: ./getBoundingClientRect
next: ./requestAnimationFrame
category:
  - ECMAScript
tag:
  - ECMAScript
star: true
---

# Mutation Observer

Mutation Observer API 用来监视 DOM 变动。DOM 的任何变动，比如节点的增减、属性的变动、文本内容的变动，这个 API 都可以得到通知。

<!-- more -->

## 概述

概念上，它很接近事件，可以理解为 DOM 发生变动就会触发 Mutation Observer 事件。但是，它与事件有一个本质不同：事件是同步触发，也就是说，DOM 的变动立刻会触发相应的事件；**Mutation Observer 则是异步触发，DOM 的变动并不会马上触发，而是要等到当前所有 DOM 操作都结束才触发。**

这样设计是为了应付 DOM 变动频繁的特点。举例来说，如果文档中连续插入 1000 个`<p>`元素，就会连续触发 1000 个插入事件，执行每个事件的回调函数，这很可能造成浏览器的卡顿；而 Mutation Observer 完全不同，只在 1000 个段落都插入结束后才会触发，而且只触发一次。

## MutationObserver 构造函数

```js:no-line-numbers
var observer = new MutationObserver(function (mutationRecordList, observer) {
  mutationRecordList.forEach(function(mutationRecord) {
    console.log(mutationRecord);
  });
});
```

上面代码中的回调函数，会在每次 DOM 变动后调用。该回调函数接受两个参数，第一个是变动数组，第二个是观察器实例。

## MutationObserver 的实例方法

### observe()

observe()方法用来启动监听，它接受两个参数。

- 第一个参数：所要观察的 DOM 节点
- 第二个参数：一个配置对象，指定所要观察的特定变动

```js:no-line-numbers
var article = document.querySelector('article');

var  options = {
  attributes: true, //属性的变动。
  characterData: true, //节点内容或节点文本的变动。
  childList: true, //子节点的变动（指新增，删除或者更改）。
  subtree: true, //表示是否将该观察器应用于该节点的所有后代节点。
  attributeOldValue: true, //表示观察attributes变动时，是否需要记录变动前的属性值。
  characterDataOldValue: true, //表示观察characterData变动时，是否需要记录变动前的值。
  attributeFilter:['class','src'],//数组，表示需要观察的特定属性（比如['class','src']）。
} ;

observer.observe(article, options);
```

### disconnect()，takeRecords()

disconnect()方法用来停止观察。调用该方法后，DOM 再发生变动，也不会触发观察器。

takeRecords()方法用来清除变动记录，即不再处理未处理的变动。该方法返回变动记录的数组。

```js:no-line-numbers
observer.disconnect();
observer.takeRecords();
```

## MutationRecord 对象

DOM 每次发生变化，就会生成一条变动记录（MutationRecord 实例）。该实例包含了与变动相关的所有信息。Mutation Observer 处理的就是一个个 MutationRecord 实例所组成的数组。

DOM 每次发生变化，就会生成一条变动记录（MutationRecord 实例）。该实例包含了与变动相关的所有信息。Mutation Observer 处理的就是一个个 MutationRecord 实例所组成的数组。

MutationRecord 对象包含了 DOM 的相关信息，有如下属性：

- type：观察的变动类型（attributes、characterData 或者 childList）。
- target：发生变动的 DOM 节点。
- addedNodes：新增的 DOM 节点。
- removedNodes：删除的 DOM 节点。
- previousSibling：前一个同级节点，如果没有则返回 null。
- nextSibling：下一个同级节点，如果没有则返回 null。
- attributeName：发生变动的属性。如果设置了 attributeFilter，则只返回预先指定的属性。
- oldValue：变动前的值。这个属性只对 attribute 和 characterData 变动有效，如果发生 childList 变动，则返回 null。

## 参考链接

- [https://wangdoc.com/javascript/dom/mutationobserver](https://wangdoc.com/javascript/dom/mutationobserver)
