var webapi = require('./webapi')

// 加载速度第一的是 缓存模块。指，路径形式的文件模块二次加载的模块。第二的则是核心模块，在Node源代码编译的时候就已经是二进制代码了。加载速度仅次于缓存模块。加载速度第三的则是路径形式的文件模块。
// 加载速度最慢的是自定义模块查找，生成方式与JavaScript的原型链或作用域链查找方式十分类似。在加载的过程中，Node会逐个尝试模块路径中的路径、直到找到目标文件位置。可以看出，当前文件的路径越深，模块查找耗时会越多，这就是自定义模块查找最慢的原因。

console.log(module.paths)

webapi.add()
// vue-cli
// webpack => 优化 + 模块化 + 各种文件编译 打包 代码压缩混淆
// web components
// NodeJS

// 前端ajax => 自己写的NodeJS => NodeJS => 47.150.25.24:8080/api/

// 好处： 前后端完全解耦

// webview

// React-Native  => js
// weex => 手淘
