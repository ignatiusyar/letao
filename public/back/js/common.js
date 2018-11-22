
// ajax 全局进度条
$( document ).ajaxStart(function() {
    NProgress.start();
});
$( document ).ajaxStop(function() {
    NProgress.done();
});


$(function(){

    // 功能需求 : 登录拦截,对于未登录用户,拦截到登录页
    // 由于前段不知道用户的当前登录状态,但后台知道,所以需要发送ajax请求来获取



    // 公用的功能
    // 1. 左侧二级菜单切换
    $("#category").on("click",function() {
        // next(); 找下一个兄弟元素
        // stop(); 动画未完成点击停止
        $(this).next().stop().slideToggle();
    });

    $(".lt_topbar .icon_left").click(function() {
        $(".lt_aside").toggleClass('hidemenu');
        $(".lt_topbar").toggleClass('hidemenu');
        $(".lt_main").toggleClass('hidemenu');
    });

    // 2.退出功能
    $(".lt_topbar .icon_right").click(function() {
        // 显示退出模态框
        $("#logoutModal").modal("show");
    });
    $("#logoutBtn").click(function() {
        // 调用接口,让后台销毁用户登录状态
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                console.log(info);
                if( info.success ){
                    // 销毁登录状态成功
                    location.href = "login.html";
                }
            }

        })
    });
});