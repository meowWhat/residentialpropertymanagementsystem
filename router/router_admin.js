/***
 * ---------------------admin 请求数据路由-------------------------
 */

/**
 * --------引包
 */
const express = require('express'); //初始化express框架
const router = express.Router(); //创建路由容器
const build = require('../models/build_db');
const room = require('../models/room_db');
const owner = require('../models/owner_db');
const member = require('../models/member_db');
const pay = require('../models/pay_db');
const charge = require('../models/charge_db');
const material = require('../models/material_db');
const regist = require('../models/regist_db');
const r_power = require('../models/role_power_db');
const emp = require('../models/emp_regist');

/***
 * -------查询所有信息  ---完成无bug 缺分页
 */
router.post('/getData/build', function (req, res) { //这个接口作用是查询楼栋信息然后返回
  if (req.body.index == 0) {
    build.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(404).send({
          status: 900,
          message: '数据库查询错误',
          err: err
        })
      })
  } else {
    res.send({
      status: 800,
      message: '参数错误'
    });
  }
});
router.post('/getData/room', function (req, res) { //这个接口作用是查询房间然后返回
  if (req.body.index == 1) {
    room.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(404).send({
          status: 900,
          message: '数据库查询错误',
          err: err
        })
      })
  } else {
    res.send({
      status: 800,
      message: '参数错误'
    });
  }
});
router.post('/getData/owner', function (req, res) { //这个接口作用是查询业主信息然后返回
  if (req.body.index == 2) {
    owner.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(404).send({
          status: 900,
          message: '数据库查询错误',
          err: err
        })
      })
  } else {
    res.send({
      status: 800,
      message: '参数错误'
    });
  }
});
router.post('/getData/member', function (req, res) { //这个接口作用是查询业主成员然后返回
  if (req.body.index == 3) {
    member.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(404).send({
          status: 900,
          message: '数据库查询错误',
          err: err
        })
      })
  } else {
    res.send({
      status: 800,
      message: '参数错误'
    });
  }
});
router.post('/getData/pay', function (req, res) { //这个接口作用是查询收费项目然后返回
  if (req.body.index == 4) {
    pay.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(404).send({
          status: 900,
          message: '数据库查询错误',
          err: err
        })
      })
  } else {
    res.send({
      status: 800,
      message: '参数错误'
    });
  }
});
router.post('/getData/charge', function (req, res) { //这个接口作用是查询业主缴费信息然后返回
  if (req.body.index == 5) {
    charge.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(404).send({
          status: 900,
          message: '数据库查询错误',
          err: err
        })
      })
  } else {
    res.send({
      status: 800,
      message: '参数错误'
    });
  }
});
router.post('/getData/material', function (req, res) { //这个接口作用是查询物资管理信息然后返回
  if (req.body.index == 6) {
    material.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(404).send({
          status: 900,
          message: '数据库查询错误',
          err: err
        })
      })
  } else {
    res.send({
      status: 800,
      message: '参数错误'
    });
  }
});
router.post('/getData/emp', function (req, res) { //这个接口作用是查询物资管理信息然后返回
  if (req.body.index == 7) {
    emp.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(404).send({
          status: 900,
          message: '数据库查询错误',
          err: err
        })
      })
  } else {
    res.send({
      status: 800,
      message: '参数错误'
    });
  }
});
router.post('/getData/user', function (req, res) { //查询用户管理信息
  if (req.body.index == 8) {
    //查询 角色ID 业主ID 姓名 账号 密码 权限 然后返回 拼成数组返回
    //角色ID  姓名 账号 密码在 注册表
    //权限ID  用角色ID 去 角色_权限 表里查
    //业主ID  在业主表 用业主姓名去查 
    // 主键  是注册表   得到角色ID 和  姓名 => 
    // 角色ID 关联  权限ID 
    // 姓名 关联 业主ID
    // 所有值都得到了  send data 给 前端 然后前端 渲染数据
    let arrss = [];
    regist.find({})
      .then(data => {
        if (data.length > 0) {
          regist.aggregate([{
            $lookup: {
              from: "role_powers",
              localField: "roleId",
              foreignField: "roleId",
              as: "powerId"
            }
          },
          {
            $lookup: {
              from: "owners",
              localField: "roleId",
              foreignField: "roleId",
              as: "ownerId"
            }
          }
          ], function (err, data) {
            for (const key in data) {
              let arrs = [];
              arrs.push(data[key].roleId);
              arrs.push(data[key].ownerId[0].ownerId);
              arrs.push(data[key].nickName);
              arrs.push(data[key].text);
              arrs.push(data[key].password);
              arrs.push(data[key].powerId[0].powerId);
              arrss.push(arrs);
            }
            res.send(arrss);
          })
        }
        else {
          res.send(arrss)
        }
      })


  } else {
    res.status(404).redirect('/notFound'); //服务器错误
  }
});

