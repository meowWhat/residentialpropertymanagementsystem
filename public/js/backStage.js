// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
let option = {
  title: {
    text: '访问记录表'
  },
  color: ['#3398DB'],
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    data: ['首页访问量', '用户注册量', '业主注册量'],
    axisTick: {
      alignWithLabel: true
    }
  }],
  yAxis: [{
    type: 'value'
  }],
  series: [{
    name: '首页访问量',
    type: 'bar',
    barWidth: '60%',
    data: []
  }]
};

// 使用刚指定的配置项和数据显示图表。


let admin = {
  th: ['角色', '账号', '密码', '时间', '信息记录'],
  td: []
}
$(function ($) {
  $.post('/getData/log/all', function (data, err) {
    option.series[0].data.push(data.total);
    option.series[0].data.push(data.userRegister);
    option.series[0].data.push(data.ownerRegister);
    myChart.setOption(option);
  })
  $.post('/getData/log', function (data, err) { //所有数据请求
    dataHandle(data.data);
  });
  let index = 1; //index 是什么？ 是page 
  let num = 0; //num 记录 当前小li的index

  let message = null;
  $('#search').click(function () { //----搜索按钮点击
    message = $('#search_text').val().trim();
    $.post('/getData/log/key', {
      message: message
    }, function (data, err) {
      dataHandle(data.data);
    });
  });
  $('#reload').click(function () {
    //----刷新按钮点击
    message = null;
    $('#pre').attr('disabled', true);
    $.post('/getData/log', function (data, err) { //所有数据请求
      $('#search_text').val('');
      dataHandle(data.data);
      index = 1;
      num = 0;
      $('.page-item').eq(0).children().text(index);
      $('.page-item').eq(1).children().text(index + 1);
      $('.page-item').eq(2).children().text(index + 2);
      $('.page-item').eq(3).children().text(index + 3);
      $('.page-item').eq(4).children().text(index + 4);
      $('.page-item').children().removeClass('show');
      $('.page-item').eq(num).children().addClass('show');
    });
  });
  $('#admin').on('click', '#remove', function () {
    let index = $(this).parent().parent().index();
    $.post('/removeData/log', {
      message: admin.td[index].text
    }, function (data, err) {
      if (data.status == 200) {
        return $.post('/getData/log', function (data, err) { //所有数据请求
          $('#search_text').val('');
          dataHandle(data.data);
        });
      }
      location.href = '/notFound';
    });
  });
  $('#pre').attr('disabled', true);
  $('#pre').click(function () {
    index--;
    num--;
    if (index == 1) {
      $('#pre').attr('disabled', true);
    }
    if (num <= 0) {
      num = 0;
    }
    if (Number.parseInt($('.page-item').eq(0).children().text()) - 1 == index) {
      $('.page-item').eq(0).children().text(index - 4);
      $('.page-item').eq(1).children().text(index - 3);
      $('.page-item').eq(2).children().text(index - 2);
      $('.page-item').eq(3).children().text(index - 1);
      $('.page-item').eq(4).children().text(index);
      num = 4;
      $('.page-item').children().removeClass('show');
      $('.page-item').eq(num).children().addClass('show');
    } else {
      $('.page-item').children().removeClass('show');
      $('.page-item').eq(num).children().addClass('show');
    }
    if (message) {
      $.post('/getData/log/key', {
        page: index - 1,
        message: message
      }, function (data, err) {
        dataHandle(data.data);
      });
    } else {
      $.post('/getData/log', {
        page: index - 1
      }, function (data, err) {
        dataHandle(data.data);
      });
    }

  })
  $('#next').click(function () {
    index++;
    num++;
    if (message) {
      $.post('/getData/log/key', {
        page: index - 1,
        message: message
      }, function (data, err) {
        dataHandle(data.data);
      });
    } else {
      $.post('/getData/log', {
        page: index - 1
      }, function (data, err) {
        dataHandle(data.data);
      });
    }
    $('#pre').attr('disabled', false);
    if (Number.parseInt($('.page-item').eq(4).children().text()) + 1 == index) {
      $('.page-item').eq(0).children().text(index);
      $('.page-item').eq(1).children().text(index + 1);
      $('.page-item').eq(2).children().text(index + 2);
      $('.page-item').eq(3).children().text(index + 3);
      $('.page-item').eq(4).children().text(index + 4);
      num = 0;
      $('.page-item').children().removeClass('show');
      $('.page-item').eq(num).children().addClass('show');
    } else {
      $('.page-item').children().removeClass('show');
      $('.page-item').eq(num).children().addClass('show');
    }
  });
  $('.page-item').click(function () {
    index = Number.parseInt($(this).text());
    num = Number.parseInt($(this).index() - 1);
    $('.page-item').children().removeClass('show');
    $('.page-item').eq(num).children().addClass('show');
    if (message) {
      $.post('/getData/log/key', {
        page: index - 1,
        message: message
      }, function (data, err) {
        dataHandle(data.data);
      });
    } else {
      $.post('/getData/log', {
        page: index - 1
      }, function (data, err) {
        dataHandle(data.data);
      });
    }

    if (index == 1) {
      $('#pre').attr('disabled', true);
    }
    else {
      $('#pre').attr('disabled', false);
    }
  });

});


function show () { //页面渲染
  var html = template('tpl', {
    admin: admin
  });
  $('#admin').html(html);
}

function dataHandle (data) { //数据处理
  if (data.length > 0) {
    admin.td = [];
    let arr = [];
    for (const key in data) {
      arr.push(data[key]);
    }
    admin.td = arr;
    return show();
  }
  admin.td = [];
  show();
}