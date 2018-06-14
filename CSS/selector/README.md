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
```css
ol + ul > li + li + li {
  color: blue;
}
```
```html
<div>
  <ol>
    <li>ol:1</li>
    <li>ol:2</li>
    <li>ol:3</li>
  </ol>
  <ul>
    <li>li:1</li>
    <li>li:2</li>
    <li>li:3</li>
  </ul>
</div>
```
