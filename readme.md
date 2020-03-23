# 一 : 技术栈
## (1) 前端技术
* js ,css ,html --页面初步完成
* bootstrap 4.0 , jquery之家  ---前端页面的一些模板
* jquery -- js库 快速开发
* ajax  -- 发送请求 
* art-template ---前端渲染 ，减少重复html代码
* echarts  -- 表格绘制的库
## (2) 后端技术
* node.js -- js服务器语言
* express -- node框架 快速开发 
* express-art-template -- 服务端渲染技术
* express-session -- express 的 session插件 方便保存session
* body-parser -- 解析请求体插件
* MongoDB -- 数据库
* mongoose -- MongoDB 框架 快速开发
* node-xlsx -- 绘制表格第三方插件
* svg-captcha -- 验证码绘制插件 
 ## (3) 工具
 * Visual Studio Code --核心编辑器
 * Snipaste --截图工具
 * Robo 3T -- MongoDB 可视化工具
 * postman --接口测试工具
 * Chrome --谷歌浏览器    没测试过浏览器兼容性。 建议使用最新版的浏览器
# 二 : 目录分析
* baseDao --工具类。测试代码 
* models -- 数据库的schema 模板
* node_modlules -- 项目运行的第三方依赖
* public -- 开放的静态资源
* router -- 服务器路由文件
* view -- 视图文件 
* main.js -- 入口函数
* package-lock.json && package.json  -- 包管理文件 锁定 开发时用的第三方包的版本
* readme -- 解释文件
# 三 : 项目总结
##  (1) 不足，弯路 小结
* 一定要先理解项目功能需求，项目的每个角色的权限，每个功能的实际意义，再去设计DB , 页面 ,后期改起来太麻烦了
* 项目的目录结构 要提前分好，这次的目录结构就乱七八糟的.多学习别人的目录结构
* 路由设计一定要先绘制一个表，不然后期开发走哪个路由，以及权限的处理 很不清晰，使得代码冗余
* 前后端渲染提前确定，不要写到这里再去考虑
* 遇到的警告 要提前处理， 大部分都是多次发送响应的警告 。
* 理解http 的请求方式。最好按照 http的规范 比如get方式只用来取数据，post 用来修改数据，put用来添加数据，delete用来删除数据。 这次项目就是随便写的
* 理解http中的code状态码。 不能每次响应都是200 然后再在数据里面自己设置statsu 这样太low了 不规范.
* 前端的js封装的方法都在一个文件里。很low  不方便修改维护. 这个还需要去学习vue 
* 路由里的增删改查接口一定要分四个文件写。 都写在一个文件 找起来好累
* 注释习惯不好。都是后期加的注释。 每次编写要提前写好注释。 方便后期查看修改
## (2) 难点解决方案小结
* 异步编程回调地狱 =>promise解决 用得最熟的。async await 不熟练 还有别的方案不了解
* 循环里嵌套异步出现的多次发送响应错误 =>声明变量，在每次异步操作成功后++ 。然后判断其等于循环次数 再发送
* 数据库的操作 =>依赖mongoose 框架。 解决了太多问题 .后期要补充mysql上的不足
* 同时使用服务端渲染，和前端渲染时 产生冲突=>找到art-template/lib/complie/default.js 将渲染规则更改即前端使用{{}} 后端使用<% %>
``` javascript
    // 模板语法规则列表
    // rules: [nativeRule, artRule], //nativeRule 是原生的语法规则 <%%> artRule 是template 添加的{{}}
    rules: [nativeRule],
```
* 封装方法中 想在if(condition) 里传参数，但这个参数不是布尔值 是一段可执行的代码。 if会用隐式转换 直接把字符串判断成true ''判断成false  所以 =>使用eval() 它可以执行里面的代码 这样就可以往if里面愉快的传参了
 ``` javascript
   eval('if (' + temps + '){arrs.push(j[k]);} else {}'); 
 ```
## (3) 收获
* 简单的验证码逻辑 :学会了 svg-captcha 插件使用方法
* 简单的表格绘制，以及单元格合并:   node-xlsx 插件会简单的使用配置.
* 可以熟练的使用template 来进行服务端渲染 或者 前端渲染
* 对路由的理解更深刻 以及中间件中next 的使用
* 数组的基本操作 for of  for in 增删改查啥的都会了。。需要会更多es6的东西 比如filter  reduce map   真的好用

