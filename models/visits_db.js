/**
 * 浏览量记录
 */
//引包
const mongoose = require('mongoose');
//创建schema
const Schema = mongoose.Schema;

let schema = new Schema({
}, {
  versionKey: false
});

//导出modle
module.exports = mongoose.model('visits', schema);