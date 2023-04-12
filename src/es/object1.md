---
prev: ./array
next: ./object2
category:
  - ECMAScript
tag:
  - ECMAScript
---

# object(小 o)

如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量。

ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

```js:no-line-numbers

let propKey = 'foo';
let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
```

操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用 for...in 循环，而用 Object.keys()代替。

<!-- more -->

## 对象的引用

如果不同的变量名指向同一个对象，那么它们都是这个对象的引用，也就是说指向同一个内存地址。修改其中一个变量，会影响到其他所有变量。

```js:no-line-numbers
var o1 = {};
var o2 = o1;

o1.a = 1;
o2.a // 1

o2.b = 2;
o1.b // 2
```

上面代码中，o1 和 o2 指向同一个对象，因此为其中任何一个变量添加属性，另一个变量都可以读写该属性。

此时，如果取消某一个变量对于原对象的引用，不会影响到另一个变量。

```js:no-line-numbers
var o1 = {};
var o2 = o1;

o1 = 1;
o2 // {}
```

上面代码中，o1 和 o2 指向同一个对象，然后 o1 的值变为 1，这时不会对 o2 产生影响，o2 还是指向原来的那个对象。

但是，这种引用只局限于对象，如果两个变量指向同一个原始类型的值。那么，变量这时都是值的拷贝。

```js:no-line-numbers
var x = 1;
var y = x;

x = 2;
y // 1
```

上面的代码中，当 x 的值发生变化后，y 的值并不变，这就表示 y 和 x 并不是指向同一个内存地址。

## 属性是否存在：in 运算符

in 运算符用于检查对象是否包含某个属性（注意，检查的是键名，不是键值），如果包含就返回 true，否则返回 false。它的左边是一个字符串，表示属性名，右边是一个对象。

```js:no-line-numbers
var obj = { p: 1 };
'p' in obj // true
'toString' in obj // true
```

in 运算符的一个问题是，它不能识别哪些属性是对象自身的，哪些属性是继承的。就像上面代码中，对象 obj 本身并没有 toString 属性，但是 in 运算符会返回 true，因为这个属性是继承的。

这时，可以使用对象的 hasOwnProperty 方法判断一下，是否为对象自身的属性。

```js:no-line-numbers
var obj = {};
if ('toString' in obj) {
  console.log(obj.hasOwnProperty('toString')) // false
}
```

## 属性的遍历：for...in 循环

- 它遍历的是对象所有可遍历（enumerable）的属性，会跳过不可遍历的属性。
- 它不仅遍历对象自身的属性，还遍历继承的属性。

举例来说，对象都继承了 toString 属性，但是 for...in 循环不会遍历到这个属性。

```js:no-line-numbers
var obj = {};

// toString 属性是存在的
obj.toString // toString() { [native code] }

for (var p in obj) {
  console.log(p);
} // 没有任何输出
```

上面代码中，对象 obj 继承了 toString 属性，该属性不会被 for...in 循环遍历到，因为它默认是“不可遍历”的。关于对象属性的可遍历性，参见《标准库》章节中 Object 一章的介绍。

如果继承的属性是可遍历的，那么就会被 for...in 循环遍历到。但是，一般情况下，都是只想遍历对象自身的属性，所以使用 for...in 的时候，应该结合使用 hasOwnProperty 方法，在循环内部判断一下，某个属性是否为对象自身的属性。

```js:no-line-numbers
var person = { name: '老张' };

for (var key in person) {
  if (person.hasOwnProperty(key)) {
    console.log(key);
  }
}
// name
```

## 属性的简洁表示法

属性简写、方法简写

```js:no-line-numbers
let birth = '2000/01/01';
const o = {
  method() {
    return "Hello!";
  },
   //等同于birth: birth
  birth,
};

// 等同于

const o = {
  birth:'2000/01/01';
  method: function() {
    return "Hello!";
  }
};
```

## 属性名表达式

ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

```js:no-line-numbers
let propKey = 'foo';

let obj = {
  [propKey]: true,
  ['a' + 'bc']: 123
};
```

表达式还可以用于定义方法名。

```js:no-line-numbers
let propKey = 'foo';

let obj = {
  [propKey]() {
    return 'hi';
  }
};

obj.foo() // hi
```

注意，属性名表达式与简洁表示法，不能同时使用，会报错。

注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。

## 属性的可枚举性和遍历

### 可枚举性

对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。Object.getOwnPropertyDescriptor 方法可以获取该属性的描述对象。

```js:no-line-numbers
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }
```

描述对象的 enumerable 属性，称为“可枚举性”，如果该属性为 false，就表示某些操作会忽略当前属性。

目前，有四个操作会忽略 enumerable 为 false 的属性。

- for...in 循环：只遍历对象自身的和继承的可枚举的属性。
- Object.keys()：返回对象自身的所有可枚举的属性的键名。
- JSON.stringify()：只串行化对象自身的可枚举的属性。
- Object.assign()： 忽略 enumerable 为 false 的属性，只拷贝对象自身的可枚举的属性。

