/**
 * 楼栋信息表
 */
//引包
const mongoose = require('mongoose');
//创建schema
const Schema = mongoose.Schema;

let schema = new Schema({
  buildId: { //楼栋ID号
    type: String,
    required: true,
    unique: true
  },
  buildName: { //楼栋名称
    type: String,
    required: true
  },
  buildStart: { //开工时间
    type: String,
    required: true
  },
  buildFinish: { //竣工时间
    type: String,
    required: true
  },
  buildMessage: { //楼栋信息
    type: String,
    required: false
  },
  buildArea: { //建筑面积
    type: String,
    required: true
  }
  // buildDelete: { //删除状态码
  //   type: Number,
  //   required: true
  // }
}, {
  versionKey: false
});

//导出modle
module.exports = mongoose.model('builds', schema);