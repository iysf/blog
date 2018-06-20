## attr

> 这个是基于上一章节 selector的，所以直接拿之前的代码继续往下写了。

```html
<div id="app"></div>
<div class="box"></div>
<div class="box"></div>
```

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
  },
  //
  toArray: function () {

  },
  // 代码待优化
  attr: function () {
    var param = Array.from(arguments)
    if (arguments.length > 1) {
      this.selector.forEach(function (item, index) {
        item.setAttribute(param[0], param[1])
      })
      return this
    } else {
      var value
      this.selector.forEach(function (item, index) {
        value = item.getAttribute(param[0])
      })
      return value
    }
  }
}
init.prototype = $.prototype

console.log($('#app'))
console.log($('#app').html('a').attr('style', 'color: red'))
console.log($('#app').html('a').attr('style'))
console.log($('.box').html('abc'))
```
