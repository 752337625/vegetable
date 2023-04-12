---
prev: ./string
next: ./array
category:
  - ECMAScript
tag:
  - ECMAScript
---

# Symbol

ES6 引入了一种新的原始数据类型 Symbol，表示独一无二的值。

**魔术字符串** 指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。

Symbol 值作为属性名，只有 **Object.getOwnPropertySymbols()** 方法，可以获取指定对象的所有 Symbol 属性名。另一个新的 API，**Reflect.ownKeys()** 方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

<!-- more -->

## 定义

Symbol 值通过 Symbol()函数生成。

```js:no-line-numbers
let s = Symbol();
typeof s
// "symbol"
```

## 描述

ES2019 提供了一个 Symbol 值的实例属性 description，直接返回 Symbol 值的描述。

```js:no-line-numbers
const sym = Symbol('foo');

sym.description // "foo"
```

Symbol()函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述。这主要是为了在控制台显示，或者转为字符串时，比较容易区分。如果不加参数，它们在控制台的输出都是 Symbol()，不利于区分。

```js:no-line-numbers
let s1 = Symbol('foo');
let s2 = Symbol('bar');
s1 // Symbol(foo)
s2 // Symbol(bar)
s1.toString() // "Symbol(foo)"
s2.toString() // "Symbol(bar)"
```

如果 Symbol 的参数是一个对象，就会调用该对象的 toString()方法，将其转为字符串，然后才生成一个 Symbol 值。

```js:no-line-numbers
const obj = {
  a:5
};
const sym = Symbol(obj);
 sym //Symbol([object Object])
```

注意，Symbol()函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的 Symbol 函数的返回值是不相等的。

```js:no-line-numbers
// 没有参数的情况
let s1 = Symbol();
let s2 = Symbol();
s1 === s2 // false
// 有参数的情况
let s1 = Symbol('foo');
let s2 = Symbol('foo');
s1 === s2 // false
```

**ES2019 提供了一个 Symbol 值的实例属性 description，直接返回 Symbol 值的描述。**

```js:no-line-numbers
const sym = Symbol('foo');

sym.description // "foo"
```

## Symbol.for(key)，Symbol.keyFor(key)

### Symbol.for(key)

它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其注册到全局(也可以说是登记全局)。注意，Symbol.for()为 Symbol 值登记的名字，是全局环境的，不管有没有在全局环境运行。

```js:no-line-numbers
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');

s1 === s2 // true

function foo() {
  return Symbol.for('bar');
}

const x = foo();
const y = Symbol.for('bar');
console.log(x === y); // true
```

> Symbol.for()与 Symbol()这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for()不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的 key 是否已经存在，如果不存在才会新建一个值。比如，如果你调用 Symbol.for("cat")30 次，每次都会返回同一个 Symbol 值，但是调用 Symbol("cat")30 次，会返回 30 个不同的 Symbol 值。

### Symbol.keyFor(key)

Symbol.keyFor()方法返回一个已登记的 Symbol 类型值的 key。

```js:no-line-numbers
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```

## 作为属性名

- 对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型。凡是属性名属于 Symbol 类型，就都是独一无二的，可保证不会与其他属性名产生冲突。

  1. 注意，Symbol 值作为对象属性名时，不能用点运算，全部采用方括号进行赋值和访问。

  ```js:no-line-numbers
  <!-- Error -->
  const mySymbol = Symbol();
  const a = {};
  a.mySymbol = 'Hello!';
  a[mySymbol] // undefined
  a['mySymbol'] // "Hello!"
   <!-- GOOD -->
   let mySymbol = Symbol();
  // 第一种写法
  let a = {};
  a[mySymbol] = 'Hello!';
  // 第二种写法
  let a = {
  [mySymbol]: 'Hello!'
  };
  // 第三种写法
  let a = {};
  Object.defineProperty(a, mySymbol, { value: 'Hello!' });
  // 以上写法都得到同样结果
  a[mySymbol] // "Hello!"
  ```

* Symbol 类型还可以用于定义一组常量，保证这组常量的值都是不相等的。

```js:no-line-numbers
const COLOR_RED    = Symbol();
const COLOR_GREEN  = Symbol();

function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN;
    case COLOR_GREEN:
      return COLOR_RED;
    default:
      throw new Error('Undefined color');
    }
}
```

## 属性名的遍历

Symbol 值作为属性名，遍历对象的时候，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回。

但是，它也不是私有属性，有一个 Object.getOwnPropertySymbols()方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

```js:no-line-numbers
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);

objectSymbols // [Symbol(a), Symbol(b)]

const obj = {};
const foo = Symbol('foo');
obj[foo] = 'bar';
for (let i in obj) {
  console.log(i); // 无输出
}
Object.getOwnPropertyNames(obj) // []
```

