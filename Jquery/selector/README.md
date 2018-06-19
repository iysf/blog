## selector

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
