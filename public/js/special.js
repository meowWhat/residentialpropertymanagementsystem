/***
 * ----------------------------界面动画的js代码----------------
 */

(function () {

  var nav = $('nav'),
    menu = $('nav h1'),
    main = $('main'),
    open = false,
    hover = false;
  menu.on('click', function () {
    open = !open ? true : false;
    nav.toggleClass('menu-active');
    main.toggleClass('menu-active');
    nav.removeClass('menu-hover');
    main.removeClass('menu-hover');
  });
  // menu.hover(  //鼠标经过菜单的 旋转， 有一点点卡 去掉了 性能代优化
  //   function () {
  //     if (!open) {
  //       nav.addClass('menu-hover');
  //       main.addClass('menu-hover');
  //     }
  //   },
  //   function () {
  //     nav.removeClass('menu-hover');
  //     main.removeClass('menu-hover');
  //   }
  // );

})();