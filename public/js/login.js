
$(function($){
    $.get('/captcha',function (data,err) {
            $('#captchaShow').html(data.data);
    })
    $('#captchaShow').click(function () {
        $.get('/captcha',function (data,err) {
            $('#captchaShow').html(data.data);
    }) 
    });
});