这四个操作之中，前三个是 ES5 就有的，最后一个 Object.assign()是 ES6 新增的。其中，只有 for...in 会返回继承的属性，其他三个方法都会忽略继承的属性，只处理对象自身的属性。实际上，引入“可枚举”（enumerable）这个概念的最初目的，就是让某些属性可以规避掉 for...in 操作，不然所有内部属性和方法都会被遍历到。比如，对象原型的 toString 方法，以及数组的 length 属性，就通过“可枚举性”，从而避免被 for...in 遍历到。

```js:no-line-numbers
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable
// false
```

```js:no-line-numbers
Object.getOwnPropertyDescriptor([], 'length').enumerable
// false
```

上面代码中，toString 和 length 属性的 enumerable 都是 false，因此 for...in 不会遍历到这两个继承自原型的属性。

另外，ES6 规定，所有 Class 的原型的方法都是不可枚举的。

```js:no-line-numbers
Object.getOwnPropertyDescriptor(class {foo() {}}.prototype, 'foo').enumerable
// false
```

总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用 for...in 循环，而用 Object.keys()代替。

### 属性的遍历

ES6 一共有 5 种方法可以遍历对象的属性。

1. for...in

for...in 循环遍历对象自身的和继承的可枚举属性（不含 Symbol 属性）。

2. Object.keys(obj)

Object.keys 返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含 Symbol 属性）的键名。

3. Object.getOwnPropertyNames(obj)

Object.getOwnPropertyNames 返回一个数组，包含对象自身的所有属性（不含 Symbol 属性，但是包括不可枚举属性）的键名。

4. Object.getOwnPropertySymbols(obj)

Object.getOwnPropertySymbols 返回一个数组，包含对象自身的所有 Symbol 属性的键名。

5. Reflect.ownKeys(obj)

Reflect.ownKeys 返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

以上的 5 种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

- 首先遍历所有数值键，按照数值升序排列。
- 其次遍历所有字符串键，按照加入时间升序排列。
- 最后遍历所有 Symbol 键，按照加入时间升序排列。

```js:no-line-numbers
Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
// ['2', '10', 'b', 'a', Symbol()]
```

上面代码中，Reflect.ownKeys 方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，首先是数值属性 2 和 10，其次是字符串属性 b 和 a，最后是 Symbol 属性。

## super 关键字

我们知道，this 关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字 super，指向当前对象的原型对象。

```js:no-line-numbers
const proto = {
  foo: 'hello'
};

const obj = {
  foo: 'world',
  find() {
    return super.foo;
  }
};

Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
```

上面代码中，对象 obj.find()方法之中，通过 super.foo 引用了原型对象 proto 的 foo 属性。

注意，super 关键字表示原型对象时，只能用在对象的简写方法之中，用在其他地方都会报错。

```js:no-line-numbers
// 报错
const obj = {
  foo: super.foo
}

// 报错
const obj = {
  foo: () => super.foo
}

// 报错
const obj = {
  foo: function () {
    return super.foo
  }
}
```

上面三种 super 的用法都会报错，因为对于 JavaScript 引擎来说，这里的 super 都没有用在对象的方法之中。第一种写法是 super 用在属性里面，第二种和第三种写法是 super 用在一个函数里面，然后赋值给 foo 属性。目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。

## 对象的扩展运算符配合解构赋值

对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

```js:no-line-numbers
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
x // 1
y // 2
z // { a: 3, b: 4 }
```

上面代码中，变量 z 是解构赋值所在的对象。它获取等号右边的所有尚未读取的键（a 和 b），将它们连同值一起拷贝过来。

**由于解构赋值要求等号右边是一个对象，所以如果等号右边是 undefined 或 null，就会报错，因为它们无法转为对象。**

**解构赋值必须是最后一个参数，否则会报错。**

**注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。**

**另外，扩展运算符的解构赋值，不能复制继承自原型对象的属性。**

```js:no-line-numbers
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined
```

上面代码中，对象 o3 复制了 o2，但是只复制了 o2 自身的属性，没有复制它的原型对象 o1 的属性。

下面是另一个例子。

```js:no-line-numbers
const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3
```

上面代码中，变量 x 是单纯的解构赋值，所以可以读取对象 o 继承的属性；变量 y 和 z 是扩展运算符的解构赋值，只能读取对象 o 自身的属性，所以变量 z 可以赋值成功，变量 y 取不到值。ES6 规定，变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式，所以上面代码引入了中间变量 newObj，如果写成下面这样会报错。

## 参考链接

- [https://wangdoc.com/javascript/stdlib/object](https://wangdoc.com/javascript/stdlib/object)

- [https://wangdoc.com/es6/object](https://wangdoc.com/es6/object)
