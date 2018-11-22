$(function () {
    var currentPage = 1; // 当前页
    var pageSize = 5; // 每页条数

    var currentId; // 当前编辑用户的id  

    var isDelete; // 修改的状态

    // 1.已进入页面,发送ajax请求,获取用户数据列表
    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                // console.log(info);
                // template ( 模板id,数据对象 )
                var htmlStr = template("firstTmp", info);
                $("tbody").html(htmlStr);

                // 根据后台返回的数据,进行分页初始化
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion: 3, // 版本号
                    currentPage: info.page, // 当前页
                    totalPages: Math.ceil(info.total / info.size), // 总页数= 后台总条数 /  每页显示的条数 向上取整
                    // 给页码添加点击事件
                    onPageClicked: function (event, originalEvent, type, page) {
                        console.log(page); // 获取当前点击的页码
                        // 根据page 重新请求数据,进行渲染
                        currentPage = page; // 更新当前页

                        // 根据当前页重新渲染
                        render();
                    }
                })
            }
        });
    };

    // 2. 点击启用禁用按钮,显示模态框(事件委托) 因为注册时还页面上还没有相关元素,所以只能使用事件委托
    $('tbody').on("click",".btn",function() {
        // 显示模态框
        $("#userModal").modal("show");
        // 获取用户id
        currentId = $(this).parent().data("id");
        // console.log(currentId)
        // 获取需要修改的状态,根据按钮的类名来判断
        // 禁用按钮 ? 0 : 1;
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    });
    // 3. 点击模态框确认按钮,完成用户的启用禁用
    $("#submitBtn").click(function() {
        $.ajax({
            type:"post",
            url:"/user/updateUser",
            data:{
                id:currentId,
                isDelete:isDelete
            },
            dataType:"json",
            success:function( info ){
                // 成功就关闭模态框
                $("#userModal").modal("hide"); // show hide
                // 重新渲染页面
                render();
            }
        })
    })
})