## 颜色
> RGB
<br>
<br>
R: red
<br>
G: green
<br>
B: blue
<br>
<br>
rgb(25%, 60%, 30%)  百分比与整数的转换是将百分比乘以255。最终得出结果 rgb(63.75, 153, 76.5)

> CSS允许简写十六进制

```css
h1 {
  color: #fff
}
h1 {
  color: #666
}
h1 {
  color: #000
}
h1 {
  color: #f00;
}
```

#FFF等价于：#FFFFFF、#666等价于#666666、#000等价于#000000、#f00则等价于#ff0000。

其原因是浏览器会取一位，将其复制成两位。但是并非每种颜色都可以采取这种写法。

比如十六进制色值为：#606060

假如简写：#666的话，就会将其复制为：#666666。

### 关于单位

> 除了需要打印以外，我们几乎不会去使用到绝对长度单位。英寸，厘米，毫米等长度单位。因为需要根据用户的屏幕分辨率去相对的展示页面大小等。

> 相对长度单位：em、px、rem、ex。

px代表像素、一个像素就是在显示器上看到的一个点。这个值是相对单位，因为它取决于显示设备的分辨率。

### URL

> 使用相对URL的地方几乎总能用一个绝对URL来替换


### inherit

> inherit 使一个属性的值与父元素的值相同。指定继承

```css
div {
  color: blue;
  border: solid 1px #ccc;
}
p {
  color: inherit;
  border: inherit;
}
a {
  color: inherit;
  border: inherit;
}
```
```html
<div>
  <p>我去废弃物废弃物请问物权法<a href="#">全服务器我去</a></p>
</div>
```
