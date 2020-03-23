/**
 * 楼栋信息表
 */
//引包
const mongoose = require('mongoose');
//创建schema
const Schema = mongoose.Schema;

let schema = new Schema({
  roomId: { //房间ID号
    type: String,
    required: true,
    unique: true
  },
  buildId: { //楼栋ID号
    type: String,
    required: true
  },
  roomName: { //房间名
    type: String,
    required: true
  },
  roomDate: { //入住时间
    type: String,
    required: false
  },
  roomType: { //房型
    type: String,
    required: false
  },
  roomUse: { //用途
    type: String,
    required: false
  },
  roomArea: { //建筑面积
    type: String,
    required: true
  },
  roomPercent: { //得房率
    type: String,
    required: true
  }
}, {
  versionKey: false
});

//导出modle
module.exports = mongoose.model('rooms', schema);