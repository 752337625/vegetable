---
prev: ./finalizationRegistry
next: ./module
category:
  - ECMAScript
tag:
  - ECMAScript
star: true
---

# 运算符

指数运算符（\*\*）特点是右结合，而不是常见的左结合

链判断运算符?.有三种写法。

- obj?.prop // 对象属性是否存在
- obj?.[expr] // 同上
- func?.(...args) // 函数或对象方法是否存在

<!-- more -->

## 指数运算符

ES2016 新增了一个指数运算符（\*\*）。

```js:no-line-numbers
// 相当于 2 ** (3 ** 2)
2 ** 3 ** 2
// 512
```

指数运算符可以与等号结合，形成一个新的赋值运算符（\*\*=）。

```js:no-line-numbers
let a = 1.5;
a **= 2;
// 等同于 a = a * a;

let b = 4;
b **= 3;
// 等同于 b = b * b * b;
```

## 链判断运算符

ES2020 引入了“链判断运算符”（optional chaining operator）?.

```js:no-line-numbers
const firstName = message?.body?.user?.firstName || 'default';
const fooValue = myForm.querySelector('input[name=foo]')?.value
```

上面代码使用了?.运算符，直接在链式调用的时候判断，左侧的对象是否为 null 或 undefined。如果是的，就不再往下运算，而是返回 undefined。

下面是判断对象方法是否存在，如果存在就立即执行的例子。

```js:no-line-numbers
iterator.checkValidity?.()
```

上面代码中，iterator.checkValidity 如果有定义，就会调用该方法，否则 iterator.checkValidity 直接返回 undefined，不再执行?.后面的部分。

使用这个运算符，有几个注意点。

- 本质上，?.运算符相当于一种短路机制，只要不满足条件，就不再往下执行。

- 如果属性链有圆括号，链判断运算符对圆括号外部没有影响，只对圆括号内部有影响。

- 以下写法是禁止的，会报错。

```js:no-line-numbers
// 构造函数
new a?.()
new a?.b()

// 链判断运算符的右侧有模板字符串
a?.`{b}`
a?.b`{c}`

// 链判断运算符的左侧是 super
super?.()
super?.foo

// 链运算符用于赋值运算符左侧
a?.b = c
```

- 右侧不得为十进制数值

为了保证兼容以前的代码，允许 foo?.3:0 被解析成 foo ? .3 : 0，因此规定如果?.后面紧跟一个十进制数字，那么?.不再被看成是一个完整的运算符，而会按照三元运算符进行处理

## Null 判断运算符

ES2020 引入了一个新的 Null 判断运算符??。它的行为类似||，但是只有运算符左侧的值为 null 或 undefined 时，才会返回右侧的值。

```js:no-line-numbers
const headerText = response.settings.headerText ?? 'Hello, world!';
const animationDuration = response.settings.animationDuration ?? 300;
const showSplashScreen = response.settings.showSplashScreen ?? true;
```

## 逻辑赋值运算符

ES2021 引入了三个新的逻辑赋值运算符（logical assignment operators），将逻辑运算符与赋值运算符进行结合。

```js:no-line-numbers
// 或赋值运算符
x ||= y
// 等同于
x || (x = y)

// 与赋值运算符
x &&= y
// 等同于
x && (x = y)

// Null 赋值运算符
x ??= y
// 等同于
x ?? (x = y)
```
