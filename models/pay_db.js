/**
 * 业主缴费明细表
 */

const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    payId: {//缴费单ID
        type: String,
        required: true,
        unique: true
    },
    chargeIds: {//收费项目ID
        type: String,
        required: true
    },
    payMoney: {//应收金额
        type: String,
        required: true
    },
    payReceive: {//实收金额
        type: String,
        required: true
    },
    payLack: {//欠费金额
        type: String,
        required: true
    },
    payDate: {//收费时间
        type: String,
        required: true
    },
    ownerId: {//业主ID号
        type: String,
        required: true
    },
    payState: {//缴费状态  0 未缴  1 缴
        type: String,
        required: true
    },
    payMonth: {//账单月份
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('pays', schema);