上面代码是 Object.getOwnPropertySymbols()方法与 for...in 循环、Object.getOwnPropertyNames 方法进行对比的例子。

另一个新的 API，Reflect.ownKeys()方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。

```js:no-line-numbers
let obj = {
  [Symbol('my_key')]: 1,
  enum: 2,
  nonEnum: 3
};

Reflect.ownKeys(obj)
//  ["enum", "nonEnum", Symbol(my_key)]
```

## 消除魔术字符串

**魔术字符串指的是，在代码之中多次出现、与代码形成强耦合的某一个具体的字符串或者数值。** 风格良好的代码，应该尽量消除魔术字符串，改由含义清晰的变量代替。

```js:no-line-numbers
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}

getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
```

上面代码中，字符串 Triangle 就是一个魔术字符串。它多次出现，与代码形成“强耦合”，不利于将来的修改和维护。

```js:no-line-numbers
const shapeType = {
  triangle: 'Triangle'
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

上面代码中，我们把 Triangle 写成 shapeType 对象的 triangle 属性，这样就消除了强耦合。

如果仔细分析，可以发现 shapeType.triangle 等于哪个值并不重要，只要确保不会跟其他 shapeType 属性的值冲突即可。因此，这里就很适合改用 Symbol 值。

```js:no-line-numbers
const shapeType = {
  triangle: Symbol()
};

function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}

getArea(shapeType.triangle, { width: 100, height: 100 });
```

上面代码中，除了将 shapeType.triangle 的值设为一个 Symbol，其他地方都不用修改。

## 作为只用于内部的方法

由于以 Symbol 值作为键名，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。

```js:no-line-numbers
let size = Symbol('size');

class Collection {
  constructor() {
    this[size] = 0;
  }

  add(item) {
    this[this[size]] = item;
    this[size]++;
  }

  static sizeOf(instance) {
    return instance[size];
  }
}

let x = new Collection();
Collection.sizeOf(x) // 0

x.add('foo');
Collection.sizeOf(x) // 1

Object.keys(x) // ['0']
Object.getOwnPropertyNames(x) // ['0']
Object.getOwnPropertySymbols(x) // [Symbol(size)]
```

上面代码中，对象 x 的 size 属性是一个 Symbol 值，所以 Object.keys(x)、Object.getOwnPropertyNames(x)都无法获取它。这就造成了一种不会被常规方法遍历得到非私有的内部方法的效果。

## 可以用在不同的 iframe 或 service worker 中取到同一个值。

Symbol.for()的这个全局登记特性，可以用在不同的 iframe 或 service worker 中取到同一个值。

```js:no-line-numbers
iframe = document.createElement('iframe');
iframe.src = String(window.location);
document.body.appendChild(iframe);

iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo')
// true
```

上面代码中，iframe 窗口生成的 Symbol 值，可以在主页面得到。

## 内置的 Symbol 值

除了定义自己使用的 Symbol 值以外，ES6 还提供了 11 个内置的 Symbol 值，指向语言内部使用的方法。

### Symbol.hasInstance

**对象的 Symbol.hasInstance 属性，指向一个内部方法。** 当其他对象使用 instanceof 运算符，判断是否为该对象的实例时，会调用这个方法。

```js:no-line-numbers
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;
  }
}

[1, 2, 3] instanceof new MyClass() // true
```

### Symbol.isConcatSpreadable

**对象的 Symbol.isConcatSpreadable 属性等于一个布尔值。** 表示该对象用于 Array.prototype.concat()时，是否可以展开。

```js:no-line-numbers
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1, 'e') // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2 = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e') // ['a', 'b', ['c','d'], 'e']
```

上面代码说明，数组的默认行为是可以展开，Symbol.isConcatSpreadable 默认等于 undefined。该属性等于 true 时，也有展开的效果。

类似数组的对象正好相反，默认不展开。它的 Symbol.isConcatSpreadable 属性设为 true，才可以展开。

```js:no-line-numbers
let obj = {length: 2, 0: 'c', 1: 'd'};
['a', 'b'].concat(obj, 'e') // ['a', 'b', obj, 'e']

