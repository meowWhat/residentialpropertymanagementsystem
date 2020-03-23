/**
 * 物资管理表
 */

/***
 * 业主-房间  关系表
 */


const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    materialId: {  //物资ID号
        type: String,
        required: true,
        unique: true
    },
    materialName: { //物资名称
        type: String,
        required: true,
        unique: true
    },
    materialCount: {//数量
        type: String,
        required: true
    },
    materialPrice: {//单价
        type: String,
        required: true
    },
    typeId: {//物资类别ID号
        type: String,
        required: true,
    },
    materialInDate: {//入库时间
        type: String,
        required: true
    },
    materialOutDate: { //出库时间
        type: String,
        required: true
    },
    materialStat: { //物资状态码
        type: String, //1- 2 -  3 -
        required: true
    }

}, {
    versionKey: false
});

module.exports = mongoose.model('materials', schema);