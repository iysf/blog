# gengmei_m_web

> gengmei web project

### 项目搭建

###### 起步

1、安装Nodejs

2、npm install -g vue-cli

3、vue init webpack gengmei-m-web

###### vue-cli

首先分析目录结构

```
build
  * build.js
  * check-versions.js
  * dev-client.js
  * dev-server.js
  * utils.js
  * vue-loader.conf.js
  * webpack.base.conf.js
  * webpack.dev.conf.js
  * webpack.prod.conf.js
  * webpack.test.conf.js
config
  * dev.env.js
  * inndex.js
  * prod.env.js
  * test.env.js
release
src
  assets
  components
  router
  server
  store
  App.vue
  main.js
static
test
```

### 项目介绍

###### static

组件引用资源地址
> components static => /m_web/src/lib

全局引用资源地址
> global static =>  /m_web/static

###### css
> 移动端适配使用手淘方案，已经在全局写了scss函数。具体的使用方法如下：

```css
div {
  /* 宽度为570物理像素 */
  width: px2rem(570);
  /* 高度为60物理像素 */
  height: px2rem(60);
  /* 比如字体大小为24物理像素 */
  font-size: px2rem(24);
}
```
传入的值为设计稿上的物理像素

> css使用预处理sass

```scss
$nav-color: #F90;
nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
}

```


###### components

> scroll-view (上拉加载,下拉刷新)

```js
1、import ScrollView from '@/components/common/ScrollView'
2、components: {ScrollView}
```

```html
3、<scroll-view @onPullDownRefresh="">
  <div class="list" v-for="item in list"></div>
</scroll-view>
```

> action-modal (操作框)

> loading

> toast

###### JavaScript

> vuex

后续补充

> axios

axios已经无需每个组件单独引入，已注入到每个实例的方法上。axios的请求拦截及响应拦截也做了处理。
```js
this.$request('/webapi/my_conversation/').then(res => {})
```

> websocket

websocket也已经全局封装好了，包括检测心跳机制、及断开重新尝试连接。使用方法：
```js
var socket = this.$socket('wss://www.baidu.com')

socket.onMessage = function (info) {
  console.log('info:', info)
}
```

> upload file

上传文件直接可以调用Nodejs，例如：

```js
var data = new FormData()
data.append('file', file)
data.append('type', 'image')

_this.$request.post('/webupload/files/upload/', data).then(res => {})
```

###### Nodejs

* 禁止IP多次访问，1分钟内只允许60次。(个人用户无法使用少数IP导致网站崩溃，当然可能还会被打崩);
* 服务端渲染;
* 前端请求参数验签;
* 多次请求的处理，例如：消息发送失败以后，得需要为每条消息在请求头中携带一份ID，Nodejs可以帮助前端来做消息重试的机制。不需要后端支持;
* 前端日志系统(俗称前端监控即异常捕获，用于监控用户在什么页面，发生了什么错误，错误时间等等帮助我们排查错误的有效信息);
* 性能优化;

###### product start

``` bash
cd m_web

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

```


### 项目部署方案

1、git clone git@xxxxxxxxxx:

2、cd gengmei_m_web/release

3、npm i && npm start
