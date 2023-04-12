---
prev: ./globalThis
next: ./decode
category:
  - ECMAScript
tag:
  - ECMAScript
---

# Error

JavaScript 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。JavaScript 原生提供 Error 构造函数，所有抛出的错误都是这个构造函数的实例。

<!-- more -->

## Error 实例对象

```js:no-line-numbers
var err = new Error('出错了');
err.message // "出错了"
```

上面代码中，我们调用 Error()构造函数，生成一个实例对象 err。Error()构造函数接受一个参数，表示错误提示，可以从实例的 message 属性读到这个参数。抛出 Error 实例对象以后，整个程序就中断在发生错误的地方，不再往下执行。

JavaScript 语言标准只提到，Error 实例对象必须有 message 属性，表示出错时的提示信息，没有提到其他属性。大多数 JavaScript 引擎，对 Error 实例还提供 name 和 stack 属性，分别表示错误的名称和错误的堆栈，但它们是非标准的，不是每种实现都有。

- message：错误提示信息
- name：错误名称（非标准属性）
- stack：错误的堆栈（非标准属性）

stack 属性用来查看错误发生时的堆栈。

```js:no-line-numbers
function throwit() {
  throw new Error('');
}

function catchit() {
  try {
    throwit();
  } catch(e) {
    console.log(e.stack); // print stack trace
  }
}

catchit()
// Error
//    at throwit (~/examples/throwcatch.js:9:11)
//    at catchit (~/examples/throwcatch.js:3:9)
//    at repl:1:5
```

上面代码中，错误堆栈的最内层是 throwit 函数，然后是 catchit 函数，最后是函数的运行环境。

## 原生错误类型

Error 实例对象是最一般的错误类型，在它的基础上，JavaScript 还定义了其他 6 种错误对象。也就是说，存在 Error 的 6 个派生对象。

- SyntaxError 对象
- ReferenceError 对象
- RangeError 对象
- TypeError 对象
- URIError 对象
- EvalError 对象

## throw 语句

throw 语句的作用是手动中断程序执行，抛出一个错误。throw 可以抛出任何类型的值。也就是说，它的参数可以是任何值。

```js:no-line-numbers
var x = -1;

if (x <= 0) {
  throw new Error('x 必须为正数');
}
// Uncaught Error: x 必须为正数
// 抛出一个字符串
throw 'Error！';
// Uncaught Error！

// 抛出一个数值
throw 42;
// Uncaught 42

// 抛出一个布尔值
throw true;
// Uncaught true

// 抛出一个对象
throw {
  toString: function () {
    return 'Error!';
  }
};
// Uncaught {toString: ƒ}f
```

## try...catch 结构

如果你不确定某些代码是否会报错，就可以把它们放在 try...catch 代码块之中，便于进一步对错误进行处理。catch 代码块捕获错误之后，程序不会中断，会按照正常流程继续执行下去。

```js:no-line-numbers
try {
  throw "出错了";
} catch (e) {
  console.log(111);
}
console.log(222);
// 111
// 222
```

## finally 代码块

try...catch 结构允许在最后添加一个 finally 代码块，表示不管是否出现错误，都必需在最后运行的语句。

```js:no-line-numbers
openFile();

try {
  writeFile(Data);
} catch(e) {
  handleError(e);
} finally {
  closeFile();
}
```

上面代码首先打开一个文件，然后在 try 代码块中写入文件，如果没有发生错误，则运行 finally 代码块关闭文件；一旦发生错误，则先使用 catch 代码块处理错误，再使用 finally 代码块关闭文件。

**在函数中捕获，且当函数有返回值的执行顺序**

```js:no-line-numbers
var count = 0;
function countUp() {
  try {
    return count;
  } finally {
    count++;
  }
}

countUp()
// 0
count
// 1
```

上面代码说明，return 语句里面的 count 的值，是在 finally 代码块运行之前就获取了。

## 案例

```js:no-line-numbers
function f() {
  try {
    console.log(0);
    throw 'bug';
  } catch(e) {
    console.log(1);
    return true; // 这句原本会延迟到 finally 代码块结束再执行，但是finally 中的return 直接提前结束函数
    console.log(2); // 不会运行
  } finally {
    console.log(3);
    return false; // 这句会直接结束函数的执行,所以返回false
    console.log(4); // 不会运行
  }
  console.log(5); // 不会运行
}

var result = f();
// 0
// 1
// 3

result
// false
```

上面代码中，catch 代码块结束执行之前，会先执行 finally 代码块。

## 参考链接

- [https://wangdoc.com/javascript/features/error](https://wangdoc.com/javascript/features/error)
