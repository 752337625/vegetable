---
prev: ./decode
next: ./number
category:
  - ECMAScript
tag:
  - ECMAScript
---

# 数据类型

js 基本七种数据类型为：1、String 类型，用于表示字符串；2、Number 类型，用于表示数字；3、Boolean 类型；4、Symbol 类型，代表独一无二的值；5、Undefined 类型；6、Null 类型；7、Object 类型。8.BigInt 大整数类型，用于表示数字；

- 基本类型：String、Number、Boolean、Symbol、BigInt、Undefined、Null

- 引用类型：Object

<!-- more -->

## 基本类型

JavaScript 的数据类型，共有六种。（ES6 又新增了第七种 Symbol 类型的值）

- 数值（number）：整数和小数（比如 1 和 3.14）。

- 字符串（string）：文本（比如 Hello World）。

- 布尔值（boolean）：表示真伪的两个特殊值，即 true（真）和 false（假）。

- undefined：表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值。

- null：表示空值，即此处的值为空。

- 对象（object）：各种值组成的集合。

通常，**数值、字符串、布尔值这三种类型，合称为原始类型（primitive type）的值，即它们是最基本的数据类型，不能再细分了**。对象则称为合成类型（complex type）的值，因为一个对象往往是多个原始类型的值的合成，可以看作是一个存放各种值的容器。至于 undefined 和 null，一般将它们看成两个特殊值。

对象是最复杂的数据类型，又可以分成三个子类型。

- 狭义的对象（object）

- 数组（array）

- 函数（function）

## 如何判断数据类型

### typeof 运算符

```js:no-line-numbers
typeof 123 // "number"
typeof '123' // "string"
typeof false // "boolean"
function f() {}
typeof f // "function"
typeof undefined // "undefined"
typeof window // "object"
typeof {} // "object"
typeof [] // "object"
typeof null // "object"
```

### instanceof 运算符

instanceof 运算符返回一个布尔值，表示对象是否为某个构造函数的实例。

```js:no-line-numbers
{} instanceof Array // false
[] instanceof Array // true
[] instanceof Object //true
let fn = function (a, b) {
  return a + b
}
fn instanceof Function//true
```

### Object.prototype.toString 方法

```js:no-line-numbers
Object.prototype.toString.call('') ;   // [object String]
Object.prototype.toString.call(1) ;    // [object Number]
Object.prototype.toString.call(true) ; // [object Boolean]
Object.prototype.toString.call(Symbol()); //[object Symbol]
Object.prototype.toString.call(undefined) ; // [object Undefined]
Object.prototype.toString.call(null) ; // [object Null]
Object.prototype.toString.call(new Function()) ; // [object Function]
Object.prototype.toString.call(new Date()) ; // [object Date]
Object.prototype.toString.call([]) ; // [object Array]
Object.prototype.toString.call(new RegExp()) ; // [object RegExp]
Object.prototype.toString.call(new Error()) ; // [object Error]
Object.prototype.toString.call(document) ; // [object HTMLDocument]
Object.prototype.toString.call(window) ; //[object global] window 是全局对象 global 的引用
```

## 参考链接

- [https://wangdoc.com/javascript/types/general](https://wangdoc.com/javascript/types/general)

- [https://wangdoc.com/javascript/oop/prototype](https://wangdoc.com/javascript/oop/prototype)
