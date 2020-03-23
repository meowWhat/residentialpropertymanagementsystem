
/***
 * 
 * ----------------用户界面渲染,请求核心板块-----------
 */

/**
 * 自定义变量  当时没写注释 现在也忘记了变量是干嘛的。。。。
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
  messages: []
},
{
  name: '房间管理',
  message: ['房间ID', '楼栋ID', '房间名', '入住时间', '房型', '用途', '建筑面积', '得房率'],
  messages: []
},
{
  name: '业主管理',
  message: ['业主ID', '姓名', '性别', '籍贯', '电话', '身份证号', '房间ID', '角色ID'],
  messages: []
},
{
  name: '业主成员管理',
  message: ['成员ID', '姓名', '性别', '籍贯', '电话号码', '业主ID'],
  messages: [],
  show: 1
},
{
  name: '收费项目查询',
  message: ['项目ID', '项目名称', '项目详情'],
  messages: []
},
{
  name: '业主缴费',
  messages: [],
  show: 2
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
        $.get('/getData/owner/member', function (data, err) {
          if (data.status == 200) {
            user[3].messages = [];
            if (data.data.length > 0) {
              for (const iterator of data.data) {
                user[3].messages.push(iterator);
              }
              show();
            }
          }
          if (data.status == 400) {
            alert('权限不足。请完善业主信息!!');
            location.href = '/user/message';
          }
        })
        break;
      case 4: //请求收费项目
        dataHandleFinal('/getData/charge', 5);
        break;
      case 5://业主缴费功能
        $.post('/owner/getData/pay', function (data, err) {
          if (data.status == 200) {
            user[5].messages = [];
            if (data.data.length > 0) {
              for (const iterator of data.data) {
                user[5].messages.push(iterator);
              }
              show();
            }
          }
          if (data.status == 400) {
            alert('权限不足。请完善业主信息!!');
            location.href = '/user/message';
          }
        })
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
        case 3: //添加业主成员信息
          insert('/insertData/member', arrs);
          break;
      }

    })
    .on('click', '.admin_remove', function () { //删除数据操作
      let data = JSON.stringify(user[index].messages[$(this).parent().parent().index()]);
      switch (index) {
        case 3:
          remove('/removeData/member', data);
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
        case 4:
          dataHandleFinal('/getData/charge/key', $('#k_text').val());
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
        case 4: //请求业主缴费
          dataHandleFinal('/getData/charge', 5);
          break;
      }
    })
    .on('click', '#update', function () { // 保存按钮点击发送数据修改请求
      let data = JSON.stringify(user[index].messages);
      switch (index) {
        case 3:
          $.post('/updateData/member', {
            data: data
          }, function (data, err) {
            if (data.status == 200)
              return mdalshow('恭喜您修改成功 自动刷新');
            mdalshow('修改失败 主键不允许修改 想改先删除再改哦!! 自动刷新');
          });
          break;
      }
    })
    .on('click', "#checkAll", function () {
      $('.checkOne').prop("checked", $(this).prop("checked"));
      sum();
    })
    .on('click', ".checkOne", function () {
      if ($('.checkOne:checked').length == $('#tbody').find('.tr').length) {
        $('#checkAll').prop("checked", true);
      }
      else {
        $('#checkAll').prop("checked", false);
      }
      sum();
      if ($('.checkOne:checked').length === 0) {
        $('#charge').attr('disabled', false);
      }
    })

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
      case 4: //请求业主缴费
        dataHandleFinal('/getData/charge', 5);
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
function sum () {
  let money = 0;
  $.each($('.checkOne:checked'), function (i, ele) {
    money = money + Number.parseFloat($(ele).parent().parent().find("*").eq('2').html());
  })
  $('#price').text(money.toFixed(2));
}