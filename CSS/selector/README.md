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

## 伪类和伪元素
