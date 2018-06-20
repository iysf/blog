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

结合上面的问题，得出一个结论是：$函数调用完毕以后 return 一个实例，这个实例需要继承$.prototype上的属性和方法。

假如这样写的话：
```js
function $ () {
  return new $()
}
```
那么这样其实是进入了递归

解决这种问题的思路是：$函数调用完毕以后 return 一个init构造函数的实例，这个init构造函数的prototype指向$.prototype。

那么总结一下就是：$函数调用完毕以后，return一个init函数的实例。将init函数的prototype指向$.prototype。就可以实现$('#app').html('a')这样的一个链式调用了。

代码改造成这样更容易理解：

```js
function $ (selector) {
  return new init(selector)
}
function init (selector) {
  this.selector = Array.from(document.querySelectorAll(selector))
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
init.prototype = $.prototype

console.log($('#app'))
console.log($('#app').html('a'))
console.log($('.box').html('abc'))
```


## onload selector
