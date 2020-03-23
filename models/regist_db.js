/**
 * 注册信息表(管理员和员工不用注册)
 */
//引包
const mongoose = require('mongoose');
//创建schema
const Schema = mongoose.Schema;

let userSchema = new Schema({
  nickName: { //姓名  ==不是昵称
    type: String,
    required: true
  },
  text: { //账号
    type: String,
    required: true,
    unique: true
  },
  password: { //密码
    type: String,
    required: true
  },
  roleId: { //角色ID
    type: String,  //roleId==text
    required: true
  }

}, {
  versionKey: false
});

//导出model
module.exports = mongoose.model('regist', userSchema);