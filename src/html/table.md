---
prev: ./img
next: ./canvas
category:
  - HTML
tag:
  - HTML
  - HTML5
---

# `<table>`

## `<table>`，`<caption>`

`<table>`是一个块级容器标签，所有表格内容都要放在这个标签里面。

```html:no-line-numbers
<table>
  ... ...
</table>
```

`<caption>`总是`<table>`里面的第一个子元素，表示表格的标题。该元素是可选的。

```html:no-line-numbers
<table>
  <caption>示例表格</caption>
</table>
```

## `<thead>`、`<tbody>`、`<tfoot>`

`<thead>`、`<tbody>`、`<tfoot>`都是块级容器元素，且都是`<table>`的一级子元素，分别表示表头、表体和表尾。

```html:no-line-numbers
<table>
  <thead>... ...</thead>
  <tbody>... ...</tbody>
  <tfoot>... ...</tfoot>
</table>
```

这三个元素都是可选的。如果使用了`<thead>`，那么`<tbody>`和`<tfoot>`一定在`<thead>`的后面。如果使用了`<tbody>`，那么`<tfoot>`一定在`<tbody>`后面。

大型表格内部可以使用多个`<tbody>`，表示连续的多个部分。

## `<tr>`，`<th>`，`<td>`

`<tr>`标签表示表格的一行（table row）。如果表格有`<thead>`、`<tbody>`、`<tfoot>`，那么`<tr>`就放在这些容器元素之中，否则直接放在`<table>`的下一级。

```html:no-line-numbers
<table>
  <thead><tr>...</tr></thead>
  <tbody><tr>...</tr></tbody>
  <tfoot><tr>...</tr></tfoot>
  <tr>...</tr>
</table>
```

`<th>`和`<td>`都用来定义表格的单元格。其中，`<th>`是标题单元格，`<td>`是数据单元格。

```html:no-line-numbers
<table>
  <tr>
    <th>学号</th><th>姓名</th>
  </tr>
  <tr>
    <td>001</td><td>张三</td>
  </tr>
  <tr>
    <td>002</td><td>李四</td>
  </tr>
</table>
```

## `<colgroup>`，`<col>`

`<colgroup>`是`<table>`的一级子元素，用来包含一组列的定义。`<col>`是`<colgroup>`的子元素，用来定义表格的一列。

```html:no-line-numbers
<table>
  <colgroup>
    <col>
    <col>
    <col>
  </colgroup>
</table>
```

上面代码表明表格有 3 列。

`<col>`不仅是一个单独使用的标签，没有结束标志，而且还是一个空元素，没有子元素。它的主要作用，除了申明表格结构，还可以为表格附加样式。

```html:no-line-numbers
<table>
  <colgroup>
    <col class="c1">
    <col class="c2">
    <col class="c3">
  </colgroup>
  <tr>
    <td>1</td>
    <td>2</td>
    <td>3</td>
  </tr>
</table>
```

上面代码中，`<colgroup>`声明表格有三列，每一列有自己的 class，可以使用 CSS 针对每个 class 设定样式，会对整个表格生效。

`<col>`有一个 span 属性，值为正整数，默认为 1。如果大于 1，就表示该列的宽度包含连续的多列。

```html:no-line-numbers
<table>
  <colgroup>
    <col>
    <col span="2">
    <col>
  </colgroup>
</table>
```

上面代码中，表格的表头定义了 3 列，实际数据有 4 列。表头的第 2 列会连续跨 2 列。

## colspan 属性，rowspan 属性

单元格会有跨越多行或多列的情况，这要通过 colspan 属性和 rowspan 属性设置，前者表示单元格跨越的列数，后者表示单元格跨越的行数。它们的值都是一个非负整数，默认为 1。

```html:no-line-numbers
<table>
  <tr>
    <td colspan="2">A</td><td>B</td>
  </tr>
  <tr>
    <td>A</td><td>B</td><td>C</td>
  </tr>
</table>
```

上面代码中，第一行的第一个单元格会跨两列。
