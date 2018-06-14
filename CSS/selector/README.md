## CSS规则结构
![](./structure.jpeg)

## 多类选择器

```

p.warning.help {
  color: red;
}

<p class="warning help urgent">123</p>

```


## 属性选择器
```

p[data-v-142432] {
  color: red;
}

<p data-v-142432>version: CSS2</p>
<p>attribute-selector</p>

属性值选择器

// 完全匹配
p[class="warning urgent"] {
  color: red;
  font-size: 32px;
}
// 部分匹配
p[class~="urgent"] {
  font-weight: bold;
}

<div><p class="warning urgent">attributeSelector</p></div>
<div><p class="warning">attributeSelector</p></div>
<div><p class="urgent">attributeSelector</p></div>
```
