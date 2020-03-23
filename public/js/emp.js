/***
 * 
 * ----------------员工界面渲染,请求核心板块-----------
 */

/**
 * 自定义变量  
 */
let temp = null;
let temp2 = null;
let index = null;
let nav = $('nav');
let menu = $('nav h1');
let main = $('main');
let user = [{
  name: '楼栋管理',
  message: ['楼栋ID', '楼栋名', '开工时间', '竣工时间', '楼栋信息', '面积'],
  messages: [
    ['12', 'default', '12-22', '1-3', '数据格式']
  ]
}, {
  name: '房间管理',
  message: ['房间ID', '楼栋ID', '房间名', '入住时间', '房型', '用途', '建筑面积', '得房率'],
  messages: []
}, {
  name: '业主管理',
  message: ['业主ID', '姓名', '性别', '籍贯', '电话', '身份证号', '房间ID', '角色ID'],
  messages: []
}, {
  name: '业主成员管理',
  message: ['成员ID', '姓名', '性别', '籍贯', '电话号码', '业主ID'],
  messages: []
},
{
  name: '账单详情',
  message: ['账单ID', '项目ID', '应缴金额', '实付金额', '欠缺金额', '缴费日期', '业主ID', '缴费状态', '账单月份'],
  messages: []
},
{
  name: '收费项目管理',
  message: ['项目ID', '项目名称', '项目详情'],
  messages: [],
  show: 1
},
{
  name: '物资管理',
  message: ['物资ID', '物资名称', '物资数量', '物资价格', '类型ID', '入库时间', '出库时间', '物资状态'],
  messages: [],
  show: 1
}
];
//小结 ： 完成前端的数组crud 。 现在需要将对应的crud后的数组 发送请求至服务器端。再完成数据库的crud

