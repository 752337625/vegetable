---
prev: ./error
next: ./general
category:
  - ECMAScript
tag:
  - ECMAScript
star: true
---

# decoder 和 encoder

如果二进制数据实际上是一个字符串怎么办？例如，我们收到了一个包含文本数据的文件。

<!-- more -->

## TextDecoder

参数字节流，默认输出: UTF-8 字符串

```js:no-line-numbers
let utf8decoder = new TextDecoder('utf-8'); // default 'utf-8' or 'utf8'

let u8arr = new Uint8Array([240, 160, 174, 183]);
let i8arr = new Int8Array([-16, -96, -82, -73]);
let u16arr = new Uint16Array([41200, 47022]);
let i16arr = new Int16Array([-24336, -18514]);
let i32arr = new Int32Array([-1213292304]);

console.log(utf8decoder.decode(u8arr)); // 𠮷
console.log(utf8decoder.decode(i8arr)); // 𠮷
console.log(utf8decoder.decode(u16arr)); // 𠮷
console.log(utf8decoder.decode(i16arr)); // 𠮷
console.log(utf8decoder.decode(i32arr)); // 𠮷

const win1251decoder = new TextDecoder("windows-1251");
const bytes = new Uint8Array([
  207, 240, 232, 226, 229, 242, 44, 32, 236, 232, 240, 33,
]);
console.log(win1251decoder.decode(bytes)); // Привет, мир!
```

## TextEncoder

参数字符串，默认输出: UTF-8 字节流 总是返回 utf-8。

```js:no-line-numbers
const encoder = new TextEncoder()
const view = encoder.encode('€')
console.log(view); // Uint8Array(3) [226, 130, 172]
```

## String.fromCharCode()

该方法的参数是一个或多个数值，代表 Unicode 码点，返回值是这些码点组成的字符串。

注意，该方法不支持 Unicode 码点大于 0xFFFF 的字符，即传入的参数不能大于 0xFFFF（即十进制的 65535）。

```js:no-line-numbers
String.fromCharCode() // ""
String.fromCharCode(97) // "a"
String.fromCharCode(104, 101, 108, 108, 111) // "hello"
```

## String.prototype.charCodeAt()

charCodeAt()方法返回字符串指定位置的 Unicode 码点（十进制表示），相当于 String.fromCharCode()的逆操作。

```js:no-line-numbers
'abc'.charCodeAt(1) // 98
```
