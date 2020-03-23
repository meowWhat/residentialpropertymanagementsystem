

// require('./con_db');
// const log = require("../models/log_db");
// log
//   .insertMany({
//     name: '员工',
//     text: 'emp1',
//     password: 'emp1',
//     time: '2020-01-06',
//     message: '修改了物资'
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   })

 //时间戳转换方法    date:时间戳数字

console.log(formatDate(Date.now()));
