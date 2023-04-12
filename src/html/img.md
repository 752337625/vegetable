---
prev: ./dialog
next: ./table
category:
  - HTML
tag:
  - HTML
  - HTML5
---

# `<img>`，`<figure>`，`<figcaption>`，`<picture>`

`<img>`你不知道的内容

<!-- more -->

## img

### width 属性，height 属性

图片默认以原始大小插入网页，width 属性和 height 属性可以指定图片显示时的宽度和高度，单位是像素或百分比。

```html:no-line-numbers
<img src="foo.jpg" width="400" height="300">
```

上面代码中，width 属性指定图片显示的宽度为 400 像素，height 属性指定显示高度为 300 像素。

注意，一旦设置了这两个属性，浏览器会在网页中预先留出这个大小的空间，不管图片有没有加载成功。不过，由于图片的显示大小可以用 CSS 设置，所以不建议使用这两个属性。
一种特殊情况是，width 属性和 height 属性只设置了一个，另一个没有设置。这时，浏览器会根据图片的原始大小，自动设置对应比例的图片宽度或高度。举例来说，图片大小是 800 像素 x 800 像素，width 属性设置成 200，那么浏览器会自动将 height 设成 200。

### srcset，sizes

- **srcset**

srcset 属性用来指定多张图像，适应不同像素密度的屏幕。它的值是一个逗号分隔的字符串，每个部分都是一张图像的 URL，后面接一个空格，然后是像素密度的描述符。请看下面的例子。

```html:no-line-numbers
<img srcset="foo-320w.jpg,foo-480w.jpg 1.5x,foo-640w.jpg 2x" src="foo-640w.jpg" />
```

上面代码中，srcset 属性给出了三个图像 URL，适应三种不同的像素密度。

图像 URL 后面的`像素密度描述符`，格式是像素密度倍数 + 字母 x。1x 表示单倍像素密度，可以省略。浏览器根据当前设备的像素密度，选择需要加载的图像。

如果 srcset 属性都不满足条件，那么就加载 src 属性指定的默认图像。

```html:no-line-numbers
<img srcset="foo-160.jpg 160w,
             foo-320.jpg 320w,
             foo-640.jpg 640w,
             foo-1280.jpg 1280w"
     src="foo-1280.jpg">
```

图像 URL 后面的`宽度描述符`就是图像原始的宽度，加上字符 w。上例的四种图片的原始宽度分别为 160 像素、320 像素、640 像素和 1280 像素。

- **sizes**

像素密度的适配，只适合显示区域一样大小的图像。如果希望不同尺寸的屏幕，显示不同大小的图像，srcset 属性就不够用了，必须搭配 sizes 属性。

**第一步，srcset 属性列出所有可用的图像。**

```html:no-line-numbers
<img srcset="foo-160.jpg 160w,
             foo-320.jpg 320w,
             foo-640.jpg 640w,
             foo-1280.jpg 1280w"
     src="foo-1280.jpg">
```

上面代码中，srcset 属性列出四张可用的图像，每张图像的 URL 后面是一个空格，再加上宽度描述符。

宽度描述符就是图像原始的宽度，加上字符 w。上例的四种图片的原始宽度分别为 160 像素、320 像素、640 像素和 1280 像素。

**第二步，sizes 属性列出不同设备的图像显示宽度。**

sizes 属性的值是一个逗号分隔的字符串，除了最后一部分，前面每个部分都是一个放在括号里面的媒体查询表达式，后面是一个空格，再加上图像的显示宽度。

```html:no-line-numbers
<img srcset="foo-160.jpg 160w,
             foo-320.jpg 320w,
             foo-640.jpg 640w,
             foo-1280.jpg 1280w"
     sizes="(max-width: 440px) 100vw,
            (max-width: 900px) 33vw,
            254px"
     src="foo-1280.jpg">
```

上面代码中，sizes 属性给出了三种屏幕条件，以及对应的图像显示宽度。宽度不超过 440 像素的设备，图像显示宽度为 100%；宽度 441 像素到 900 像素的设备，图像显示宽度为 33%；宽度 900 像素以上的设备，图像显示宽度为 254px。

**第三步，浏览器根据当前设备的宽度，从 sizes 属性获得图像的显示宽度，然后从 srcset 属性找出最接近该宽度的图像，进行加载。**

假定当前设备的屏幕宽度是 480px，浏览器从 sizes 属性查询得到，图片的显示宽度是 33vw（即 33%），等于 160px。srcset 属性里面，正好有宽度等于 160px 的图片，于是加载 foo-160.jpg。

如果省略 sizes 属性，那么浏览器将根据实际的图像显示宽度，从 srcset 属性选择最接近的图片。一旦使用 sizes 属性，就必须与 srcset 属性搭配使用，单独使用 sizes 属性是无效的。

