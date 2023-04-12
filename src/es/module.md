---
prev: ./operator
next: ./intersectionObserver
category:
  - ECMAScript
tag:
  - ECMAScript
star: true
---

# Module

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。

export 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。这一点与 CommonJS 规范完全不同。CommonJS 模块输出的是值的缓存，不存在动态更新。

import 命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

export 和 import 语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，foo 和 bar 实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用 foo 和 bar。

```js:no-line-numbers

import {a} from './xxx.js'
a = {}; // Syntax Error : 'a' is read-only;

export { foo, bar } from 'my_module';
// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

<!-- more -->

## 概述

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器。

ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

```js:no-line-numbers
// CommonJS模块
let { stat, exists, readfile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```

上面代码的实质是整体加载 fs 模块（即加载 fs 的所有方法），生成一个对象（\_fs），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，再通过 import 命令输入。

```js:no-line-numbers
// ES6 模块
import { stat, exists, readFile } from 'fs';
```

上面代码的实质是从 fs 模块加载 3 个方法，其他方法不加载。这种加载称为“编译时加载”或者静态加载，即 ES6 可以在编译时就完成模块加载，效率要比 CommonJS 模块的加载方式高。当然，这也导致了**没法引用 ES6 模块本身，因为它不是对象。**

由于 ES6 模块是编译时加载，使得静态分析成为可能。有了它，就能进一步拓宽 JavaScript 的语法，比如引入宏（macro）和类型检验（type system）这些只能靠静态分析实现的功能。

除了静态加载带来的各种好处，ES6 模块还有以下好处。

- 不再需要 UMD 模块格式了，将来服务器和浏览器都会支持 ES6 模块格式。目前，通过各种工具库，其实已经做到了这一点。
- 将来浏览器的新 API 就能用模块格式提供，不再必须做成全局变量或者 navigator 对象的属性。
- 不再需要对象作为命名空间（比如 Math 对象），未来这些功能可以通过模块提供。

## 加载规则

浏览器加载 ES6 模块，也使用`<script>`标签，但是要加入 type="module"属性。

浏览器对于带有 type="module"的`<script>`，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`<script>`标签的 defer 属性。

```js:no-line-numbers
<script type="module" src="./foo.js"></script>
// 等同于
<script type="module" src="./foo.js" defer></script>
```

ES6 模块也允许内嵌在网页中，语法行为与加载外部脚本完全一致。

```js:no-line-numbers
<script type="module">
  import utils from "./utils.js";
  // other code
</script>
```

## export 命令

**一个模块就是一个独立的文件。** 该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用 export 关键字输出该变量。

通常情况下，export 输出的变量就是本来的名字，但是可以使用 as 关键字重命名。

```js:no-line-numbers
function v1() { ... }
function v2() { ... }

export {
  v1 as streamV1,
  v2 as streamV2,
  v2 as streamLatestVersion
};
```

另外，export 语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。

```js:no-line-numbers
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);
```

上面代码输出变量 foo，值为 bar，500 毫秒之后变成 baz。

## import 命令

如果想为输入的变量重新取一个名字，import 命令要使用 as 关键字，将输入的变量重命名。

```js:no-line-numbers
import { lastName as surname } from './profile.js';
```

import 命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。

```js:no-line-numbers
import {a} from './xxx.js'

a = {}; // Syntax Error : 'a' is read-only;
```

上面代码中，脚本加载了变量 a，对其重新赋值就会报错，因为 a 是一个只读的接口。但是，如果 a 是一个对象，改写 a 的属性是允许的。

```js:no-line-numbers
import {a} from './xxx.js'

a.foo = 'hello'; // 合法操作
```

上面代码中，a 的属性可以成功改写，并且其他模块也可以读到改写后的值。不过，这种写法很难查错，**建议凡是输入的变量，都当作完全只读，不要轻易改变它的属性。**

注意，import 命令具有提升效果，会提升到整个模块的头部，首先执行。

```js:no-line-numbers
foo();