$(function ($) {
  /**
   * 点击左侧导航栏，渲染对应页面
   */
  $('li').click(function () {
    index = $(this).index(); //拿到当前小li的index
    // 判断需要请求哪个板块的数据
    switch (index) {
      case 0: //请求楼栋
        dataHandleFinal('/getData/build', index);
        break;
      case 1: //请求房间信息
        dataHandleFinal('/getData/room', index);
        break;
      case 2: //请求业主信息
        dataHandleFinal('/getData/owner', index);
        break;
      case 3: //请求业主成员信息
        dataHandleFinal('/getData/member', index);
        break;
      case 4: //请求收费项目信息
        dataHandleFinal('/getData/pay', index);
        break;
      case 5: //请求业主缴费
        dataHandleFinal('/getData/charge', index);
        break;
      case 6: //请求物资管理信息
        dataHandleFinal('/getData/material', index);
        break;
    }
    show(); //渲染页面
    nav.toggleClass('menu-active');
    main.toggleClass('menu-active');
    nav.removeClass('menu-hover');
    main.removeClass('menu-hover');
  });

  /***
   *  监听 crud  各种按钮点击事件
   */
  $('#admin')
    .on('dblclick', '.li', function () { //前端数组数据修改
      //参数1 事件 参数2 拿到元素查找方式 3 回调函数
      temp2 = $(this).html();
      $(this).html('<input type="text" class="li_input"/>');
      temp = $(this);
      $('.li_input').focus();
      $('.li').on('blur', '.li_input', function () {
        if ($(this).val().trim()) {
          temp.html($(this).val().trim());
          user[index].messages[temp.parent().index()][temp.index() - 1] = $(this).val().trim();
        } else {
          var temp3 = temp2;
          temp.html(temp3);
        }
      })
    })
    .on('click', '#admin_add', function () { //数据添加
      let arr = [];
      for (const i in user[index].message) {
        arr.push($('.lt').eq(i).val());
      }
      user[index].messages.push(arr);
      let arrs = JSON.stringify(arr);
      switch (index) {
        case 0: //添加楼栋
          insert('/insertData/build', arrs);
          break;
        case 1: //添加房间信息
          insert('/insertData/room', arrs);
          break;
        case 2: //添加业主信息
          insert('/insertData/owner', arrs);
          break;
        case 3: //添加业主成员信息
          insert('/insertData/member', arrs);
          break;
        case 4: //添加收费项目信息
          insert('/insertData/pay', arrs);
          break;
        case 5: //添加业主缴费
          insert('/insertData/charge', arrs);
          break;
        case 6: //添加物资管理信息
          insert('/insertData/material', arrs);
          break;
      }

    })
    .on('click', '.admin_remove', function () { //删除数据操作
      let data = JSON.stringify(user[index].messages[$(this).parent().parent().index()]);
      switch (index) {
        case 0:
          remove('/removeData/build', data);
          break;
        case 1:
          remove('/removeData/room', data);
          break;
        case 2:
          remove('/removeData/owner', data);
          break;
        case 3:
          remove('/removeData/member', data);
          break;
        case 4:
          remove('/removeData/pay', data);
          break;
        case 5:
          remove('/removeData/charge', data);
          break;
        case 6:
          remove('/removeData/material', data);
          break;
      }
    })
    .on('click', '#k_search', function () { // 模糊查询 请求
      switch (index) {
        case 0: //请求楼栋
          dataHandleFinal('/getData/build/key', $('#k_text').val());
          break;
        case 1: //请求房间信息
          dataHandleFinal('/getData/room/key', $('#k_text').val());
          break;
        case 2: //请求业主信息
          dataHandleFinal('/getData/owner/key', $('#k_text').val());
          break;
        case 3: //请求业主成员信息
          dataHandleFinal('/getData/member/key', $('#k_text').val());
          break;
        case 4: //请求收费项目信息
          dataHandleFinal('/getData/pay/key', $('#k_text').val());
          break;
        case 5: //请求业主缴费
          dataHandleFinal('/getData/charge/key', $('#k_text').val());
          break;
        case 6: //请求物资管理信息
          dataHandleFinal('/getData/material/key', $('#k_text').val());
          break;
      }
    })
    .on('click', '#k_refresh', function () { // 数据刷新 请求
      switch (index) {
        case 0: //请求楼栋
          dataHandleFinal('/getData/build', index);
          break;
        case 1: //请求房间信息
          dataHandleFinal('/getData/room', index);
          break;
        case 2: //请求业主信息
          dataHandleFinal('/getData/owner', index);
          break;
        case 3: //请求业主成员信息
          dataHandleFinal('/getData/member', index);
          break;
        case 4: //请求收费项目信息
          dataHandleFinal('/getData/pay', index);
          break;
        case 5: //请求业主缴费
          dataHandleFinal('/getData/charge', index);
          break;
        case 6: //请求物资管理信息
          dataHandleFinal('/getData/material', index);
          break;
      }
    })
    .on('click', '#update', function () { // 保存按钮点击发送数据修改请求
      let data = JSON.stringify(user[index].messages);
      switch (index) {
        case 0:
          $.post('/updateData/build', {
            data: data
          }, function (data, err) {
            if (data.status == 200)
              return mdalshow('恭喜您修改成功 自动刷新');
            mdalshow('修改失败 主键不允许修改 想改先删除再改哦!! 自动刷新');
          });
          break;
        case 1:
          $.post('/updateData/room', {
            data: data
          }, function (data, err) {
            if (data.status == 200)
              return mdalshow('恭喜您修改成功 自动刷新');
            mdalshow('修改失败 主键不允许修改 想改先删除再改哦!! 自动刷新');
          });
          break;
        case 2:
          $.post('/updateData/owner', {
            data: data
          }, function (data, err) {
            if (data.status == 200)
              return mdalshow('恭喜您修改成功 自动刷新');
            mdalshow('修改失败 ID 姓名 身份证号无法修改');
          });
          break;
        case 3:
          $.post('/updateData/member', {
            data: data
          }, function (data, err) {
            if (data.status == 200)
              return mdalshow('恭喜您修改成功 自动刷新');
            mdalshow('修改失败 主键不允许修改 想改先删除再改哦!! 自动刷新');
          });
          break;
        case 4:
          $.post('/updateData/pay', {
            data: data
          }, function (data, err) {
            if (data.status == 200)
              return mdalshow('恭喜您修改成功 自动刷新');
            mdalshow('修改失败 主键不允许修改 想改先删除再改哦!! 自动刷新');
          });
          break;
        case 5:
          $.post('/updateData/charge', {
            data: data
          }, function (data, err) {
            if (data.status == 200)
              return mdalshow('恭喜您修改成功 自动刷新');
            mdalshow('修改失败 主键不允许修改 想改先删除再改哦!! 自动刷新');
          });
          break;
        case 6:
          $.post('/updateData/material', {
            data: data
          }, function (data, err) {
            if (data.status == 200)
              return mdalshow('恭喜您修改成功 自动刷新');
            mdalshow('修改失败 主键不允许修改 想改先删除再改哦!! 自动刷新');
          });
          break;
      }
    });

  $('#modal').click(function () { //模态框点击请求
    $('#modal').hide();
    switch (index) {
      case 0: //请求楼栋
        dataHandleFinal('/getData/build', index);
        break;
      case 1: //请求房间信息
        dataHandleFinal('/getData/room', index);
        break;
      case 2: //请求业主信息
        dataHandleFinal('/getData/owner', index);
        break;
      case 3: //请求业主成员信息
        dataHandleFinal('/getData/member', index);
        break;
      case 4: //请求收费项目信息
        dataHandleFinal('/getData/pay', index);
        break;
      case 5: //请求业主缴费
        dataHandleFinal('/getData/charge', index);
        break;
      case 6: //请求物资管理信息
        dataHandleFinal('/getData/material', index);
        break;
    }

  })

});

/***
 * 
 * 工具类
 */
function show () { //页面渲染
  var html = template('tpl', {
    user: user[index]
  });
  $('#admin').html(html);
}

function dataHandle (data, conditon) { //数据处理  
  let arrs = [];
  let temp = [];
  for (const iterator of conditon) {
    temp.push('k !=' + '\'' + iterator + '\'');
  }
  temps = temp.join('&&');
  user[index].messages = [];
  for (const j of data) {
    for (const k in j) {
      // if (eval(temps)) {
      //   arrs.push(j[k]);
      // }
      eval('if (' + temps + '){arrs.push(j[k]);} else {}');
    }
    user[index].messages.push(arrs);
    arrs = [];
  }
}

function dataHandleFinal (url, i) {
  $.post(url, {
    index: i //这里可以填写自己的加密码 --防止不法分子盗用接口
  },
    function (data, err) {
      //处理data
      if (data.status == 900 || data.status == 800) { //错误简单处理 。。挖个坑后期再加
        location.href('/notFound');
      } else {
        dataHandle(data, ['_id', '__v']);
        show();
      }
    });
}

function mdalshow (show_message) {
  $('#modal_body').html(show_message);
  $('#modal').show();
}

function insert (url, arr) {
  $.post(url, {
    data: arr
  }, function (data) {
    if (data.status == 404) {
      mdalshow(data.message);
    }
    if (data.status == 200) {
      mdalshow(data.message);
    }
  })
}

function remove (url, arr) {
  $.post(url, {
    data: arr
  }, function (data) {
    if (data.status == 200) {
      return mdalshow(data.message);
    }
    mdalshow('错误，，但是不可能错误的');
  });
}