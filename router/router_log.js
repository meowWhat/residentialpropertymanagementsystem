/**
 *
 * ------------------------------后台信息记录CRUD路由-----------------------
 */


/**
 * -------导包
 */
const express = require('express'); //初始化express框架
const router = express.Router(); //创建路由容器
const log = require('../models/log_db'); //引入日志数据模型
const visits = require('../models/visits_db');
const xlsx = require('node-xlsx') //引入模块
const fs = require('fs');
const path = require("path");
const regist = require('../models/regist_db');
const owner = require('../models/owner_db');
/**
 * ---------log_db 的 CRUD 操作
 */
router.post('/getData/log', function (req, res) { //获取分页数据接口
  let page = req.body.page || 0;
  log.find({}, {
    '_id': 0
  })
    .sort({
      _id: -1
    })
    .skip(page * 5)
    .limit(5)
    .then(data => {
      res.status(200).send({
        data: data,
        message: '成功',
        status: 200
      })
    }).catch(err => {
      res.status(400).send({
        data: null,
        message: '失败',
        status: 400
      })
    })
});
router.post('/getData/log/key', function (req, res) { //模糊查询
  const reg = new RegExp(req.body.message);
  let page = req.body.page || 0;
  log.find({
    $or: [{
      name: {
        $regex: reg
      }
    },
    {
      text: {
        $regex: reg
      }
    },
    {
      password: {
        $regex: reg
      }
    },
    {
      time: {
        $regex: reg
      }
    },
    {
      message: {
        $regex: reg
      }
    }
    ]
  }, {
    '_id': 0
  })
    .sort({
      _id: -1
    })
    .skip(page * 5)
    .limit(5)
    .then(data => {
      res.status(200).send({
        data: data,
        message: '成功',
        status: 200
      })
    })
    .catch(err => {
      res.status(400).send({
        data: null,
        message: '失败',
        status: 400
      })
    })

});
router.post('/removeData/log', function (req, res) {//删除接口
  log.findOneAndRemove({
    text: req.body.message
  })
    .then(data => {
      res.send({
        status: 200,
        message: 'ok'
      })
    })
    .catch(err => {
      res.send({
        status: 400,
        message: 'err'
      });
      throw err;
    })

})
router.get('/exportexcel', function (req, res) { //表格导出接口
  log.find({}, {
    '_id': 0
  })
    .sort({
      _id: -1
    })
    .then(db => {
      //rows是个从数据库里面读出来的数组，大家就把他当成一个普通的数组就ok
      let data = [] // 其实最后就是把这个数组写入excel 
      let title = ['角色', '', '账号', '', '密码', '', '日期', '', '操作信息', ''] //这是第一行 俗称列名 
      data.push(title) // 添加完列名 下面就是添加真正的内容了
      db.forEach((db) => {
        let arrInner = [];
        arrInner.push(db.name);
        arrInner.push('');
        arrInner.push(db.text);
        arrInner.push('');
        arrInner.push(db.password);
        arrInner.push('');
        arrInner.push(db.time);
        arrInner.push('');
        arrInner.push(db.message);
        arrInner.push('');
        data.push(arrInner) //data中添加的要是数组，可以将对象的值分解添加进数组，例如：['1','name','上海']
      });
      writeXls(data, function () {
        res.sendFile(path.join(__dirname, '../') + 'the_content.xlsx');
      });
    })

  function writeXls (datas, callback) {
    let arr = [];
    for (let i = 0; i < datas.length; i++) {
      for (let j = 0; j < datas[i].length / 2; j++) {
        arr.push({
          s: {
            c: j * 2,
            r: i
          },
          e: {
            c: j * 2 + 1,
            r: i
          }
        });
      }
      // arr.push({ s: { c: i * 2, r: 0 }, e: { c: i * 2 + 1, r: 0 } })
      // arr.push({ s: { c: i * 2, r: 1 }, e: { c: i * 2 + 1, r: 1 } })
      // arr.push({ s: { c: i * 2, r: 2 }, e: { c: i * 2 + 1, r: 2 } })
      // arr.push({ s: { c: i * 2, r: 3 }, e: { c: i * 2 + 1, r: 3 } })
      // arr.push({ s: { c: i * 2, r: 4 }, e: { c: i * 2 + 1, r: 4 } })
    }
    // const range0 = { s: { c: 0, r: 0 }, e: { c: 1, r: 0 } }; //此处是合并条件 0,0和0,1是坐标 指的是A1单元格 到A2单元合并
    // const range1 = { s: { c: 2, r: 0 }, e: { c: 3, r: 0 } };
    // const range2 = { s: { c: 4, r: 0 }, e: { c: 5, r: 0 } };
    // const range3 = { s: { c: 6, r: 0 }, e: { c: 7, r: 0 } };
    // const range4 = { s: { c: 8, r: 0 }, e: { c: 9, r: 0 } };
    const options = {
      '!merges': arr
    }; //如果合并多个单元格,在此处添加多条合并数组即可
    let buffer = xlsx.build([{
      name: 'sheet1',
      data: datas
    }], options);
    fs.writeFileSync('./the_content.xlsx', buffer, {
      'flag': 'w'
    }); //生成excel the_content是excel的名字，大家可以随意命名
    callback();
  }
});
router.post('/getData/log/all', function (req, res) {
  let total = 0;
  let userRegister = 0;
  let ownerRegister = 0;
  regist.find()
    .then(data => {
      userRegister = data.length;
      return owner.find({ ownerName: { $ne: 'null' } })
    })
    .then(data => {
      ownerRegister = data.length;
      return visits.find()
    })
    .then(data => {
      total = data.length;
      res.status(200).send({ total, userRegister, ownerRegister });
    })
})
/**
 * --导出路由
 */
module.exports = router;