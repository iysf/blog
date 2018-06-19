## DOM selector

> jQuery中很有意思的一个事情是：
```JavaScript
$('#app').html('abc')
```
这样连续调用了两个Api，那么它内部到底是怎么样的运行过程？

我先直接上代码了，稍后解读。

```html
<div id="app"></div>
<div class="box"></div>
<div class="box"></div>
```

```js
var $$ = function (selector) {
  this.selector = Array.from(document.querySelectorAll(selector))
  return this
}
$$.prototype = {
  constructor: $$,
  // The current version of jQuery being used
  version: '1.0',

  // The default length of a jQuery object is 0
  length: 0,

  // Start with an empty selector
  selector: [],

  //
  html: function (text) {
    this.selector.forEach(function (item, index) {
      item.innerHTML = text
    })
    return this
  }
}

console.log(new $$('#app').html('a'))
console.log(new $$('.box').html('abc'))

```

可以看出，最终调用方式是这样的： new $$('#app')......

在我们使用jQuery的时候，实际调用方式是这样的： $('#app')......

那么需要解决一些问题，在上面的$$函数中，return的是this，实则this指向到window。

那么需要将 $$() 调用完毕以后返回一个 $$函数的实例，才可以调用$$.prototype定义的方法及属性。

请看以下代码：

```HTML
<div id="app"></div>
<div class="box"></div>
<div class="box"></div>
```

```js
function $ (selector) {
  return new $.prototype.init(selector)
}

$.prototype = {
  constructor: $,
  // The current version of jQuery being used
  version: '1.0',

  // The default length of a jQuery object is 0
  length: 0,

  // Start with an empty selector
  selector: [],

  //
  html: function (text) {
    this.selector.forEach(function (item, index) {
      item.innerHTML = text
    })
    return this
  }
}

$.prototype.init = function (selector) {
  // console.log(this)
  this.selector = Array.from(document.querySelectorAll(selector))
}

$.prototype.init.prototype = $.prototype

console.log($('#app').html('a'))
console.log($('.box').html('abc'))

```

有以下的几个问题

* new $.prototype.init()
* $.prototype.init.prototype = $.prototype

## onload selector
