---
article: false
pageview: true
prev: false
next: false
---

# npm-run-all

为了解决官方的 npm run 命令无法同时运行多个脚本的问题，它可以把诸如 npm run clean && npm run build:css && npm run build:js && npm run build:html 的一长串的命令通过 glob 语法简化成 npm-run-all clean build:\* 这样精致小巧的模样。再者大家也知道 shell 的 & 语法实际上是不支持 cshell 的，为了跨平台也最好使用这样的第三方库来提供支持。

<!-- more -->

## 安装

```shell
npm install npm-run-all --save-dev
//或者
yarn add npm-run-all --dev
```

## 使用方法

这个包提供三个命令，分别是 npm-run-all run-s run-p，其中后两个都是 npm-run-all 带参数的简写，分别对应串行和并行。

```shell
run-s ==> npm-run-all --serial

run-p ==> npm-run-all --parallel
```

### 顺序执行

```shell
npm-run-all clean lint build
```

依次执行三个任务，注意如果某个脚本退出时返回值为空值，那么后续脚本默认是不会执行的，你可以使用参数 ==--continue-on-error== 来规避这种行为。

```shell
npm-run-all --continue-on-error lint build
```

### 并行执行

```shell
npm-run-all --parallel lint build
```

同时执行这两个任务，需要注意如果脚本退出时返回空值，所有其它子进程都会被 SIGTERM 信号中断，同样可以用 ==--continue-on-error== 参数禁用行为。

```shell
npm-run-all --parallel --continue-on-error lint build
```

### 混合执行

```shell
npm-run-all clean lint --parallel watch:html watch:js
```

这段命令首先按顺序执行 clean lint 两个脚本，然后同时执行 watch:html 和 watch:js 的任务。

```shell
npm-run-all a b --parallel c d --sequential e f --parallel g h i
// or
$ npm-run-all a b --parallel c d --serial e f --parallel g h i
```

这段命令通过以下顺序执行：

顺序运行 a 和 b；
然后同时运行 c 和 d；
再依次运行 e 和 f；
最后同时执行 g, h, i。

## Glob-like 名称匹配

你可以使用 Glob 通配符来匹配任务名称，方便指定多个名称相似的任务，和标准语法不同的是分隔符由 / 改为 : 以适应需要。

```shell
npm-run-all --parallel watch:\*
```

不匹配分隔符，同时运行 watch:html watch:js 但不运行 watch:js:index。

```shell
npm-run-all --parallel watch:\*\*
```

匹配分隔符，所有以 watch: 开头的脚本都会被运行。

### 附带运行参数

在脚本名称后使用双引号包裹来提供参数，甚至还支持用占位符，延迟到运行命令时再提供参数。

```shell
npm-run-all build "start-server -- --port {1}" -- 8080
```

上例是占位符的工作方式，实际使用时可以这样编写 package.json：

```json
{
  "scripts": {
    "start": "npm-run-all build \"start-server -- --port {1}\" --"
  }
}
```

## Node API

这个库还提供了面向 Node 的模块接口，示例如下，具体请参考官方文档。

```js
const runAll = require("npm-run-all");

runAll(["clean", "lint", "build:*"], { parallel: false })
  .then(() => {
    console.log("done!");
  })
  .catch((err) => {
    console.log("failed!");
  });

runAll(["build:* -- --watch"], { parallel: true })
  .then(() => {
    console.log("done!");
  })
  .catch((err) => {
    console.log("failed!");
  });
```

```

```
