---
prev: ./number
next: ./string
category:
  - ECMAScript
tag:
  - ECMAScript
---

# BigInt

BigInt 只用来表示**整数**，没有位数的限制，任何位数的整数都可以精确表示。

BigInt 不能与普通数值进行混合运算。

<!-- more -->

## 定义

**BigInt 只用来表示*整数*，没有位数的限制，任何位数的整数都可以精确表示。**

为了与 Number 类型区别，BigInt 类型的数据必须添加后缀 n。

```js:no-line-numbers
1234 // 普通整数
1234n // BigInt

// BigInt 的运算
1n + 2n // 3n
```

BigInt 同样可以使用各种进制表示，都要加上后缀 n。

```js:no-line-numbers
0b1101n // 二进制
0o777n // 八进制
0xFFn // 十六进制
```

BigInt 与普通整数是两种值，它们之间并不相等。

```js:no-line-numbers
42n === 42 // false
```

typeof 运算符对于 BigInt 类型的数据返回 bigint。

```js:no-line-numbers
typeof 123n // 'bigint'
```

BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突。

```js:no-line-numbers
-42n // 正确
+42n // 报错
```

## BigInt 全局属性

BigInt 继承了 Object 对象的两个实例方法。

```js:no-line-numbers
BigInt.prototype.toString()
BigInt.prototype.valueOf()
```

它还继承了 Number 对象的一个实例方法。

```js:no-line-numbers
BigInt.prototype.toLocaleString()
```

此外，还提供了三个静态方法。

```js:no-line-numbers
BigInt.asUintN(width, BigInt)： 给定的 BigInt 转为 0 到 2width - 1 之间对应的值。
BigInt.asIntN(width, BigInt)：给定的 BigInt 转为 -2width - 1 到 2width - 1 - 1 之间对应的值。
BigInt.parseInt(string[, radix])：近似于 Number.parseInt()，将一个字符串转换成指定进制的 BigInt。
```

对于二进制数组，BigInt 新增了两个类型 BigUint64Array 和 BigInt64Array，这两种数据类型返回的都是 64 位 BigInt。DataView 对象的实例方法 DataView.prototype.getBigInt64()和 DataView.prototype.getBigUint64()，返回的也是 BigInt。

## BigInt 函数

JavaScript 原生提供 BigInt 函数，可以用它生成 BigInt 类型的数值。且 BigInt()函数必须有参数，而且参数必须可以正常转为数值，下面的用法都会报错。

```js:no-line-numbers
BigInt(123) // 123n
BigInt('123') // 123n
BigInt(false) // 0n
BigInt(true) // 1n
new BigInt() // TypeError
BigInt(undefined) //TypeError
BigInt(null) // TypeError
BigInt('123n') // SyntaxError
BigInt('abc') // SyntaxError
BigInt(1.5) // RangeError
BigInt('1.5') // SyntaxError
```

## 转换规则

可以使用 Boolean()、Number()和 String()这三个方法，将 BigInt 可以转为布尔值、数值和字符串类型。另外，取反运算符（!）也可以将 BigInt 转为布尔值。

```js:no-line-numbers
Boolean(0n) // false
Boolean(1n) // true
Number(1n)  // 1
String(1n)  // "1"
!0n // true
!1n // false
```

上面代码中，注意 Numberj 精度问题、，String 转为字符串时后缀 n 会消失。

## 数学运算

数学运算方面，BigInt 类型的+、-、\*和\*\*这四个二元运算符，与 Number 类型的行为一致。除法运算/会舍去小数部分，返回一个整数。

BigInt 不能与普通数值进行混合运算。

```js:no-line-numbers
1n + 1.3 // 报错
```

上面代码报错是因为无论返回的是 BigInt 或 Number，都会导致丢失精度信息。比如(2n\*\*53n + 1n) + 0.5 这个表达式，如果返回 BigInt 类型，0.5 这个小数部分会丢失；如果返回 Number 类型，有效精度只能保持 53 位，导致精度下降。

BigInt 不能与普通数值进行混合运算。

```js:no-line-numbers
// 错误的写法
Math.sqrt(4n) // 报错

// 正确的写法
Math.sqrt(Number(4n)) // 2
```

上面代码中，Math.sqrt 的参数预期是 Number 类型，如果是 BigInt 就会报错，必须先用 Number 方法转一下类型，才能进行计算。

BigInt 对应的布尔值，与 Number 类型一致，即 0n 会转为 false，其他值转为 true。

```js:no-line-numbers
if (0n) {
  console.log('if');
} else {
  console.log('else');
}
// else
```

比较运算符（比如>）和相等运算符（==）允许 BigInt 与其他类型的值混合计算，因为这样做不会损失精度。

```js:no-line-numbers
0n < 1 // true
0n < true // true
0n == 0 // true
0n == false // true
0n === 0 // false
```

BigInt 与字符串混合运算时，会先转为字符串，再进行运算。

```js:no-line-numbers
'' + 123n // "123"
```

## 参考链接

- [https://wangdoc.com/es6/number#bigint-%E5%87%BD%E6%95%B0](https://wangdoc.com/es6/number#bigint-%E5%87%BD%E6%95%B0)
