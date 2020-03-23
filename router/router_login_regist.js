/***
 * -----------------------登录注册处理模块------------------------
 */

/***
 * ------------引包板块
 */
const express = require('express');
const router = express.Router();
const modle = require('../models/regist_db');
const role_power = require('../models/role_power_db');
const emp = require('../models/emp_regist');
const owner = require('../models/owner_db');
const log = require('../models/log_db');
const utiles = require('../baseDao/utils');

/***
 * ----------------注册处理
 * 
 */
router.post('/regist', function (req, res) { //注册处理
    if (req.body.text === 'admin' || /^emp/.test(req.body.text)) {
        //不能注册admin 和emp开头的     => 不能注册管理员账号 和员工账号    
        log.insertMany({ name: '用户', text: 'null', password: 'null', time: utiles.getDate(Date.now()), message: '用户注册失败--ip地址:' });
        return res.send({
            status: 2,
            message: '账号或昵称已存在'
        })
    } else {
        modle
            .find({
                $or: [{
                    nickName: req.body.name
                },
                {
                    text: req.body.text
                }
                ]
            })
            .then(data => {
                if (data.length > 0) {
                    log.insertMany({ name: '用户', text: 'null', password: 'null', time: utiles.getDate(Date.now()), message: '用户注册失败--ip地址:' });
                    return res.send({
                        status: 2,
                        message: '账号或昵称已存在'
                    });
                } else {
                    modle.insertMany({ //用户注册完了之后 插入昵称，账号，密码
                        nickName: req.body.name,
                        text: req.body.text,
                        password: req.body.password,
                        roleId: req.body.text //绑定角色id
                    })
                        .then(data => {
                            return owner.insertMany({
                                ownerId: Date.now(),
                                ownerName: 'null',
                                ownerSex: 'null',
                                ownerNative: 'null',
                                ownerPhone: 'null',
                                ownerIden: 'null',
                                roomId: 'null',
                                roleId: req.body.text
                            })
                        })
                        .then(data => {
                            req.session.login = 'user';
                            req.session.name = req.body.name;
                            req.session.username = req.body.text;
                            return role_power.insertMany({
                                roleId: req.body.text
                            });

                        })
                        .then(data => {
                            log.insertMany({ name: '用户', text: req.body.text, password: req.body.password, time: utiles.getDate(Date.now()), message: req.body.name + '成功注册了账号' });
                            res.status(200).send(data); //这个data里面有什么 roleId
                        })
                }
            })

    }
});

/**
 * 
 * ---------------登录处理
 */
router.post('/login', function (req, res) { //登录处理
    if (req.body.text === 'admin' && req.body.password === 'admin') {
        req.session.login = 'admin';
        req.session.name = 'admin';
        log.insertMany({ name: '管理员', text: req.body.text, password: req.body.password, time: utiles.getDate(Date.now()), message: '管理员登录了账号' });
        res.status(302).redirect('/admin');
    } else {
        emp.find({
            text: req.body.text,
            password: req.body.password
        }).then(data => {
            if (data.length > 0) {
                req.session.login = 'emp';
                req.session.name = 'emp';
                log.insertMany({ name: '员工', text: req.body.text, password: req.body.password, time: utiles.getDate(Date.now()), message: '登录了账号' });
                res.status(302).redirect('/emp');
                return;
            }
            if (data.length == 0) {
                modle.find({
                    text: req.body.text,
                    password: req.body.password
                }).then(data => {
                    if (data.length > 0) {
                        if (req.session.captcha == req.body.captcha.toLowerCase()) {
                            req.session.login = 'user';
                            req.session.name = data[0].nickName;
                            req.session.userName = req.body.text; //保存登录的账号
                            log.insertMany({ name: '用户', text: req.body.text, password: req.body.password, time: utiles.getDate(Date.now()), message: data[0].nickName + '登录了账号' });
                            res.status(302).redirect('/user');
                            return;
                        }
                        log.insertMany({ name: '用户', text: req.body.text, password: req.body.password, time: utiles.getDate(Date.now()), message: data[0].nickName + '登录了账号;但是验证码输错了' });
                        return res.send('<h1>验证码错误,请重新输入</h1>');
                    }
                    return res.send('<h1>账号名或密码错误，请重新输入</h1>');
                });
            } else {
                res.status(404).redirect('/notFound');
            }

        })

    }

});

/**
 * 
 * --------------导出路由
 */
module.exports = router;