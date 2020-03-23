/**
 * 业主成员信息表
 */


const mongoose = require('mongoose');


let schema = new mongoose.Schema({
    memberId: { //成员id
        type: String,
        required: true,
        unique: true
    },
    memberName: {//成员姓名
        type: String,
        required: true
    },
    memberSex: {//成员性别
        type: String,
        required: true
    },
    memberNative: {//成员籍贯
        type: String,
        required: true
    },
    memberPhone: {//成员联系方式
        type: String
    },
    ownerId: {//业主id
        type: String,
        required: true
    }

}, {
    versionKey: false
});


module.exports = mongoose.model('members', schema);