$(function() {


    // 进行 scroll 区域滚动初始化
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        indicators: false
    });


    var gallery = mui('.mui-slider');

    gallery.slider({

        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；

    });

    var indicator = document.querySelectorAll('.slider_wrap img');
    var point = document.querySelector(".point");
    for(var i = 0; i < indicator.length - 2; i++ ){
        point.innerHTML += '<div class="mui-indicator"></div>';
    }



})