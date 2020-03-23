/***
 * 
 * 
 * 
 * -----------------------业主请求处理模块--------------------------
 * 
 * 
 * 
 */


/**
 * --------------引包
 */
const express = require('express');//初始化express框架
const router = express.Router();//创建路由容器
const owner = require('../models/owner_db');
const room = require('../models/room_db');
const build = require('../models/build_db');
const regist = require('../models/regist_db');
const role_power = require('../models/role_power_db');
const log = require('../models/log_db');
const utils = require('../baseDao/utils');
const charges = require('../models/charge_db');
const pay = require('../models/pay_db');
const member = require('../models/member_db');


/**
 * ------------用户提升为业主注册请求处理
 */
router.post('/owner/regist', function (req, res) {
  //查询业主信息表，根据身份证号(唯一的) 查询 有重复的 
  owner.find({
    ownerId: req.body.iden
  })
    .then(data => {
      if (data.length > 0) {
        res.send('<h1>身份证号已存在请重新输入</h1>');
        return;
      } else {
        build.find({
          buildName: req.body.build
        })
          .then(data => {
            if (data.length > 0) {
              const buildIds = data[0].buildId;
              return room.find({
                buildId: buildIds,
                roomName: req.body.room
              })
            }
            else {
              res.send('<h1>楼栋名找不到请重新输入</h1>')
              return;
            }
          }).then(data => {
            if (data.length > 0) {
              const roomId = data[0].roomId;
              return owner.findOneAndUpdate({ roleId: req.body.role }, {
                ownerName: req.body.name,
                ownerSex: req.body.sex,
                ownerNative: req.body.native,
                ownerPhone: req.body.phone,
                ownerIden: req.body.iden,
                roomId: roomId,
              });
            }
            else {
              res.send('<h1>房间名找不到请重新输入</h1>');
              return;
            }
          })
          .then(data => {
            //注册成功
            //  还要更新 这个 user 的身份 ownerName==>nickName==>角色ID  再走 role——power表 更新权限码）
            return regist.find({
              roleId: req.body.role
            })
          }).then(data => {
            log.insertMany({ name: '业主', text: data[0].text, password: data[0].password, time: utils.getDate(Date.now()), message: req.body.name + '注册成为业主' });
            return role_power.updateOne(
              { roleId: data[0].roleId },
              { powerId: '3' }
            )
          }).then(data => {
            res.status(302).redirect('/user');
          })
          .catch(err => {
            //服务器错误
            res.status(404).redirect('/notFound');
            throw err;
          })

      }
    })


});
/**
 * 
 * -----------业主缴费请求处理
 */
router.post('/owner/getData/pay', function (req, res) {
  //项目名称 all
  //项目价格 all
  //问题 -- ??
  // 我们的这个所有的缴费信息 是公共的 但是 每个用户显示的需要缴费的项目是不一样的
  // --我缴过费了 这个就不应该存在
  role_power.findOne({ roleId: req.session.userName }).then(data => {
    if (data.powerId == '2') {
      res.status(200).send({ status: 400, message: '权限不足' });
    }
    if (data.powerId == '3') {
      owner.findOne({ roleId: req.session.userName }, { 'ownerId': -1 })
        .then(data => {
          return pay.find({ ownerId: data.ownerId, payState: '0' })
        }).then(data => {
          //data 是数组很多条    
          let arr = [];
          let index = 0;
          if (data.length > 0) {
            for (const key of data) {
              charges.findOne({ chargeId: key.chargeIds })
                .then(doc => {
                  index++;
                  let obj = {};
                  obj.chargeName = doc.chargeName;
                  obj.chargeNumber = key.payLack;
                  arr.push(obj);
                  if (index == data.length) {
                    res.status(200).send({ status: 200, message: 'ok', data: arr });
                  }
                })
            }
          }
          else {
            res.status(200).send({ status: 200, message: 'null', data: arr });
          }
        })
    }
  })




});
/***
 * 
 * -------业主成员管理请求处理
 */
router.get('/getData/owner/member', function (req, res) {
  role_power.findOne({ roleId: req.session.userName }).then(data => {
    if (data.powerId == '2') {
      res.status(200).send({ status: 400, message: '权限不足' });
    }
    if (data.powerId == '3') {
      owner.findOne({ roleId: req.session.userName })
        .then(data => {
          return member.find({ ownerId: data.ownerId }, { '_id': 0 });
        })
        .then(data => {
          res.send({
            status: 200,
            data: data
          });
        })
    }
  })

})
module.exports = router;