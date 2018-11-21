$(function(){

  /* 需求: 表单校验 */
  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */
  $('#form').bootstrapValidator({
      // 配置小图标功能
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
    // 配置校验字段  不要忘了配置input的 name属性
    fields:{
        // 配置用户名
        username:{
            // 配置校验规则
            validators:{
                // 非空校验
                notEmpty: {
                    message: '用户名不能为空'
                  },
                //长度校验
                stringLength: {
                    min: 2,
                    max: 6,
                    message: '用户名长度必须在2到6之间'
                },
                callback:{
                    message:"用户名错误"
                }
            }
        },
        // 配置密码
        password:{
            validators:{
                notEmpty:{
                    message:'密码不能为空'
                },
                stringLength: {
                    min: 6,
                    max: 12,
                    message: '密码长度必须在6到12之间'
                },
                callback:{
                    message:"密码错误"
                }
            }
        }
    }
  });
// 表单提交
  $("#form").on('success.form.bv', function (e) {
    e.preventDefault();
    //使用ajax提交逻辑
    $.ajax({
        url:"/employee/employeeLogin",
        type:"post",
        data:$("#form").serialize(),
        success:function( info ){
            // console.log(info)
            if( info.success ) {
                location.href = "index.html";
            }
            if( info.error === 1000){
                $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
            }
            if( info.error === 1001){
                $("#form").data("bootstrapValidator").updateStatus("username", "INVALID", "callback")
            }
        }
    })
});

// 表单重置

    $('[type="reset"]').on("click",function() {
        $('#form').data("bootstrapValidator").resetForm();
    });

    
});
