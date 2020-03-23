
/**
 * 收费项目表
 */

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    chargeId: { //收费项目id号
        type: String,
        required: true,
        unique: true
    },
    chargeName: {//收费项目名称
        type: String,
        required: true
    },
    chargeUnit: {//收费项目标准 rmb/月
        type: String,
        required: true
    }

}, {
    versionKey: false
});

module.exports = mongoose.model('charges', schema);