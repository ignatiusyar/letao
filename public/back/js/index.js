$(function(){
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.querySelector('.echarts_left'));

        // 指定图表的配置项和数据
        var option1 = {
          //   标题文本
            title: {
                text: '2018年 注册人数'
            },
            // 提示框组件
            tooltip: {},
            legend: {
                data:['人数']
            },
            xAxis: {
                data: ["6月","7月","8月","9月","10月","11月"]
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
  
        // 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);

            // 基于准备好的dom，初始化echarts实例
      var myChart2 = echarts.init(document.querySelector('.echarts_right'));

      // 指定图表的配置项和数据
      var option2 = {
        title : {
            text: '某站点用户访问来源',
            subtext: '纯属虚构',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:135, name:'视频广告'},
                    {value:1548, name:'搜索引擎'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    

      // 使用刚指定的配置项和数据显示图表。
      myChart2.setOption(option2);
});