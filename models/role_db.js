/***
 * 员工权限表  
 */


const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    roleId: { //角色ID号    
        type: String,
        required: true,
        unique: true
    },
    roleName: {//角色类别
        type: String,
        required: true
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('roles', schema);