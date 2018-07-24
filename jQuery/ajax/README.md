### jQuery Ajax模拟实现

我们在调用jQuery的Ajax是这样使用的
```js
$.ajax({
  url: '/webapi/userInfo',
  method: 'GET',
  headers: {
    'Cookie': 'sessionid=12412jpowjfopqwf'
  },
  data: {
    phont: '1234512413',
  },
  success: function (res) {

  },
  error: function (error) {

  }
})

```

这样基本就是一个正常的jQuery调用方式

---
既然是模拟实现，那也做到和jQuery类似的效果(jsonp单独分了一个目录)

```js

$.ajax({
  url: '/webapi/userasfqw',
  method: 'GET',
  success: function () {

  },
  error: function () {

  }
})

```
