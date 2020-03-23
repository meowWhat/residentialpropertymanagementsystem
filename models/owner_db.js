/**
 * 业主信息表
 */
//引包
let mongoose = require('mongoose');

//创建schema
const Schema = mongoose.Schema;

let userSchema = new Schema({
  ownerId: { //业主ID号==身份证号码
    type: String,
    required: true,
    unique: true
  },
  ownerName: {//业主姓名
    type: String,
    required: true
  },
  ownerSex: {//业主性别
    type: String,
    required: true
  },
  ownerNative: {//业主籍贯
    type: String,
    required: true
  },
  ownerPhone: {//业主联系电话
    type: String,
    required: true
  },
  ownerIden: {//身份证号码
    type: String,
    required: true
  },
  roomId: {//房间ID号
    type: String,
    required: true
  },
  roleId: {//角色ID
    type: String,
    required: true,
    unique: true
  }
}, {
  versionKey: false
});

//导出model
module.exports = mongoose.model('owners', userSchema);