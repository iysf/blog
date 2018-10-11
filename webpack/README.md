## npm
在安装一个要打包到生产环境的安装包时，你应该使用 npm install --save，如果你在安装一个用于开发环境的安装包（例如，linter, 测试库等），你应该使用 npm install --save-dev。请在 [npm 文档](https://docs.npmjs.com/cli/install) 中查找更多信息。


## webpack


#### loader

用：虽然webpack自身只支持JavaScript，但是loader却可以让webpack处理那些非JavaScript文件，不并且先将它们转换为有效模块，然后添加到依赖图中。这样就可以提供给应用程序使用。

```
loader 能够 import 导入任何类型的模块(例如.css文件，.vue文件、.abc文件)，这是webpack特有的功能，其他打包程序或任务执行器的可能并不支持。webpack开发团队认为这种语言扩展是很有必要的，应为这可以使开发人员创建出更准确的依赖关系图。
```

loader 有两个特征：

1、test属性，用于标识出应该被对应的loader进行转换的某个或某些文件。
2、use属性，标识进行转换时，应该用哪个loader。


当相应的js文件碰到了在[require / import] 语句中被解析为.vue的路径时，在我们对它进行打包时，先用vue-loader转换一下。



#### plugins

用：plugins可以用哪个与执行范围更广的任务，包括：打包优化、资源管理和注入环境变量。
