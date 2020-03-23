/***
 * 
 * 员工注册表： 只能由管理员分配员工账号密码
 * 
 */
const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    empId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('emp_regists', schema);