/***
 * ------模糊搜索  ---暂无bug
 */
router.post('/getData/build/key', function (req, res) { //楼栋信息模糊搜索
  const reg = new RegExp(req.body.index);
  build.find({
    $or: [
      { buildId: { $regex: reg } },
      { buildName: { $regex: reg } },
      { buildStart: { $regex: reg } },
      { buildFinish: { $regex: reg } },
      { buildMessage: { $regex: reg } },
      { buildArea: { $regex: reg } }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(404).send({
        status: 900,
        message: '数据库查询错误',
        err: err
      })
    })

});
router.post('/getData/room/key', function (req, res) { //房间表模糊搜索
  const reg = new RegExp(req.body.index);
  room.find({
    $or: [
      { roomId: { $regex: reg } },
      { buildId: { $regex: reg } },
      { roomName: { $regex: reg } },
      { roomDate: { $regex: reg } },
      { roomType: { $regex: reg } },
      { roomUse: { $regex: reg } },
      { roomArea: { $regex: reg } },
      { roomPercent: { $regex: reg } }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(404).send({
        status: 900,
        message: '数据库查询错误',
        err: err
      })
    })

});
router.post('/getData/owner/key', function (req, res) { //业主表模糊搜索
  const reg = new RegExp(req.body.index);
  owner.find({
    $or: [
      { ownerId: { $regex: reg } },
      { ownerName: { $regex: reg } },
      { ownerSex: { $regex: reg } },
      { ownerNative: { $regex: reg } },
      { ownerPhone: { $regex: reg } },
      { ownerIden: { $regex: reg } },
      { roomId: { $regex: reg } },
      { roleId: { $regex: reg } }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(404).send({
        status: 900,
        message: '数据库查询错误',
        err: err
      })
    })

});
router.post('/getData/member/key', function (req, res) { //业主成员表模糊搜索
  const reg = new RegExp(req.body.index);
  member.find({
    $or: [
      { memberId: { $regex: reg } },
      { memberName: { $regex: reg } },
      { memberSex: { $regex: reg } },
      { memberNative: { $regex: reg } },
      { memberPhone: { $regex: reg } },
      { ownerId: { $regex: reg } }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(404).send({
        status: 900,
        message: '数据库查询错误',
        err: err
      })
    })

});
router.post('/getData/pay/key', function (req, res) { //业主缴费表模糊搜索
  const reg = new RegExp(req.body.index);
  pay.find({
    $or: [
      { payId: { $regex: reg } },
      { chargeIds: { $regex: reg } },
      { payMoney: { $regex: reg } },
      { payReceive: { $regex: reg } },
      { payLack: { $regex: reg } },
      { payDate: { $regex: reg } },
      { ownerId: { $regex: reg } },
      { payState: { $regex: reg } },
      { payMonth: { $regex: reg } }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(404).send({
        status: 900,
        message: '数据库查询错误',
        err: err
      })
    })

});
router.post('/getData/charge/key', function (req, res) { //缴费项目表模糊搜索
  const reg = new RegExp(req.body.index);
  charge.find({
    $or: [
      { chargeId: { $regex: reg } },
      { chargeName: { $regex: reg } },
      { chargeUnit: { $regex: reg } }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(404).send({
        status: 900,
        message: '数据库查询错误',
        err: err
      })
    })

});
router.post('/getData/material/key', function (req, res) { //物资管理表模糊搜索
  const reg = new RegExp(req.body.index);
  material.find({

    $or: [
      { materialId: { $regex: reg } },
      { materialName: { $regex: reg } },
      { materialCount: { $regex: reg } },
      { materialPrice: { $regex: reg } },
      { typeId: { $regex: reg } },
      { materialInDate: { $regex: reg } },
      { materialOutDate: { $regex: reg } },
      { payState: { $regex: reg } },
      { materialStat: { $regex: reg } }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(404).send({
        status: 900,
        message: '数据库查询错误',
        err: err
      })
    })

});
router.post('/getData/emp/key', function (req, res) { //员工管理表模糊搜索
  const reg = new RegExp(req.body.index);
  emp.find({
    $or: [
      { empId: { $regex: reg } },
      { name: { $regex: reg } },
      { text: { $regex: reg } },
      { password: { $regex: reg } }
    ]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(404).send({
        status: 900,
        message: '数据库查询错误',
        err: err
      })
    })

});
router.post('/getData/user/key', function (req, res) { //用户管理表模糊搜索
  const reg = new RegExp(req.body.index);
  let arrss = [];
  regist.aggregate([
    {
      $lookup: {
        from: "role_powers",
        localField: "roleId",
        foreignField: "roleId",
        as: "powerId"
      }
    },
    {
      $lookup: {
        from: "owners",
        localField: "roleId",
        foreignField: "roleId",
        as: "ownerId"
      }
    },
    {
      $match: {
        $or: [
          { nickName: { $regex: reg } },
          { text: { $regex: reg } },
          { password: { $regex: reg } },
          { roleId: { $regex: reg } }
        ]
      }
    }

  ], function (err, data) {
    if (data.length > 0) {
      for (const key in data) {
        let arrs = [];
        arrs.push(data[key].roleId);
        arrs.push(data[key].ownerId[0].ownerId);
        arrs.push(data[key].nickName);
        arrs.push(data[key].text);
        arrs.push(data[key].password);
        arrs.push(data[key].powerId[0].powerId);
        arrss.push(arrs);
      }
      res.send(arrss);
    } else {
      res.send(arrss);
    }

  })

});

/***
 * 
 * -----  更新数据板块-- 暂无bug
 */
router.post('/updateData/build', function (req, res) { //计数器实现 循环异步
  let arr = JSON.parse(req.body.data);
  let k = 0;
  let k1 = 0;
  for (const iterator of arr) {
    build.findOneAndUpdate({
      buildId: iterator[0]
    }, {
      buildName: iterator[1],
      buildStart: iterator[2],
      buildFinish: iterator[3],
      buildMessage: iterator[4],
      buildArea: iterator[5]
    }).then(data => {
      k = k + 1;
      if (data) {
        k1 = k1 + 1;
      } else {
        k1 = 'err';
      }
      if (k == arr.length) {
        if (k1 == arr.length) {
          res.status(200).send({
            status: 200,
            message: 'ok'
          })
        } else if (k1 = 'err') {
          res.send({
            status: 400,
            message: 'err'
          })
        }
      }
    }).catch(err => {
      res.redirect('/notFound');
      throw err;
    })
  }
});
router.post('/updateData/room', function (req, res) {
  let arr = JSON.parse(req.body.data);
  let k = 0;
  let k1 = 0;
  for (const iterator of arr) {
    room.findOneAndUpdate({
      roomId: iterator[0]
    }, {
      buildId: iterator[1],
      roomName: iterator[2],
      roomDate: iterator[3],
      roomType: iterator[4],
      roomUse: iterator[5],
      roomArea: iterator[6],
      roomPercent: iterator[7]
    }).then(data => {
      k = k + 1;
      if (data) {
        k1 = k1 + 1;
      } else {
        k1 = 'err';
      }
      if (k == arr.length) {
        if (k1 == arr.length) {
          res.status(200).send({
            status: 200,
            message: 'ok'
          })
        } else if (k1 = 'err') {
          res.send({
            status: 400,
            message: 'err'
          })
        }
      }
    }).catch(err => {
      res.redirect('/notFound');
      throw err;
    })
  }
});
router.post('/updateData/owner', function (req, res) {
  let arr = JSON.parse(req.body.data);
  let i = 0;
  for (const iterator of arr) {
    owner.findOneAndUpdate({
      ownerId: iterator[0],
      roleId: iterator[7]
    }, {
      ownerName: iterator[1],
      ownerSex: iterator[2],
      ownerNative: iterator[3],
      ownerPhone: iterator[4],
      ownerIden: iterator[5],
      roomId: iterator[6]
    }).then(data => {
      if (data) { i = i + 1; }
      else { i = 'err'; };
      if (i == arr.length) { return res.send({ status: 200, message: 'ok' }) }
      if (i == 'err') { res.send({ status: 400, message: 'err' }) }
    }).catch(err => {
      res.redirect('/notFound');
      throw err;
    })
  }
});
router.post('/updateData/member', function (req, res) {
  let arr = JSON.parse(req.body.data);
  let i = 0;
  for (const iterator of arr) {
    member.findOneAndUpdate({
      memberId: iterator[0]
    }, {
      memberName: iterator[1],
      memberSex: iterator[2],
      memberNative: iterator[3],
      memberPhone: iterator[4],
      ownerId: iterator[5]
    }).then(data => {
      if (data) { i = i + 1; }
      else { i = 'err'; };
      if (i == arr.length) { return res.send({ status: 200, message: 'ok' }) }
      if (i == 'err') { res.send({ status: 400, message: 'err' }) }
    }).catch(err => {
      res.redirect('/notFound');
      throw err;
    })
  }
});
router.post('/updateData/pay', function (req, res) {
  let arr = JSON.parse(req.body.data);
  let i = 0;
  for (const iterator of arr) {
    pay.findOneAndUpdate({
      payId: iterator[0]
    }, {
      chargeIds: iterator[1],
      payMoney: iterator[2],
      payReceive: iterator[3],
      payLack: iterator[4],
      payDate: iterator[5],
      ownerId: iterator[6],
      payState: iterator[7],
      payMonth: iterator[8]
    }).then(data => {
      if (data) { i = i + 1; }
      else { i = 'err'; };
      if (i == arr.length) { return res.send({ status: 200, message: 'ok' }) }
      if (i == 'err') { res.send({ status: 400, message: 'err' }) }
    }).catch(err => {
      res.redirect('/notFound');
      throw err;
    })
  }
});
router.post('/updateData/charge', function (req, res) {
  let arr = JSON.parse(req.body.data);
  let i = 0;
  for (const iterator of arr) {
    charge.findOneAndUpdate({
      chargeId: iterator[0]
    }, {
      chargeName: iterator[1],
      chargeUnit: iterator[2]
    }).then(data => {
      if (data) { i = i + 1; }
      else { i = 'err'; };
      if (i == arr.length) { return res.send({ status: 200, message: 'ok' }) }
      if (i == 'err') { res.send({ status: 400, message: 'err' }) }
    }).catch(err => {
      res.redirect('/notFound');
      throw err;
    })
  }
});
router.post('/updateData/material', function (req, res) {
  let arr = JSON.parse(req.body.data);
  let i = 0;
  for (const iterator of arr) {
    material.findOneAndUpdate({
      materialId: iterator[0]
    }, {
      materialName: iterator[1],
      materialCount: iterator[2],
      materialPrice: iterator[3],
      typeId: iterator[4],
      materialInDate: iterator[5],
      materialOutDate: iterator[6],
      materialStat: iterator[7]
    }).then(data => {
      if (data) { i = i + 1; }
      else { i = 'err'; };
      if (i == arr.length) { return res.send({ status: 200, message: 'ok' }) }
      if (i == 'err') { res.send({ status: 400, message: 'err' }) }
    }).catch(err => {
      res.redirect('/notFound');
      throw err;
    })
  }
});
router.post('/updateData/emp', function (req, res) {
  let arr = JSON.parse(req.body.data);
  let i = 0;
  for (const iterator of arr) {
    emp.findOneAndUpdate({
      empId: iterator[0]

    }, {
      name: iterator[1],
      text: iterator[2],
      password: iterator[3]
    }).then(data => {
      if (data) { i = i + 1; }
      else { i = 'err'; };
      if (i == arr.length) { return res.send({ status: 200, message: 'ok' }) }
      if (i == 'err') { res.send({ status: 400, message: 'err' }) }
    }).catch(err => {
      res.redirect('/notFound');
      throw err;
    })
  }
});
router.post('/updateData/user', function (req, res) {
  let arr = JSON.parse(req.body.data);
  let k = 0;
  let k1 = 0;
  for (const iterator of arr) {
    regist.findOneAndUpdate({
      roleId: iterator[0]
    }, {
      password: iterator[4],
      nickName: iterator[2]
    })
      .then(data => {
        return r_power.findOneAndUpdate({ roleId: iterator[0] }, { powerId: iterator[5] })
      })
      .then(data => {
        k = k + 1;
        if (data) {
          k1 = k1 + 1;
        } else {
          k1 = 'err';
        }
        if (k == arr.length) {
          if (k1 == arr.length) {
            res.status(200).send({
              status: 200,
              message: 'ok'
            })
          } else if (k1 = 'err') {
            res.send({
              status: 400,
              message: 'err'
            })
          }
        }
      })
      .catch(err => {
        if (err) {
          res.status(200).send({ status: 400, message: '服务器错误' });
        }
        throw err;
      })
  }
});

/**
 * --------添加数据板块
 */
router.post('/insertData/build', function (req, res) {
  let reqData = JSON.parse(req.body.data);
  build.insertMany({
    buildId: reqData[0],
    buildName: reqData[1],
    buildStart: reqData[2],
    buildFinish: reqData[3],
    buildMessage: reqData[4],
    buildArea: reqData[5]
  }).then(data => {
    if (data) {
      res.send({
        status: 200,
        message: '添加成功'
      })
    }
  }).catch(err => {
    if (err) {
      res.send({
        status: 404,
        message: '参数错误，只有楼栋信息可以为空，楼栋ID不能重复'
      })
    }
  })
});
router.post('/insertData/room', function (req, res) {
  let reqData = JSON.parse(req.body.data);
  room.insertMany({
    roomId: reqData[0],
    buildId: reqData[1],
    roomName: reqData[2],
    roomDate: reqData[3],
    roomType: reqData[4],
    roomUse: reqData[5],
    roomArea: reqData[6],
    roomPercent: reqData[7]
  }).then(data => {
    if (data) {
      res.send({
        status: 200,
        message: '添加成功'
      })
    }
  }).catch(err => {
    if (err) {
      res.send({
        status: 404,
        message: '参数错误，只有入住时间，房间类型，用途可以为空，楼栋ID不能重复'
      })
    }
  })
});
router.post('/insertData/owner', function (req, res) {
  let reqData = JSON.parse(req.body.data);
  owner.insertMany({
    ownerId: reqData[0],
    ownerName: reqData[1],
    ownerSex: reqData[2],
    ownerNative: reqData[3],
    ownerPhone: reqData[4],
    ownerIden: reqData[0],
    roomId: reqData[6],
    roleId: reqData[3]
  }).then(data => {
    if (data) {
      res.send({
        status: 200,
        message: '添加成功'
      })
    }
  }).catch(err => {
    if (err) {
      res.send({
        status: 404,
        message: '参数错误，所有值不能为空,业主ID号,业主联系电话,身份证号码,角色ID不能重复'
      })
    }
  })
});
router.post('/insertData/member', function (req, res) {
  let reqData = JSON.parse(req.body.data);
  member.insertMany({
    memberId: reqData[0],
    memberName: reqData[1],
    memberSex: reqData[2],
    memberNative: reqData[3],
    memberPhone: reqData[4],
    ownerId: reqData[5]
  }).then(data => {
    if (data) {
      res.send({
        status: 200,
        message: '添加成功'
      })
    }
  }).catch(err => {
    if (err) {
      res.send({
        status: 404,
        message: '参数错误，只有联系方式可以为空，成员ID不能重复'
      })
    }
  })
});
router.post('/insertData/pay', function (req, res) {
  let reqData = JSON.parse(req.body.data);
  pay.insertMany({
    payId: reqData[0],
    chargeIds: reqData[1],
    payMoney: reqData[2],
    payReceive: reqData[3],
    payLack: reqData[4],
    payDate: reqData[5],
    ownerId: reqData[6],
    payState: reqData[7],
    payMonth: reqData[8]
  }).then(data => {
    if (data) {
      res.send({
        status: 200,
        message: '添加成功'
      })
    }
  }).catch(err => {
    if (err) {
      res.send({
        status: 404,
        message: '参数错误，所有值不能为空,缴费单ID不能重复'
      })
    }
  })
});
router.post('/insertData/charge', function (req, res) {
  let reqData = JSON.parse(req.body.data);
  charge.insertMany({
    chargeId: reqData[0],
    chargeName: reqData[1],
    chargeUnit: reqData[2]
  }).then(data => {
    if (data) {
      res.send({
        status: 200,
        message: '添加成功'
      })
    }
  }).catch(err => {
    if (err) {
      res.send({
        status: 404,
        message: '参数错误，所有值不能为空,收费项目id号不能重复'
      })
    }
  })
});
router.post('/insertData/material', function (req, res) {
  let reqData = JSON.parse(req.body.data);
  material.insertMany({
    materialId: reqData[0],
    materialName: reqData[1],
    materialCount: reqData[2],
    materialPrice: reqData[3],
    typeId: reqData[4],
    materialInDate: reqData[5],
    materialOutDate: reqData[6],
    materialStat: reqData[7]
  }).then(data => {
    if (data) {
      res.send({
        status: 200,
        message: '添加成功'
      })
    }
  }).catch(err => {
    if (err) {
      res.send({
        status: 404,
        message: '参数错误，所有值不能为空,物资ID号，物资名称不能重复'
      })
    }
  })
});
router.post('/insertData/emp', function (req, res) {
  let reqData = JSON.parse(req.body.data);
  emp.insertMany({
    empId: reqData[0],
    name: reqData[1],
    text: reqData[2],
    password: reqData[3]
  }).then(data => {
    if (data) {
      res.send({
        status: 200,
        message: '添加成功'
      })
    }
  }).catch(err => {
    if (err) {
      res.send({
        status: 404,
        message: '参数错误，所有值不能为空,员工ID，员工账号不能重复'
      })
    }
  })
});
router.post('/insertData/user', function (req, res) {
  let reqData = JSON.parse(req.body.data);
  regist.insertMany({
    nickName: reqData[2],
    text: reqData[3],
    password: reqData[4],
    roleId: reqData[0]
  })
    .then(data => {
      return owner.insertMany({
        ownerId: reqData[1],
        ownerName: 'null',
        ownerSex: 'null',
        ownerNative: 'null',
        ownerPhone: 'null',
        ownerIden: reqData[1],
        roomId: 'null',
        roleId: reqData[0]
      })
    })
    .then(data => {
      return r_power.insertMany({
        powerId: reqData[5],
        roleId: reqData[0]
      })
    })
    .then(data => {
      if (data) {
        res.send({
          status: 200,
          message: '添加成功，请进入业主管理完善信息，否则无法继续添加'
        })
      }
    })
    .catch(err => {
      if (err) {
        res.send({
          status: 404,
          message: '参数错误，所有值不能为空,请检查角色ID，账号，业主ID，是否重复'
        })
      }
    })
});

/***
 * ---------删除数据板块
 */
router.post('/removeData/build', function (req, res) {
  let data = JSON.parse(req.body.data); //data 是点击小li的数组
  build.deleteOne({ buildId: data[0] }, function () {
    res.send({ status: 200, message: '删除成功' });
  })
});
router.post('/removeData/owner', function (req, res) {
  let data = JSON.parse(req.body.data); //data 是点击小li的数组
  r_power.deleteOne({ roleId: data[7] })
    .then(datas => {
      return regist.deleteOne({ roleId: data[7] });
    })
    .then(datas => {
      return owner.deleteOne({ roleId: data[7] });
    })
    .then(datas => {
      res.status(200).send({
        status: 200,
        message: '您根据角色ID删除了 注册表，权限表，业主表'
      })
    })
    .catch(err => {
      res.send({
        status: 404,
        message: '服务器错误'
      })
      throw err;
    })
});
router.post('/removeData/member', function (req, res) {
  let data = JSON.parse(req.body.data); //data 是点击小li的数组
  member.deleteOne({ memberId: data[0] }, function () {
    res.send({ status: 200, message: '删除成功' });
  })
});
router.post('/removeData/pay', function (req, res) {
  let data = JSON.parse(req.body.data); //data 是点击小li的数组
  pay.deleteOne({ payId: data[0] }, function () {
    res.send({ status: 200, message: '删除成功' });
  })
});
router.post('/removeData/charge', function (req, res) {
  let data = JSON.parse(req.body.data); //data 是点击小li的数组
  charge.deleteOne({ chargeId: data[0] }, function () {
    res.send({ status: 200, message: '删除成功' });
  })
});
router.post('/removeData/material', function (req, res) {
  let data = JSON.parse(req.body.data); //data 是点击小li的数组
  material.deleteOne({ materialId: data[0] }, function () {
    res.send({ status: 200, message: '删除成功' });
  })
});
router.post('/removeData/emp', function (req, res) {
  let data = JSON.parse(req.body.data); //data 是点击小li的数组
  emp.deleteOne({ empId: data[0] }, function () {
    res.send({ status: 200, message: '删除成功' });
  })
});

/**
 * -- -- - --导出路由
 */
module.exports = router;