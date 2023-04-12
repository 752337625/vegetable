---
prev: ./set
next: ./weakref
category:
  - ECMAScript
tag:
  - ECMAScript
---

# Map 和 WeakMap

Map 结构提供了“值—值”的对应。Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。

如果对同一个键多次赋值，后面的值将覆盖前面的值。

Chrome 浏览器的 Dev Tools 的 Memory 面板，有一个垃圾桶的按钮，可以强制垃圾回收（garbage collect）。这个按钮也能用来观察 WeakMap 里面的引用是否消失。

<!-- more -->

## Map

### 基本用法

Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。

```js:no-line-numbers
// 例一
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
map.get('asfddfsasadf') // undefined
map
.set(1, 'aaa')
.set(1, 'bbb');
map.get(1) // "bbb"
map.set(['a'], 555);
map.get(['a']) // undefined
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
```

如果读取一个未知的键，则返回 undefined。
如果对同一个键多次赋值，后面的值将覆盖前面的值。
Set 和 Map 都可以用来生成新的 Map。
**注意，只有对同一个对象的引用，Map 结构才将其视为同一个键。这一点要非常小心。**

### Map 实例的属性和方法

Map 结构的实例有以下属性。

- Map.prototype.constructor：构造函数，默认就是 Map 函数。
- Map.prototype.size：返回 Map 实例的成员总数。

Map 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

- Map.prototype.set(key, value)
- Map.prototype.get(key)
- Map.prototype.delete(key)
- Map.prototype.has(key)
- Map.prototype.clear()

### 遍历操作

Map 结构的实例有四个遍历方法，可以用于遍历成员。

- Map.prototype.keys()：返回键名的遍历器
- Map.prototype.values()：返回键值的遍历器
- Map.prototype.entries()：返回键值对的遍历器
- Map.prototype.forEach()：使用回调函数遍历每个成员

扩展运算符（...）内部使用 for...of 循环，所以也可以用于 Map 结构。

```js:no-line-numbers
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()]
// [1, 2, 3]

[...map.values()]
// ['one', 'two', 'three']

[...map.entries()]
// [[1,'one'], [2, 'two'], [3, 'three']]

[...map]
// [[1,'one'], [2, 'two'], [3, 'three']]
```

## WeakMap

### 含义

WeakMap 只接受对象作为键名（null 除外），不接受其他类型的值作为键名。

不过，现在有一个**提案**，允许 Symbol 值也可以作为 WeakMap 的键名。一旦纳入标准，就意味着键名存在两种可能：对象和 Symbol 值。

```js:no-line-numbers
const map = new WeakMap();
map.set(1, 2)
// TypeError: 1 is not an object!
map.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
map.set(null, 2)
// TypeError: Invalid value used as weak map key
```

```js:no-line-numbers
const e1 = document.getElementById('foo');
const e2 = document.getElementById('bar');
const arr = [
  [e1, 'foo 元素'],
  [e2, 'bar 元素'],
];
```

上面代码中，e1 和 e2 是两个对象，我们通过 arr 数组对这两个对象添加一些文字说明。这就形成了 arr 对 e1 和 e2 的引用。

一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放 e1 和 e2 占用的内存。

```js:no-line-numbers
// 不需要 e1 和 e2 的时候
// 必须手动删除引用
arr [0] = null;
arr [1] = null;
```

上面这样的写法显然很不方便。一旦忘了写，就会造成内存泄露。

WeakMap 就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。

基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。一个典型应用场景是，在网页的 DOM 元素上添加数据，就可以使用 WeakMap 结构。当该 DOM 元素被清除，其所对应的 WeakMap 记录就会自动被移除。

```js:no-line-numbers
const wm = new WeakMap();

const element = document.getElementById('example');

wm.set(element, 'some information');
wm.get(element) // "some information"

```

上面代码中，先新建一个 WeakMap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对 element 的引用就是弱引用，不会被计入垃圾回收机制。

也就是说，上面的 DOM 节点对象除了 WeakMap 的弱引用外，其他位置对该对象的引用一旦消除，该对象占用的内存就会被垃圾回收机制释放。WeakMap 保存的这个键值对，也会自动消失。

总之，WeakMap 的专用场合就是，它的键所对应的对象，可能会在将来消失。WeakMap 结构有助于防止内存泄漏。

**注意，WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用。**

```js:no-line-numbers
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key) // Object {foo: 1}
```

上面代码中，键值 obj 是正常引用。所以，即使在 WeakMap 外部消除了 obj 的引用，WeakMap 内部的引用依然存在。

### WeakMap 实例的属性和方法

WeakMap 与 Map 在 API 上的区别主要是两个，一是没有遍历操作（即没有 keys()、values()和 entries()方法），也没有 size 属性。因为没有办法列出所有键名，某个键名是否存在完全不可预测，跟垃圾回收机制是否运行相关。这一刻可以取到键名，下一刻垃圾回收机制突然运行了，这个键名就没了，为了防止出现不确定性，就统一规定不能取到键名。二是无法清空，即不支持 clear 方法。因此，WeakMap 只有四个方法可用：get()、set()、has()、delete()。

## 参考链接

- [https://wangdoc.com/es6/set-map#map](https://wangdoc.com/es6/set-map#map)

- [https://wangdoc.com/es6/set-map#weakmap](https://wangdoc.com/es6/set-map#weakmap)
