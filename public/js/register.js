/***
 * 用户注册界面的一些简单处理
 */

$(function ($) {
  $('#nickName').focus(clicks).blur(clicks);
  $('#userName').focus(clicks).blur(clicks);
  $('#password').focus(clicks).blur(clicks);
  $('#password2').keyup(clicks);

  $('#regist').click(function () {
    if ($('#nickName').val().trim() && $('#userName').val().trim() && $('#password').val().trim() && $('#password2').val().trim()) {
      $.post("/regist", {
        name: $('#nickName').val().trim(),
        text: $('#userName').val().trim(),
        password: $('#password').val().trim()
      },
        function (data, status) {
          if (data.status == 2) {
            $('#inner').html('账号或者昵称重复');
            $('#warn').show();
          } else {
            location.href = '/user';
          }
        });
    } else {
      $('#inner').html('必填信息不能位空!!');
      $('#warn').show();
    }

  });
  $('#warn').click(function () {
    $(this).hide();
  });
  function clicks () {
    if ($(this).val().trim().length >= 3) {
      $('.invalid-feedback').hide();
      $('#regist').attr('disabled', false);
    } else {
      $('.invalid-feedback').show();
      $('#regist').attr('disabled', true);
    }
  }

})