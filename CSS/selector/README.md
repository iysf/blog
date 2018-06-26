## CSS规则结构
![](./structure.jpeg)

## 多类选择器

```css
p.warning.help {
  color: red;
}
```
```html
<p class="warning help urgent">123</p>
```


## 属性选择器
```css
p[data-v-142432] {
  color: red;
}
```
```html
<p data-v-142432>version: CSS2</p>
<p>attribute-selector</p>
```
> 属性值选择器

```css
/* 完全匹配 */
p[class="warning urgent"] {
  color: red;
  font-size: 32px;
}
/* 部分匹配 */
p[class~="urgent"] {
  font-weight: bold;
}
```

```html
<div><p class="warning urgent">attributeSelector</p></div>
<div><p class="warning">attributeSelector</p></div>
<div><p class="urgent">attributeSelector</p></div>
```

## 元素相邻选择器
> 元素相邻选择器有两个特点：
  - 紧接在另一元素后
  - 二者有相同父元素

> 现在假如要选择 class为main中的 span相邻的p标签

```css
.main > span + p {
  color: red
}
```
```html
<div class="main">
  <div>div1</div>
  <span>span1</span>
  <p>P1</p>
  <em>span2</em>
  <p>P2</p>
</div>
```

## 伪类选择器

##### 静态伪类

> first-child (兼容IE7)
  ```css
  p:first-child {
    color: yellow;
  }
  li:first-child {
    color: red;
    /* 将文字变成大写 */
    text-transform: uppercase;
  }
  div:nth-child(1) {
    color: #fff;
    background-color: #000;
  }
  ```
  ```html
  <div class="main">
    <p>p1</p>
    <ul>
      <li>li1</li>
      <li>li2</li>
      <li>li3</li>
    </ul>
    <p>p2</p>
  </div>
  ```  

##### 动态伪类

> hover

>

## 伪元素选择器

> first-letter

```css
/* 第一个文字 */
p::first-letter {
  color: red;
  font-size: 36px;
}
li {
  width: 200px;
}
/* 第一行 */
li::first-line {
  color: yellow;
  display: block;
}
```
```html
<p>请问访问我去王府井破为契机否破解我强迫去</p>
<ul>
  <li>废弃物服务器请问服去污粉物权法qwop金佛全物品请问去污粉请问废弃物王强务器请问</li>
  <li>废弃物服务器请问服去污粉物权法qwop金佛全物品请问去污粉请问废弃物王强务器请问</li>
</ul>
```

> before or after

```css
span::after {
  content: "The End";
}
span::before {
  content: "The Start"
}
```

```html
<span></span>
```


> 用户代理通常必须慎用选择器


## selector 优先级

> id = 0, 1, 0, 0;

> class = 0, 0, 1, 0;

> Element = 0, 0, 0, 1;

```css
.selector_p {
  color: red;
}
#selector_p {
  color: blue;
}
p {
  color: yellow;
}
```
```html
<p class="selector_p" id="selector_p">selector priority</p>
```

## 通配
```css
/* 0, 0, 0, 0 */
* {
  font-size: 40px;
  font-weight: bold;
}
/* 0, 0, 0, 2 */
div p {
  font-size: 12px;
  font-weight: normal;
}
```
```html
<div>
  <p class="selector_p" id="selector_p">selector priority</p>
</div>
```

注：假如优先级相同的选择器，最终在css代码的底端的规则会生效。

## id or attribute selector

```css
/* 0, 0, 1, 4 */
html > body div span['#selector_span']{
  font-size: 40px;
  font-weight: bold;
}
/* 0, 1, 0, 1 */
span#selector_span{
  font-size: 12px;
  font-weight: normal;
}
```
```html
<body>
  <p class="selector_p" id="selector_p">selector priority</p>
  <div>
    <span id="selector_span">安抚请问废弃物</span>
  </div>
</body>
```

## 内联样式的优先级
```css
/* 0, 1, 0, 1 */
span#selector_span{
  font-size: 12px;
  font-weight: normal;
}
```
```html
<!-- 内联样式优先级： 1, 0, 0, 0 -->
<span id="selector_span" style="font-size: 50px">安抚请问废弃物</span>
```
以前ID选择器的优先级与内联样式的优先级一样高，由于ID选择器很容易覆盖内联样式，在CSS2.1中将 1, 0, 0 改为 1, 0, 0, 0

## important
