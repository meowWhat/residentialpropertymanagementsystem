/**
 * 用户权限表
 */

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    // rolePowerId: { //角色权限ID    
    //     type: Number,
    //     required: true,
    //     unique: true
    // },
    roleId: { //角色ID  
        //注册完成走这个表 role_power  一个roleId 插入权限 --然后一个账号就对应了一个权限ID
        type: String,
        required: true
    },
    powerId: {//权限ID
        type: String,
        default: 2
        /***
         *    
         * 1:admin, --最大
         * 2:low_user -- 只能走查询
         * 3:high_user --可以走管理啊，缴费
         * 4:low_emp --
         * 5:high_emp -- 分了超级管理员和管理员 。。 本来就权限就没什么。。 就别降权限了
         */
    },

}, {
    versionKey: false
});

module.exports = mongoose.model('role_powers', schema);