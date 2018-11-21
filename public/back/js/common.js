$(function(){
    // ajax 全局进度条
    $( document ).ajaxStart(function() {
        NProgress.start();
    });
    $( document ).ajaxStop(function() {
        NProgress.done();
    })


});