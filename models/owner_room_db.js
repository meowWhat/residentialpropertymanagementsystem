/***
 * 业主-房间  关系表
 */


const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    ownerRoomId: { //业主房间关系ID
        type: String,
        required: true
    },
    roomId: {//房间id
        type: String,
        required: true
    },
    ownerId: {//业主ID
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('user_rooms', schema);