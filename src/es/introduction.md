---
prev: false
next: ./globalThis
category:
  - ECMAScript
tag:
  - ECMAScript
---

# 导论

所谓“脚本语言”（script language），指的是它不具备开发操作系统的能力，而是只用来编写控制其他大型应用程序（比如浏览器）的“脚本”。

<!-- more -->

## 什么是 JavaScript 语言？

JavaScript 是一种轻量级的脚本语言。**所谓“脚本语言”（script language），指的是它不具备开发操作系统的能力，而是只用来编写控制其他大型应用程序（比如浏览器）的“脚本”。**

JavaScript 也是一种嵌入式（embedded）语言。**它本身提供的核心语法不算很多，只能用来做一些数学和逻辑运算。JavaScript 本身不提供任何与 I/O（输入/输出）相关的 API，都要靠宿主环境（host）提供，所以 JavaScript 只合适嵌入更大型的应用程序环境，去调用宿主环境提供的底层 API。**

目前，已经嵌入 JavaScript 的宿主环境有多种，最常见的环境就是浏览器，另外还有服务器环境，也就是 Node 项目。

JavaScript 的核心语法部分相当精简，只包括**两个部分：基本的语法构造（比如操作符、控制结构、语句）和标准库（就是一系列具有各种功能的对象比如 Array、Date、Math 等）。除此之外，各种宿主环境提供额外的 API（即只能在该环境使用的接口），以便 JavaScript 调用。**

以浏览器为例，它提供的额外 API 可以分成三大类。

- DOM 类：操作网页的各种元素
- Web 类：实现互联网的各种功能（数组、对象、字符串等）
- 浏览器控制类：操作浏览器（浏览器地址栏、浏览器摄像头、浏览器数据库、多线程等）

如果宿主环境是服务器，则会提供各种操作系统的 API，比如文件操作 API、网络通信 API 等等。这些你都可以在 Node 环境中找到。

## ECMAScript 的历史

- ECMAScript 1.0 是 1997 年发布的，接下来的两年，连续发布了 ECMAScript 2.0（1998 年 6 月）和 ECMAScript 3.0（1999 年 12 月）。

* 2000 年，ECMAScript 4.0 开始酝酿。 2008 年 7 月 ECMA 开会决定，中止 ECMAScript 4.0 的开发，将其中涉及现有功能改善的一小部分，发布为 ECMAScript 3.1，而将其他激进的设想扩大范围，放入以后的版本，由于会议的气氛，该版本的项目代号起名为 Harmony（和谐）。会后不久，ECMAScript 3.1 就改名为 ECMAScript 5。

* 2009 年 12 月，ECMAScript 5.0 版正式发布。

* 2011 年 6 月，ECMAScript 5.1 版发布，并且成为 ISO 国际标准（ISO/IEC 16262:2011）。

* 2013 年 3 月，ECMAScript 6 草案冻结，不再添加新功能。新的功能设想将被放到 ECMAScript 7。

* 2013 年 12 月，ECMAScript 6 草案发布。然后是 12 个月的讨论期，听取各方反馈。

* 2015 年 6 月，ECMAScript 6 正式通过，成为国际标准，并且更名为“ECMAScript 2015”。**以后每年发布一个 ECMAScript 的版本，** 下一个版本在 2016 年发布，称为“ECMAScript 2016”，2017 年发布“ECMAScript 2017”，以此类推。

## 语法提案的批准流程

任何人都可以向标准委员会（又称 TC39 委员会）提案，要求修改语言标准。

一种新的语法从提案到变成正式标准，需要经历五个阶段。每个阶段的变动都需要由 TC39 委员会批准。

- Stage 0 - Strawman（展示阶段）
- Stage 1 - Proposal（征求意见阶段）
- Stage 2 - Draft（草案阶段）
- Stage 3 - Candidate（候选人阶段）
- Stage 4 - Finished（定案阶段）

一个提案只要能进入 Stage 2，就差不多肯定会包括在以后的正式标准里面。ECMAScript 当前的所有提案，可以在 TC39 的官方网站 [GitHub.com/tc39/ecma262](https://github.com/tc39/ecma262) 查看。

目前，各大浏览器对 ES6 的支持可以查看 [kangax.github.io/compat-table/es6/](https://kangax.github.io/compat-table/es6/)。

## 参考链接

- [https://wangdoc.com/javascript/basic/introduction](https://wangdoc.com/javascript/basic/introduction)

- [https://es6.ruanyifeng.com/#docs/intro](https://es6.ruanyifeng.com/#docs/intro)
