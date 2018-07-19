## 移动端 Vue 2.0 重构经验分享

### 技术栈

MVVM框架： Vue 2.0<br>
源码：es6<br>
代码风格检查：eslint<br>
构建工具：webpack<br>
前端路由：vue-router<br>
状态管理：vuex<br>
服务端通讯：axios<br>
移动端适配方案：flexible<br>
apiProxy：Nodejs

---

### 技术全景
此处该有图片......

---

### 项目搭建

###### 起步

1、安装Nodejs

2、npm install -g vue-cli

3、vue init webpack gengmei-m-web

---

###### 移动端上的适配

由于此次重构的项目是移动端，所以得需要做一些移动端适配。采取的方案可能大家都知道，是flexible.js。

例如：px2rem.scss

```scss
$mobileBase: 75;
@function px2rem($px) {
  @return ($px / $mobileBase) + rem;
}
```

$mobileBase是设计图的十分之一，代表设计图的宽度为750。

具体使用方法如下：

```html
<div class="main">
  <p>Hello，World</p>
</div>
```

```scss
.main {
  width: px2rem(500);
  p {
    font-size: px2rem(24);
    line-height: px2rem(24);
  }
}
```

---

###### axios

项目搭建完了以后第一个关心的是：怎么发送网络请求？

作者使用的是axios插件。

例如：tools.js

```js
import axios from 'axios'

export default {
  install (Vue, options) {
    Vue.prototype.$request = axios
  }
}
```

main.js

```js
import Vue from 'vue'
import App from './App'
// tools plugin
import toolsPlugin from './lib/tools'

Vue.use(toolsPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

```

在tools.js文件中导出一个对象，在main.js中引入。接着调用Vue.use()方法，use方法会自动调用该对象中的install方法，并且将Vue函数本身传入进去。接着我们就可以使用Vue.prototype.$request = axios 为每个实例都添加公共方法

例如： hello.vue
```js
export default {
  data () {
    return {}
  },
  mounted () {
    this.$request('http://').then(res => { console.log(res) })
  }
}

```

[Vue.use方法详解](https://cn.vuejs.org/v2/guide/plugins.html)

---

###### vue-router

使用vue-router来进行SPA的构建，大家可以自行参考 [官网](https://router.vuejs.org/zh/) 来学习一系列的基础配置知识

我主要列出的部分是全局守卫。

```js
import Router from 'vue-router'

let router = new Router()

router.beforeEach((to, from, next) => {
  console.log('to:', to)
  console.log('from:', from)
  next()
})
```
每个守卫方法接收三个参数：

to: 要进入的路由

from: 要离开的路由

next: 进行管道中的下一个钩子

---

###### Vuex

后续补吧......先列出来

---

###### components

作者自己实现了部分自定义组件，例如：

scroll-view

```html
<scroll-view @onPullDownRefresh="onPullDownRefresh">
  <div class="list" v-for="item in list"></div>
</scroll-view>
```

```js
import ScrollView from '@/components/common/ScrollView'
export default {
  data () {
    return {

    }
  },
  components: {ScrollView},
  methods: {
    onPullDownRefresh () {

    }
  }
}
```

loading

```html
<Loading v-if="isLoading"></Loading>
```

后续还有很多很多，某一天足够强大以后 会像饿了么(Element)之类的类似开源。目前只提供于公司内部项目使用。

> 悄悄的告诉你:等有时间的时候，我会把这些造轮子的经验都分享出来的）逃

---

###### Nodejs

列出Nodejs主要是介绍一下代理Api及代理上传文件这两件事情的详解

我们可以观察Vue-cli目录结构下的/build/dev-server.js

认为项目中所有以webapi开头的请求为Ajax请求。
```js
var express = require('express')
var request = require('request')

// Define HTTP proxies to your custom API backend
app.use(function (req, res, next) {
  if (req.url.indexOf('/webapi') != -1) {
    request(options, function (error, response, body) {
      console.log('response:', body)
      res.send(body)
    })
  } else {
    next()
  }
})
```

认为项目中所有以webupload开头的请求为上传文件请求。
```js
var express = require('express')
var request = require('request')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')


var multer = require('multer')
var storage = multer.memoryStorage()
var upload = multer({
  storage,
})

// Forwarding the file agent for uploading
app.post('/webupload/files/upload/', upload.single('file'), function (req, res) {
  var b64data = 'data:' + req.file.mimetype + ';base64,' + req.file.buffer.toString('base64')
  var body = {
    b64data,
    type: req.body.type
  }
  request({
    url: global.SERVER_INFO.uploadApi + '/files/upload/base64/',
    method: req.method,
    form: body,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, function (error, response, body) {
    res.send(body)
  })
})
```

---

###### 后续需要补充上的部分：

禁止IP多次访问，1分钟内只允许60次。(个人用户无法使用少数IP导致网站崩溃，当然可能还会被打崩)

服务端渲染

前端请求参数验签

多次请求的处理，例如：消息发送失败以后，得需要为每条消息在请求头中携带一份ID，Nodejs可以帮助前端来做消息重试的机制。不需要后端支持

前端日志系统(俗称前端监控即异常捕获，用于监控用户在什么页面，发生了什么错误，错误时间等等帮助我们排查错误的有效信息)

性能优化

---

###### product start

``` bash
cd gengmei-m-web

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

```

---

###### product release

``` bash
# build for production with minification
npm run build
```
