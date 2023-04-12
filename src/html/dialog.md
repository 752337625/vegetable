---
prev: false
next: ./img
category:
  - HTML
tag:
  - HTML
  - HTML5
---

# `<dialog>`，`<details>`，`<summary>`

`<dialog>`经常被使用的标签

<!-- more -->

## dialog

### 基本用法

`<dialog>`默认情况下，对话框是隐藏的，不会在网页上显示。如果要让对话框显示，必须加上 open 属性。

```js:no-line-numbers
<dialog>
  Hello world
</dialog>

<dialog open>
  Hello world
</dialog>
```

### JavaScript API

`<dialog>`元素的 JavaScript API 提供 Dialog.showModal()和 Dialog.close()两个方法，用于打开/关闭对话框。

```js:no-line-numbers
const modal = document.querySelector('dialog');
// 对话框显示，相当于增加 open 属性
modal.showModal();
// 对话框关闭，相当于移除 open 属性
modal.close();
```

开发者可以提供关闭按钮，让其调用 Dialog.close()方法，关闭对话框。

Dialog.showModal()方法唤起对话框时，会有一个透明层，阻止用户与对话框外部的内容互动。CSS 提供了一个 Dialog 元素的::backdrop 伪类，用于选中这个透明层，因此可以编写样式让透明层变得可见。

```css:no-line-numbers
dialog {
  padding: 0;
  border: 0;
  border-radius: 0.6rem;
  box-shadow: 0 0 1em black;
}

dialog::backdrop {
  /* make the backdrop a semi-transparent black */
  background-color: rgba(0, 0, 0, 0.4);
}
```

上面代码不仅为`<dialog>`指定了样式，还将对话框的透明层变成了灰色透明。

`<dialog>`元素还有一个 Dialog.show()方法，也能唤起对话框，但是没有透明层，用户可以与对话框外部的内容互动。

### 事件

`<dialog>`元素有两个事件，可以监听。

- close：对话框关闭时触发
- cancel：用户按下 esc 键关闭对话框时触发

如果希望用户点击透明层，就关闭对话框，可以用下面的代码。

```js:no-line-numbers
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close('cancelled');
  }
});
```

## details，summary

### 基本用法

`<details>`标签用来折叠内容，浏览器会折叠显示该标签的内容。`<details>`标签的 open 属性，用于默认打开折叠。

```HTML:no-line-numbers
<details>
这是一段解释文本。
</details>

▶ Details

<details open>
这是一段解释文本。
</details>

▼ Details
这是一段解释文本。
```

`<summary>`标签用来定制折叠内容的标题。

```HTML:no-line-numbers
<details>
  <summary>这是标题</summary>
	<p>这是一段解释文本。</p>
	<p>这是一段解释文本。</p>
	<p>这是一段解释文本。</p>
	<p>这是一段解释文本。</p>
</details>

▼ 这是标题
这是一段解释文本。
这是一段解释文本。
这是一段解释文本。
这是一段解释文本。
```

通过 CSS 设置 summary::-webkit-details-marker，可以改变标题前面的三角箭头。

```css:no-line-numbers
summary::-webkit-details-marker {
  background: url(https://example.com/foo.svg);
  color: transparent;
}
/* 或 */
summary::-webkit-details-marker {
  display: none;
}
summary:before {
  content: "\2714";
  color: #696f7c;
  margin-right: 5px;
}
```

### JavaScript API

Details 元素的 open 属性返回`<details>`当前是打开还是关闭。

```js:no-line-numbers
const details = document.querySelector('details');

if (detail.open === true) {
  // 展开状态
} else {
  // 折叠状态
}
```

Details 元素有一个 toggle 事件，打开或关闭折叠时，都会触发这个事件。

```js:no-line-numbers
details.addEventListener('toggle', event => {
  if (details.open) {
    /* 展开状况 */
  } else {
    /* 折叠状态 */
  }
});
```

## 参考链接

- [https://wangdoc.com/html/elements](https://wangdoc.com/html/elements)