obj[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(obj, 'e') // ['a', 'b', 'c', 'd', 'e']
```

Symbol.isConcatSpreadable 属性也可以定义在类里面。

```js:no-line-numbers
class A1 extends Array {
  constructor(args) {
    super(args);
    this[Symbol.isConcatSpreadable] = true;
  }
}
class A2 extends Array {
  constructor(args) {
    super(args);
  }
  get [Symbol.isConcatSpreadable] () {
    return false;
  }
}
let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
[1, 2].concat(a1).concat(a2)
// [1, 2, 3, 4, [5, 6]]
```

上面代码中，类 A1 是可展开的，类 A2 是不可展开的，所以使用 concat 时有不一样的结果。

注意，Symbol.isConcatSpreadable 的位置差异，A1 是定义在实例上，A2 是定义在类本身，效果相同。

### Symbol.match

**对象的 Symbol.match 属性，指向一个函数。** 当执行 str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值。

```js:no-line-numbers
String.prototype.match(regexp)
// 等同于
regexp[Symbol.match](this)


class MyMatcher {
  [Symbol.match](string) {
    return 'hello world'.indexOf(string);
  }
}
'e'.match(new MyMatcher()) // 1
```

### Symbol.replace

**对象的 Symbol.replace 属性，指向一个方法。** 当该对象被 String.prototype.replace 方法调用时，会返回该方法的返回值。

```js:no-line-numbers
String.prototype.replace(searchValue, replaceValue)
// 等同于
searchValue[Symbol.replace](this, replaceValue)

const x = {};
x[Symbol.replace] = (...s) => console.log(s);

'Hello'.replace(x, 'World') // ["Hello", "World"]
```

### Symbol.search

**对象的 Symbol.search 属性，指向一个方法。** 当该对象被 String.prototype.search 方法调用时，会返回该方法的返回值。

```js:no-line-numbers
String.prototype.search(regexp)
// 等同于
regexp[Symbol.search](this)

class MySearch {
  constructor(value) {
    this.value = value;
  }
  [Symbol.search](string) {
    return string.indexOf(this.value);
  }
}
'foobar'.search(new MySearch('foo')) // 0
```

### Symbol.split

**对象的 Symbol.split 属性，指向一个方法。** 当该对象被 String.prototype.split 方法调用时，会返回该方法的返回值。

```js:no-line-numbers
String.prototype.split(separator, limit)
// 等同于
separator[Symbol.split](this, limit)


class MySplitter {
  constructor(value) {
    this.value = value;
  }
  [Symbol.split](string) {
    let index = string.indexOf(this.value);
    if (index === -1) {
      return string;
    }
    return [
      string.substr(0, index),
      string.substr(index + this.value.length)
    ];
  }
}

'foobar'.split(new MySplitter('foo'))
// ['', 'bar']

'foobar'.split(new MySplitter('bar'))
// ['foo', '']

'foobar'.split(new MySplitter('baz'))
// 'foobar'
```

### Symbol.toStringTag

**对象的 Symbol.toStringTag 属性，指向一个方法。** 在该对象上面调用 Object.prototype.toString 方法时，如果这个属性存在，它的返回值会出现在 toString 方法返回的字符串之中，表示对象的类型。也就是说，这个属性可以用来定制[object Object]或[object Array]中 object 后面的那个字符串。

```js:no-line-numbers
// 例一
({[Symbol.toStringTag]: 'Foo'}.toString())
// "[object Foo]"

// 例二
class Collection {
  get [Symbol.toStringTag]() {
    return 'xxx';
  }
}
let x = new Collection();
Object.prototype.toString.call(x) // "[object xxx]"
```

ES6 新增内置对象的 Symbol.toStringTag 属性值如下。

- JSON[Symbol.toStringTag]：'JSON'
- Math[Symbol.toStringTag]：'Math'
- Module 对象 M[Symbol.toStringTag]：'Module'
- ArrayBuffer.prototype[Symbol.toStringTag]：'ArrayBuffer'
- DataView.prototype[Symbol.toStringTag]：'DataView'
- Map.prototype[Symbol.toStringTag]：'Map'
- Promise.prototype[Symbol.toStringTag]：'Promise'
- Set.prototype[Symbol.toStringTag]：'Set'
- %TypedArray%.prototype[Symbol.toStringTag]：'Uint8Array'等
- WeakMap.prototype[Symbol.toStringTag]：'WeakMap'
- WeakSet.prototype[Symbol.toStringTag]：'WeakSet'
- %MapIteratorPrototype%[Symbol.toStringTag]：'Map Iterator'
- %SetIteratorPrototype%[Symbol.toStringTag]：'Set Iterator'
- %StringIteratorPrototype%[Symbol.toStringTag]：'String Iterator'
- Symbol.prototype[Symbol.toStringTag]：'Symbol'
- Generator.prototype[Symbol.toStringTag]：'Generator'
- GeneratorFunction.prototype[Symbol.toStringTag]：'GeneratorFunction'

### Symbol.species

**对象的 Symbol.species 属性，指向一个构造函数。** 创建衍生对象时，会使用该属性。

### Symbol.unscopables

**对象的 Symbol.unscopables 属性，指向一个对象。** 该对象指定了使用 with 关键字时，哪些属性会被 with 环境排除。

### Symbol.toPrimitive

**对象的 Symbol.toPrimitive 属性，指向一个方法。** 该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。

## 参考链接

- [https://wangdoc.com/es6/symbol](https://wangdoc.com/es6/symbol)
