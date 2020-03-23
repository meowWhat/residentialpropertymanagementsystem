/***
 * 
 * --------------------物业管理系统 入口函数-------------------------------------
 * 
 */




/***
 * ---------引包板块
 */
const path = require('path');//引入path核心模块
const express = require('express'); //引入express框架
const bodyParser = require('body-parser'); //引入body-parser插件
const session = require('express-session'); //引入session插件
const cookieParser = require('cookie-parser');//引入cookieparser插件

/**
 * ---------baseDao板块
 */
require('./baseDao/con_db'); //连接数据库

/**
 * ------路由接受板块
 */
const r_post_login_regist = require('./router/router_login_regist');
const r_render = require('./router/router_render.js');
const r_admin = require('./router/router_admin');
const r_owner = require('./router/router_owner');
const r_log = require('./router/router_log');
/**
 * ------服务器创建
 */
const app = express(); //------创建服务器

/***
 * ---- -- -配置相关板块
 */
//配置模板引擎
app.engine('html', require('express-art-template'));
app.set('views', path.join(__dirname, 'view'));

//配置body-parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//session配置
app.use(session({
    secret: 'cjh--cxk', //为了安全性的考虑设置secret属性--加密字符串
    cookie: { maxAge: 60 * 1000 * 60 * 24 * 7 },//设置过期时间
    resave: true, //即使session 没有被修改，也保存session值， 默认为true
    saveUninitialized: false //无论有没有session cookie 每次请求都设置个session cookie，默认给个标识为connect.sid
}));

/***
 * -----静态资源开放板块
 */
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


/***
 * -------路由引入板块
 */

//页面渲染路由
app.use(r_render, function (req, res, next) {
    next();
});

//登录注册路由
app.use(r_post_login_regist, function (req, res, next) {
    next();
});

//管理员请求数据路由
app.use(r_admin, function (req, res, next) {
    next();
});

//业主请求数据路由
app.use(r_owner, function (req, res, next) {
    next();
});

//日志请求数据路由
app.use(r_log, function (req, res, next) {
    next();
});

//错误统一处理路由
app.use(function (req, res) {
    res.status(302).redirect('/notFound');
});

/***
 *---------- 端口配置板块 
 */
app.listen(3000, function () {
    console.log('服务器启动成功!');
});
