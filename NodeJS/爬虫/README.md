## alpha概要

<table>
  <tr align="center">
    <td colspan="3">alpha</td>
  </tr>
  <tr>
    <td rowspan="5">十一月</td>
    <td>时间节点</td>
    <td>相应需求</td>
  </tr>
  <tr>
    <td>7号 - 9号</td>
    <td>
      小组详情页、follower详情页（列表）、赞列表（列表）
    </td>
  </tr>
  <tr>
    <td>12号 - 15号</td>
    <td>页面：小组详情页、消息tab页、通知列表页、小组邀请分享页、关注列表页、打榜分享页。公共组件：loading、toast、confirm、pull refresh、(network error、404、500、页面无数据状态)</td>
  </tr>
  <tr>
    <td>16号 - 21号</td>
    <td>新用户注册问答题所有页(三个页面)、拟合头像分享页</td>
  </tr>
  <tr>
    <td>22号 - 27号</td>
    <td></td>
  </tr>
  <tr>
    <td rowspan="6">十二月</td>
    <td>时间节点</td>
    <td>相应需求</td>
  </tr>
  <tr>
    <td>11.28号 - 12.4号</td>
    <td></td>
  </tr>
  <tr>
    <td>5号至11号</td>
    <td>测试阶段</td>
  </tr>
  <tr>
    <td>12号</td>
    <td>上线</td>
  </tr>
  <tr>
    <td>13号</td>
    <td>发版</td>
  </tr>
  <tr>
    <td>15号</td>
    <td>app可以搜索的到</td>
  </tr>
</table>

## alpha明细

> 7号 - 9号的规划
<table>
  <tr align="center">
    <td colspan="3">杨少峰</td>
  </tr>
  <tr align="center">
    <td>7号</td>
    <td>8号</td>
    <td>9号</td>
  </tr>
  <tr align="center">
    <td>封装nodejs mock模拟数据。补全项目模块(请求插件、跳转拦截、全局配置、统一资源处理压缩等等)</td>
    <td>follower详情页UI样式开发及对接口文档字段、渲染页面</td>
    <td>赞列表页UI样式开发及对接口文档字段、渲染页面</td>
  </tr>
</table>

<table>
  <tr align="center">
    <td colspan="3">杜欣</td>
  </tr>
  <tr align="center">
    <td>7号</td>
    <td>8号</td>
    <td>9号</td>
  </tr>
  <tr align="center">
    <td>设计中午之前给图(小组详情页)，下午开始开发页面UI样式。</td>
    <td>看接口文档的字段、开发业务逻辑（点赞、关注小组、关注用户、展开功能、轮播图（不需要要查看大图））</td>
    <td>公共组件封装（confirm）、模拟联调功能</td>
  </tr>
</table>

> 12号 - 15号的规划

<table>
  <tr align="center">
    <td colspan="4">杨少峰</td>
  </tr>
  <tr align="center">
    <td>12号</td>
    <td>13号</td>
    <td>14号</td>
    <td>15号</td>
  </tr>
  <tr align="center">
    <td>关注列表页UI样式开发及对接口文档字段、渲染页面、mock工具封装</td>
    <td>pull refresh组件封装</td>
    <td>整个前端部署测试环境规范</td>
    <td>通知列表页UI样式开发及对接口文档字段、渲染页面</td>
  </tr>
</table>

<table>
  <tr align="center">
    <td colspan="4">杜欣</td>
  </tr>
  <tr align="center">
    <td>12号</td>
    <td>13号</td>
    <td>14号</td>
    <td>15号</td>
  </tr>
  <tr align="center">
    <td>小组详情页：联调功能（关注、点赞、删除帖子、举报帖子、展开)、下载app样式补全（调试更美的应用宝)</td>
    <td>小组邀请分享页的整个UI样式结束(半天)，开发页面功能（半天）</td>
    <td>小组邀请分享页调试分享页（一天）</td>
    <td>微信授权登录功能模块封装及调试微信用户登录功能、处理其他浏览器的情况。</td>
  </tr>
</table>

<table>
  <tr align="center">
    <td colspan="4">韩明盼</td>
  </tr>
  <tr align="center">
    <td>12号</td>
    <td>13号</td>
    <td>14号</td>
    <td>15号</td>
  </tr>
  <tr align="center">
    <td>(network error、404、500)、封装toast组件（一天）</td>
    <td>继续封装toast组件（半天）、先调试探探动画。</td>
    <td>开发打榜分享页的UI样式及调试动画</td>
    <td>对接口字段、渲染页面、调试动画</td>
  </tr>
</table>

> 16号 - 21号的规划

<table>
  <tr align="center">
    <td colspan="6">杨少峰</td>
  </tr>
  <tr align="center">
    <td>16号</td>
    <td>17号</td>
    <td>18号</td>
    <td>19号</td>
    <td>20号</td>
    <td>21号</td>
  </tr>
  <tr align="center">
    <td>调研通知页面websocket长连接的问题，及重连轮询。实时小红点等。</td>
    <td>查漏补缺之前功能(例如列表页时间展示)及修改bug</td>
    <td>下拉加载组件开发及调试通用性</td>
    <td>拟合头像页面开发</td>
    <td>拟合头像页面 编写功能、联调后端</td>
    <td>调试通知页面websocket长连接、实时小红点等功能</td>
  </tr>
</table>

<table>
  <tr align="center">
    <td colspan="6">杜欣</td>
  </tr>
  <tr align="center">
    <td>16号</td>
    <td>17号</td>
    <td>18号</td>
    <td>19号</td>
    <td>20号</td>
    <td>21号</td>
  </tr>
  <tr align="center">
    <td>整个前端部署测试环境规范</td>
    <td>修改之前功能的bug(半天)及调试微信授权登录(半天)</td>
    <td>微信授权登录(半天)、拟合头像页面定展示方案</td>
    <td>调试拟合头像页面展示方案</td>
    <td>规范alpha管理后台的代码及review功能</td>
    <td>拟合头像页面渲染方案</td>
  </tr>
</table>

<table>
  <tr align="center">
    <td colspan="6">韩明盼</td>
  </tr>
  <tr align="center">
    <td>16号</td>
    <td>17号</td>
    <td>18号</td>
    <td>19号</td>
    <td>20号</td>
    <td>21号</td>
  </tr>
  <tr align="center">
    <td>ui样式</td>
    <td>ui调整及编写功能</td>
    <td>调试客户端&服务端</td>
    <td>修改之前的bug</td>
    <td>探探滑动动画调试</td>
    <td>拟合头像页面渲染方案</td>
  </tr>
</table>


<!-- H5唯一标识的事情、调研爬虫的成本 美芽、 -->