import { foo } from 'my_module';
```

import 语句会执行所加载的模块

```js:no-line-numbers
import 'lodash';
import 'lodash';
```

如果多次重复执行同一句 import 语句，那么只会执行一次，而不会执行多次。

## 模块的整体加载

```js:no-line-numbers
import * as circle from './circle';

console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));
```

## export default 命令

从前面的例子可以看出，使用 import 命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。但是，用户肯定希望快速上手，未必愿意阅读文档，去了解模块有哪些属性和方法。

为了给用户提供方便，让他们不用阅读文档就能加载模块，就要用到 export default 命令，为模块指定默认输出。

```js:no-line-numbers
// export-default.js
export default function () {
  console.log('foo');
}
// import-default.js
import customName from './export-default';
customName(); // 'foo'
```

上面代码的 import 命令，可以用任意名称指向 export-default.js 输出的方法，这时就不需要知道原模块输出的函数名。需要注意的是，这时 import 命令后面，不使用大括号。

export default 命令用在非匿名函数前，也是可以的。

```js:no-line-numbers
// export-default.js
export default function foo() {
  console.log('foo');
}
// 或者写成
function foo() {
  console.log('foo');
}
export default foo;
```

**上面代码中，foo 函数的函数名 foo，在模块外部是无效的。加载的时候，视同匿名函数加载。**

export default 命令用于指定模块的默认输出。显然，一个模块只能有一个默认输出，因此 export default 命令只能使用一次。所以，import 命令后面才不用加大括号，因为只可能唯一对应 export default 命令。

本质上，export default 就是输出一个叫做 default 的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。

```js:no-line-numbers
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

export default 也可以用来输出类。

```js:no-line-numbers
// MyClass.js
export default class { ... }

// main.js
import MyClass from 'MyClass';
let o = new MyClass();
```

## export 与 import 的复合写法（模块继承，整理常量）

如果在一个模块之中，先输入后输出同一个模块，import 语句可以与 export 语句写在一起。

```js:no-line-numbers
export { foo, bar } from 'my_module';
// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

上面代码中，export 和 import 语句可以结合在一起，写成一行。但需要注意的是，写成一行以后，foo 和 bar 实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用 foo 和 bar。

模块的接口改名和整体输出，也可以采用这种写法。

```js:no-line-numbers
export { foo, bar } from 'my_module';
// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

模块之间也可以继承。

假设有一个 circleplus 模块，继承了 circle 模块。

```js:no-line-numbers
// circleplus.js

export _ from 'circle';
export var e = 2.71828182846;
export default function(x) {
return Math.exp(x);
}
```

上面代码中的 export \_，表示再输出 circle 模块的所有属性和方法。

## import()

### 简介

ES2020 提案 引入 import()函数，支持动态加载模块。

import()函数与所加载的模块没有静态连接关系，这点也是与 import 语句不相同。import()类似于 Node.js 的 require()方法，区别主要是前者是异步加载，后者是同步加载。

import()返回 Promise
对象，所以需要使用 then()方法指定处理函数。考虑到代码的清晰，更推荐使用 await 命令。

```js:no-line-numbers
async function renderWidget() {
  const container = document.getElementById('widget');
  if (container !== null) {
    // 等同于
    // import("./widget").then(widget => {
    //   widget.render(container);
    // });
    const widget = await import('./widget.js');
    widget.render(container);
  }
}

renderWidget();
```

### 注意点

import()加载模块成功以后，这个模块会作为一个对象，当作 then 方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口。

```js:no-line-numbers
import('./myModule.js')
.then(({export1, export2,default: theDefault}) => {
 console.log(export1, export2,theDefault);
});
```

如果想同时加载多个模块，可以采用下面的写法。

