---
prev: ./map
next: ./finalizationRegistry
category:
  - ECMAScript
tag:
  - ECMAScript
star: true
---

# WeakRef

WeakSet 和 WeakMap 是基于弱引用的数据结构，ES2021 更进一步，提供了 WeakRef 对象，用于直接创建对象的弱引用。

```js:no-line-numbers

let target = {};
let wr = new WeakRef(target);

```

上面示例中，target 是原始对象，构造函数 WeakRef()创建了一个基于 target 的新对象 wr。这里，wr 就是一个 WeakRef 的实例，属于对 target 的弱引用，垃圾回收机制不会计入这个引用，也就是说，wr 的引用不会妨碍原始对象 target 被垃圾回收机制清除。

<!-- more -->

## 含义

WeakSet 和 WeakMap 是基于弱引用的数据结构，ES2021 更进一步，提供了 WeakRef 对象，用于直接创建对象的弱引用。

```js:no-line-numbers
let target = {};
let wr = new WeakRef(target);
```

上面示例中，target 是原始对象，构造函数 WeakRef()创建了一个基于 target 的新对象 wr。这里，wr 就是一个 WeakRef 的实例，属于对 target 的弱引用，垃圾回收机制不会计入这个引用，也就是说，wr 的引用不会妨碍原始对象 target 被垃圾回收机制清除。
WeakRef 实例对象有一个 deref()方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回 undefined。

```js:no-line-numbers
let target = {};
let wr = new WeakRef(target);

let obj = wr.deref();
if (obj) { // target 未被垃圾回收机制清除
  // ...
}
```

上面示例中，deref()方法可以判断原始对象是否已被清除。

## 用途

弱引用对象的一大用处，就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效。

```js:no-line-numbers
function makeWeakCached(f) {
  const cache = new Map();
  return key => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) return cached;
    }

    const fresh = f(key);
    cache.set(key, new WeakRef(fresh));
    return fresh;
  };
}

const getImageCached = makeWeakCached(getImage);
```

上面示例中，makeWeakCached()用于建立一个缓存，缓存里面保存对原始文件的弱引用。

注意，标准规定，一旦使用 WeakRef()创建了原始对象的弱引用，那么在本轮事件循环（event loop），原始对象肯定不会被清除，只会在后面的事件循环才会被清除。

## 参考链接

- [https://wangdoc.com/es6/set-map#weakref](https://wangdoc.com/es6/set-map#weakref)
