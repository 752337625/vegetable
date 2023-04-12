---
prev: ./introduction
next: ./error
category:
  - ECMAScript
tag:
  - ECMAScript
---

# globalThis 对象

JavaScript 语言存在一个顶层对象，它提供全局环境（即全局作用域），所有代码都是在这个环境中运行。但是，顶层对象在各种实现里面是不统一的。

<!-- more -->

## 运行环境下的顶层对象

- 浏览器里面，顶层对象是 window，但 Node 和 Web Worker 没有 window。

- 浏览器和 Web Worker 里面，self 也指向顶层对象，但是 Node 没有 self。

- Node 里面，顶层对象是 global，但其他环境都不支持。

## 如何统一

同一段代码为了能够在各种环境，都能取到顶层对象，现在一般是使用 this 关键字，但是有局限性。

- 全局环境中，this 会返回顶层对象。但是，Node.js 模块中 this 返回的是当前模块，ES6 模块中 this 返回的是 undefined。但是，在 getters 和 setters 中却并非如此！

- 函数里面的 this，如果函数不是作为对象的方法运行，而是单纯作为函数运行，this 会指向顶层对象。但是，严格模式下，这时 this 会返回 undefined。

- 不管是严格模式，还是普通模式，new Function('return this')()，总是会返回全局对象。但是，如果浏览器用了 CSP（Content Security Policy，内容安全策略），那么 eval、new Function 这些方法都可能无法使用。

```js:no-line-numbers
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);

// 方法二
const getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
var globalThis = getGlobal();

//方法三
(function (Object) {
  typeof globalThis !== 'object' && (
    this ?
      get() :
      (Object.defineProperty(Object.prototype, '_T_', {
        configurable: true,
        get: get
      }), _T_)
  );
  function get() {
    var global = this || self;
    global.globalThis = global;
    delete Object.prototype._T_;
  }
}(Object));
export default globalThis;
//方法四 (推荐) 直接使用插件 实现与方法三类似
npm i @ungap/global-this

ESM as import '@ungap/global-this'
CJS as require('@ungap/global-this');
JS as <script src="//unpkg.com/@ungap/global-this"></script>
```

ES2020 在语言标准的层面，引入 globalThis 作为顶层对象。也就是说，任何环境下，globalThis 都是存在的，都可以从它拿到顶层对象，指向全局环境下的 this。

垫片库 [global-this](https://github.com/ungap/global-this) 模拟了这个提案，可以在所有环境拿到 globalThis。

## 顶层对象的属性

顶层对象，在浏览器环境指的是 window 对象，在 Node 指的是 global 对象。ES5 之中，顶层对象的属性与全局变量是等价的。

```js:no-line-numbers
window.a = 1;
a // 1

a = 2;
window.a // 2
```

ES6 为了改变这一点，一方面规定，为了保持兼容性，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性；另一方面规定，let 命令、const 命令、class 命令声明的全局变量，不属于顶层对象的属性。也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。

```js:no-line-numbers
var a = 1;
// 如果在 Node 的 REPL 环境，可以写成 global.a
// 或者采用通用方法，写成 this.a
window.a // 1

let b = 1;
window.b // undefined
```

## 参考链接

- [https://wangdoc.com/es6/let](https://wangdoc.com/es6/let)