```js:no-line-numbers
Promise.all([
  import('./module1.js'),
  import('./module2.js'),
  import('./module3.js'),
])
.then(([module1, module2, module3]) => {
   ···
});

async function main() {
  const myModule = await import('./myModule.js');
  const {export1, export2} = await import('./myModule.js');
  const [module1, module2, module3] =
    await Promise.all([
      import('./module1.js'),
      import('./module2.js'),
      import('./module3.js'),
    ]);
}
main();
```

## import.meta

开发者使用一个模块时，有时需要知道模板本身的一些信息（比如模块的路径）。ES2020 为 import 命令添加了一个元属性 import.meta，返回当前模块的元信息。

import.meta 只能在模块内部使用，如果在模块外部使用会报错。

这个属性返回一个对象，该对象的各种属性就是当前运行的脚本的元信息。具体包含哪些属性，标准没有规定，由各个运行环境自行决定。一般来说，import.meta 至少会有下面两个属性。

### import.meta.url

### import.meta.scriptElement

import.meta.scriptElement 是浏览器特有的元属性，返回加载模块的那个`<script>`元素，相当于 document.currentScript 属性。

```js:no-line-numbers
// HTML 代码为
// <script type="module" src="my-module.js" data-foo="abc"></script>

// my-module.js 内部执行下面的代码
import.meta.scriptElement.dataset.foo
// "abc"
```

### import.meta.url

import.meta.url 返回当前模块的 URL 路径。举例来说，当前模块主文件的路径是https://foo.com/main.js，import.meta.url就返回这个路径。

## Node.js 的模块加载方法

Node.js 要求 ES6 模块采用.mjs 后缀文件名。也就是说，只要脚本文件里面使用 import 或者 export 命令，那么就必须采用.mjs 后缀名。

如果不希望将后缀名改成.mjs，可以在项目的 package.json 文件中，指定 type 字段为 module。

```json:no-line-numbers
{
   "type": "module"
}
```

一旦设置了以后，该项目的 JS 脚本，就被解释成 ES6 模块。

如果这时还要使用 CommonJS 模块，那么需要将 CommonJS 脚本的后缀名都改成.cjs。如果没有 type 字段，或者 type 字段为 commonjs，则.js 脚本会被解释成 CommonJS 模块。

总结为一句话：.mjs 文件总是以 ES6 模块加载，.cjs 文件总是以 CommonJS 模块加载，.js 文件的加载取决于 package.json 里面 type 字段的设置。

注意，ES6 模块与 CommonJS 模块尽量不要混用。require 命令不能加载.mjs 文件，会报错，只有 import 命令才可以加载.mjs 文件。反过来，.mjs 文件里面也不能使用 require 命令，必须使用 import。

### package.json 的 main 字段

package.json 文件有两个字段可以指定模块的入口文件：main 和 exports。比较简单的模块，可以只使用 main 字段，指定模块加载的入口文件。

```json:no-line-numbers
// ./node_modules/es-module-package/package.json
{
"type": "module",
"main": "./src/index.js"
}
```

上面代码指定项目的入口脚本为./src/index.js，它的格式为 ES6 模块。如果没有 type 字段，index.js 就会被解释为 CommonJS 模块。

然后，import 命令就可以加载这个模块。

```js:no-line-numbers
// ./my-app.mjs
import { something } from 'es-module-package';
// 实际加载的是 ./node_modules/es-module-package/src/index.js
```

上面代码中，运行该脚本以后，Node.js 就会到./node_modules 目录下面，寻找 es-module-package 模块，然后根据该模块 package.json 的 main 字段去执行入口文件。

这时，如果用 CommonJS 模块的 require()命令去加载 es-module-package 模块会报错，因为 CommonJS 模块不能处理 export 命令。

### package.json 的 exports 字段

exports 字段的优先级高于 main 字段。它有多种用法。

### CommonJS 模块加载 ES6 模块

### ES6 模块加载 CommonJS 模块
