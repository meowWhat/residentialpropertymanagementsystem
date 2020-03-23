/***
 * 物资分类表   
 */


const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    typeId: { //物资类别ID号
        type: String,
        required: true,
        unique: true
    },
    typeName: {//物资类别名
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('types', schema);