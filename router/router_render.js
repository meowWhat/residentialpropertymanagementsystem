/***
 * 
 * 
 * -----------------------页面渲染模块---------------------
 * 
 * 
 * 
 */


/***
 * --------引包
 */
const express = require('express'); //初始化express框架
const router = express.Router(); //创建路由容器
const svgCaptcha = require('svg-captcha');
const visits = require('../models/visits_db');
/**
 * 
 * --------路由渲染板块
 */
router.get('/', function (req, res) { //首页渲染
  visits.insertMany();
  res.render('userView/index.html');
});

router.get('/learnMore', function (req, res) { //关于我们页面渲染
  res.render('userView/learnMore.html');
});

router.get('/login', function (req, res) { //登录页面渲染
  res.render('userView/login.html');
});
router.get('/captcha', function (req, res) {
  let captcha = svgCaptcha.create({ //创建验证码
    color: true,
    noise: 5,
    size: 4,
    ignoreChars: '0o1i',
  });
  req.session.captcha = captcha.text.toLowerCase();
  res.status(200).send(captcha);
})
router.get('/notFound', function (req, res) { //404页面渲染渲染
  res.render('userView/notFound.html');
});

router.get('/regist', function (req, res) { //注册页面渲染
  res.render('userView/register.html');
});

router.get('/admin', function (req, res) { //超级管理员界面渲染
  if (req.session.login === 'admin') {
    res.status(200).render('admin.html');
  } else {
    res.status(302).redirect('/login');
  }
});

router.get('/emp', function (req, res) { //管理员界面渲染
  if (req.session.login === 'emp') {
    res.status(200).render('emp.html');
  } else {
    res.status(302).redirect('/login');
  }
});

router.get('/user', function (req, res) { //用户界面渲染
  if (req.session.login === 'user') {
    res.status(200).render('user.html', {
      username: req.session.name
    });
  } else {
    res.status(302).redirect('/login');
  }

});
router.get('/user/message', function (req, res) { //用户个人信息界面渲染
  if (req.session.login === 'user') {
    res.status(200).render('userMessage.html', {
      username: req.session.name
    });
  } else {
    res.status(302).redirect('/login');
  }

});
router.get('/index', function (req, res) { //首页渲染
  res.render('index.html');
})
router.get('/backStage', function (req, res) {
  if (req.session.login === 'admin') {
    res.status(200).render('backStage.html');
  } else {
    res.status(302).redirect('/login');
  }
})
/***
 * 
 * -------路由导出板块
 */
module.exports = router;