/***
 * 权限表   
 * 1:admin, --最大
 * 2:low_user -- 只能走查询
 * 3:high_user --可以走管理啊，缴费
 */


const mongoose = require('mongoose');

let schema = new mongoose.Schema({  //拿到powerID 走权限
    powerId: { //权限ID   
        type: String,
        required: true,
        unique: true
    },
    powerName: { //权限名称
        type: String,
        required: true
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('powers', schema);