### loading

浏览器的默认行为是，只要解析到<img>标签，就开始加载图片。对于很长的网页，这样做很浪费带宽，因为用户不一定会往下滚动，一直看到网页结束。用户很可能是点开网页，看了一会就关掉了，那些不在视口的图片加载的流量，就都浪费了。

loading 属性改变了这个行为，可以指定图片的懒加载，即图片默认不加载，只有即将滚动进入视口，变成用户可见时才会加载，这样就节省了带宽。

loading 属性可以取以下三个值。

> - auto：浏览器默认行为，等同于不使用 loading 属性。
> - lazy：启用懒加载。
> - eager：立即加载资源，无论它在页面上的哪个位置。

```html:no-line-numbers
<img src="image.png" loading="lazy" alt="…" width="200" height="200">
```

由于行内图片的懒加载，可能会导致页面布局重排，所以使用这个属性的时候，最好指定图片的高和宽。

## figure、figcaption

`<figure>`标签可以理解为一个图像区块，将图像和相关信息封装在一起。`<figcaption>`是它的可选子元素，表示图像的文本描述，通常用于放置标题，可以出现多个。

```html:no-line-numbers
<figure>
  <img src="https://example.com/foo.jpg">
  <figcaption>示例图片</figcaption>
</figure>
```

除了图像，`<figure>`还可以封装引言、代码、诗歌等等。它等于是一个将主体内容与附加信息，封装在一起的语义容器。

```html:no-line-numbers
<figure>
  <figcaption>JavaScript 代码示例</figcaption>
  <p><code>const foo = 'hello';</code></p>
</figure>
```

## pictures

### 响应式用法

`<picture>`是一个容器标签，内部使用`<source>`和`<img>`，指定不同情况下加载的图像。

```html:no-line-numbers
<picture>
  <source media="(max-width: 500px)" srcset="cat-vertical.jpg">
  <source media="(min-width: 501px)" srcset="cat-horizontal.jpg">
  <img src="cat.jpg" alt="cat">
</picture>
```

上面代码中，`<picture>`标签内部有两个`<source>`标签和一个`<img>`标签。

`<picture>`内部的`<source>`标签，主要使用 media 属性和 srcset 属性。media 属性给出媒体查询表达式，srcset 属性就是`<img>`标签的 srcset 属性，给出加载的图像文件。sizes 属性其实这里也可以用，但由于有了 media 属性，就没有必要了。

浏览器按照`<source>`标签出现的顺序，依次判断当前设备是否满足 media 属性的媒体查询表达式，如果满足就加载 srcset 属性指定的图片文件，并且不再执行后面的`<source>`标签和`<img>`标签。

`<img>`标签是默认情况下加载的图像，用来满足上面所有`<source>`都不匹配的情况，或者不支持`<picture>`的老式浏览器。

上面例子中，设备宽度如果不超过 500px，就加载竖屏的图像，否则加载横屏的图像。

下面给出一个例子，同时考虑屏幕尺寸和像素密度的适配。

```html:no-line-numbers
<picture>
  <source srcset="homepage-person@desktop.png,
                  homepage-person@desktop-2x.png 2x"
          media="(min-width: 990px)">
  <source srcset="homepage-person@tablet.png,
                  homepage-person@tablet-2x.png 2x"
          media="(min-width: 750px)">
  <img srcset="homepage-person@mobile.png,
               homepage-person@mobile-2x.png 2x"
       alt="Shopify Merchant, Corrine Anestopoulos">
</picture>
```

上面代码中，`<source>`标签的 media 属性给出屏幕尺寸的适配条件，每个条件都用 srcset 属性，再给出两种像素密度的图像 URL。

### 图像格式的选择

除了响应式图像，`<picture>`标签还可以用来选择不同格式的图像。比如，如果当前浏览器支持 Webp 格式，就加载这种格式的图像，否则加载 PNG 图像。

```html:no-line-numbers
<picture>
  <source type="image/svg+xml" srcset="logo.xml">
  <source type="image/webp" srcset="logo.webp">
  <img src="logo.png" alt="ACME Corp">
</picture>
```

上面代码中，`<source>`标签的 type 属性给出图像的 MIME 类型，srcset 是对应的图像 URL。

浏览器按照`<source>`标签出现的顺序，依次检查是否支持 type 属性指定的图像格式，如果支持就加载图像，并且不再检查后面的`<source>`标签了。上面例子中，图像加载优先顺序依次为 svg 格式、webp 格式和 png 格式。

## 参考链接

- [https://wangdoc.com/html/image](https://wangdoc.com/html/image)
