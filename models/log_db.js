/**
 * 日志信息表
 */
//引包
const mongoose = require('mongoose');
//创建schema
const Schema = mongoose.Schema;

let schema = new Schema({
  name: String,
  text: String,
  password: String,
  time: String,
  message: String
}, {
  versionKey: false
});

//导出modle
module.exports = mongoose.model('log', schema);