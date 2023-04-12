---
prev: ./symbol
next: ./object1
category:
  - ECMAScript
tag:
  - ECMAScript
---

# Array

本质上，数组属于一种特殊的对象。typeof 运算符会返回数组的类型是 object。

JavaScript 使用一个 32 位整数，保存数组的元素个数。这意味着，数组成员最多只有 4294967295 个（232 - 1）个，也就是说 length 属性的最大值就是 4294967295。

“类似数组的对象”的根本特征，就是具有 length 属性。只要有 length 属性，就可以认为这个对象类似于数组。

<!-- more -->

## length 属性

该属性是一个动态的值，等于键名中的最大整数加上 1。

```js:no-line-numbers
var arr = ['a', 'b'];
arr.length // 2
a.length // 0
```

```js:no-line-numbers
var a = [];

a['p'] = 'abc';
a.length // 0

a[2.1] = 'abc';
a.length // 0
```

上面代码将数组的键分别设为字符串和小数，结果都不影响 length 属性。因为，length 属性的值就是等于键名中的最大整数加上 1。而这个数组没有整数键，所以 length 属性保持为 0。

length 属性是可写的。如果人为设置一个小于当前成员个数的值，该数组的成员数量会自动减少到 length 设置的值。如果人为设置 length 大于当前元素个数，则数组的成员数量会增加到这个值，新增的位置都是空位。

```js:no-line-numbers
var arr = [ 'a', 'b', 'c' ];
arr.length // 3
arr.length = 2;
arr // ["a", "b"]

var a = ['a'];
a.length = 3;
a[1] // undefined
```

清空数组的一个有效方法，就是将 length 属性设为 0。

```js:no-line-numbers
var arr = [ 'a', 'b', 'c' ];

arr.length = 0;
arr // []
```

## in 运算符在数组中的应用

检查某个键名是否存在的运算符 in，适用于对象，也适用于数组。注意，如果数组的某个位置是空位，in 运算符返回 false。

```js:no-line-numbers
var arr = [ 'a', 'b', 'c' ];
2 in arr  // true
'2' in arr // true
4 in arr // false

var arr = [];
arr[100] = 'a';

100 in arr // true
1 in arr // false
```

## 数组空位与 undefined

当数组的某个位置是空元素，即两个逗号之间没有任何值，我们称该数组存在空位（hole）。

```js:no-line-numbers
var a = [1, , 1];
a.length // 3
```

空位就是数组没有这个元素，所以不会被遍历到，而 undefined 则表示数组有这个元素，值是 undefined，所以遍历不会跳过。

## delete 删除数组元素

使用 delete 命令删除一个数组成员，会形成空位。

```js:no-line-numbers
var a = [1, 2, 3];
delete a[1];

a[1] // undefined
a.length // 3
a //[1, , 3];
```

## 类似数组的对象

### 定义

“类似数组的对象”的根本特征，就是具有 length 属性。只要有 length 属性，就可以认为这个对象类似于数组。但是有一个问题，这种 length 属性不是动态值，不会随着成员的变化而变化。

### 哪些类数组

- 函数的 arguments 对象。
- 字符串也是类似数组的对象
- DOM 操作返回的 NodeList 集合

### 类数组使用数组一系列方法

- 数组的 slice 方法可以将“类似数组的对象”变成真正的数组。

```js:no-line-numbers
var arr = Array.prototype.slice.call(arrayLike);
```

- 除了转为真正的数组，“类似数组的对象”还有一个办法可以使用数组的方法，就是通过 call()把数组的方法放到对象上面。

```js:no-line-numbers
Array.prototype.forEach.call(arguments, function (elem, i) {
  console.log(i + '. ' + elem);
});
```

**注意，这种方法比直接使用数组原生的 forEach 要慢，所以最好还是先将“类似数组的对象”转为真正的数组，然后再直接调用数组的 forEach 方法。**

## valueOf()，toString()

数组的 valueOf 方法返回数组本身。

```js:no-line-numbers
var arr = [1, 2, 3];
arr.valueOf() // [1, 2, 3]
```

toString 方法也是对象的通用方法，数组的 toString 方法返回数组的字符串形式。

```js:no-line-numbers
var arr = [1, 2, 3, [4, 5, 6]];
arr.toString() // "1,2,3,4,5,6"
```

## push()

push 方法用于在数组的末端**添加一个或多个元素**，并返回添加新元素后的数组长度。注意，该方法会改变原数组。

## concat()

concat 方法用于多个数组的合并。它将新数组的成员，添加到原数组成员的后部，然后返回一个新数组，原数组不变。

除了数组作为参数，concat 也接受其他类型的值作为参数，添加到目标数组尾部。

```js:no-line-numbers
['hello'].concat(['world'])
// ["hello", "world"]

['hello'].concat(['world'], ['!'])
// ["hello", "world", "!"]

[].concat({a: 1}, {b: 2})
// [{ a: 1 }, { b: 2 }]

[2].concat({a: 1})
```

如果数组成员包括对象，concat 方法返回当前数组的一个浅拷贝。所谓“浅拷贝”，指的是新数组拷贝的是对象的引用。

```js:no-line-numbers
var obj = { a: 1 };
var oldArray = [obj];

var newArray = oldArray.concat();

obj.a = 2;
newArray[0].a // 2
```

## reverse()

reverse 方法用于颠倒排列数组元素，返回改变后的数组。**注意，该方法将改变原数组。**

## sort()

sort 方法对数组成员进行排序，默认是按照字典顺序排序。排序后，原数组将被改变。**注意，该方法将改变原数组。**

## splice(),slice()

splice()方法用于删除原数组的一部分成员，并可以在删除的位置添加新的数组成员，返回值是被删除的元素。**注意，该方法将改变原数组。**

slice()方法用于提取目标数组的一部分，返回一个新数组，原数组不变。

## indexOf()，lastIndexOf()

indexOf 方法返回给定元素在数组中第一次出现的位置，如果没有出现则返回-1。

lastIndexOf 方法返回给定元素在数组中最后一次出现的位置，如果没有出现则返回-1。

注意，这两个方法不能用来搜索 NaN 的位置，即它们无法确定数组成员是否包含 NaN。这是因为这两个方法内部，使用严格相等运算符（===）进行比较，而 NaN 是唯一一个不等于自身的值。

```js:no-line-numbers
var a = ['a', 'b', 'c'];

a.indexOf('b') // 1
a.indexOf('y') // -1

var a = [2, 5, 9, 2];
a.lastIndexOf(2) // 3
a.lastIndexOf(7) // -1

[NaN].indexOf(NaN) // -1
[NaN].lastIndexOf(NaN) // -1
```

## Array.from()

Array.from()方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

Array.from()还可以接受一个函数作为第二个参数，作用类似于数组的 map()方法，用来对每个元素进行处理，将处理后的值放入返回的数组。

```js:no-line-numbers
// 方法二
let set = new Set([1, 2, 3]);
set = new Set(Array.from(set, val => val * 2));
// set 的值是 2, 4, 6
```

## Array.of()

Array.of()方法用于将一组值，转换为数组。

```js:no-line-numbers
Array.of() // []
Array.of(undefined) // [undefined]
Array.of(1) // [1]
Array.of(1, 2) // [1, 2]
```

## copyWithin()

数组实例的 copyWithin()方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。**也就是说，使用这个方法，会修改当前数组。**

```js:no-line-numbers
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

它接受三个参数。这三个参数都应该是数值，如果不是，会自动转为数值。

> target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
> start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
> end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

## find()，findIndex()，findLast()，findLastIndex()

数组实例的 find()方法，用于找出第一个符合条件的数组成员。它的参数是一个回调函数，所有数组成员依次执行该回调函数，直到找出第一个返回值为 true 的成员，然后返回该成员。如果没有符合条件的成员，则返回 undefined。

数组实例的 findIndex()方法的用法与 find()方法非常类似，返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

ES2022 新增了两个方法 findLast()和 findLastIndex()，从数组的最后一个成员开始，依次向前检查，其他都保持不变。

## fill()

fill 方法使用给定值，填充一个数组。

```js:no-line-numbers
['a', 'b', 'c'].fill(7)
// [7, 7, 7]

new Array(3).fill(7)
// [7, 7, 7]
```

fill 方法还可以接受第二个和第三个参数，用于指定填充的起始位置和结束位置。

```js:no-line-numbers
['a', 'b', 'c'].fill(7, 1, 2)
// ['a', 7, 'c']
```

注意，如果填充的类型为对象，那么被赋值的是同一个内存地址的对象，而不是深拷贝对象。F

## flatMap()

flatMap()方法对原数组的每个成员执行一个函数（相当于执行 Array.prototype.map()），然后对返回值组成的数组执行 flat()方法。该方法返回一个新数组，不改变原数组。

## at()

ES2022 为数组实例增加了 at()方法，接受一个整数作为参数，返回对应位置的成员，并支持负索引。这个方法不仅可用于数组，也可用于字符串和类型数组（TypedArray）。如果参数位置超出了数组范围，at()返回 undefined。

## toReversed()，toSorted()，toSpliced()，with()

toReversed()对应 reverse()，用来颠倒数组成员的位置。
toSorted()对应 sort()，用来对数组成员排序。
toSpliced()对应 splice()，用来在指定位置，删除指定数量的成员，并插入新成员。
with(index, value)对应 splice(index, 1, value)，用来将指定位置的成员替换为新的值。
上面是这四个新方法对应的原有方法，含义和用法完全一样，唯一不同的是不会改变原数组，而是返回原数组操作后的拷贝。

## group()，groupToMap()

> 总之，按照字符串分组就使用 group()，按照对象分组就使用 groupToMap()。

group()的参数是一个分组函数，原数组的每个成员都会依次执行这个函数，确定自己是哪一个组。分组函数的返回值应该是字符串（或者可以自动转为字符串），以作为分组后的组名。

```js:no-line-numbers
const array = [1, 2, 3, 4, 5];

array.group((num, index, array) => {
  return num % 2 === 0 ? 'even': 'odd';
});
// { odd: [1, 3, 5], even: [2, 4] }
```

group()的返回值是一个对象，该对象的键名就是每一组的组名，即分组函数返回的每一个字符串（上例是 even 和 odd）；该对象的键值是一个数组，包括所有产生当前键名的原数组成员。

groupToMap()的作用和用法与 group()完全一致，唯一的区别是返回值是一个 Map 结构，而不是对象。Map 结构的键名可以是各种值，所以不管分组函数返回什么值，都会直接作为组名（Map 结构的键名），不会强制转为字符串。这对于分组函数返回值是对象的情况，尤其有用。

```js:no-line-numbers
const array = [1, 2, 3, 4, 5];

const odd = { odd: true };
const even = { even: true };
array.groupToMap((num, index, array) => {
return num % 2 === 0 ? even: odd;
});
// Map { {odd: true}: [1, 3, 5], {even: true}: [2, 4] }
```

上面示例返回的是一个 Map 结构，它的键名就是分组函数返回的两个对象 odd 和 even。

## 参考链接

- [https://wangdoc.com/javascript/types/array](https://wangdoc.com/javascript/types/array)

- [https://wangdoc.com/javascript/stdlib/array](https://wangdoc.com/javascript/stdlib/array)

- [https://wangdoc.com/es6/array](https://wangdoc.com/es6/array)
