$(function(){
    var picArr = []; // 专门用于存储图片地址

    var currentPage = 1;
    var pageSize = 3; 

    render();
    // 1. 渲染页面和分页插件
    function render() {
        $.ajax({
           type:"get",
           url:"/product/queryProductDetailList",
           data:{
               page:currentPage,
               pageSize:pageSize
           },
           dataType:"json",
           success:function( info ){
            //    console.log(info);
                var htmlStr = template("productTpl", info);
                $('tbody').html( htmlStr );
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage: info.page,
                    totalPages:Math.ceil( info.total / info.size ),
                    onPageClicked:function(event, originalEvent, type, page) {
                        currentPage = page;
                        render();
                    }
                })
           }
       });  
    };

    // 2.点击添加商品按钮,显示模态框
    $("#addBtn").on("click",function() {
        $("#addModal").modal('show');
        var total;
         // 发送 ajax, 请求所有的二级分类数据, 进行渲染
         $.ajax({
             type:"get",
             url:"/category/querySecondCategoryPaging",
             dataType:"json",
             data:{
                page:1,
                pageSize:total
             },
             success:function( info ){
                total = info.total;
                var htmlStr = template( "dropdownTpl", info );
                $('.dropdown-menu').html( htmlStr );
             }
         })
    });

    // 3.给下拉框的a 添加点击事件(事件委托)
    $('.dropdown-menu').on("click","a",function(){
        // 获取文本,设置给按钮
        console.log($(this));
        var txt = $(this).text();
        $('#dropdownText').text( txt );

        // 获取id,设置给隐藏域
        var id = $(this).data("id");
        $('[name="brandId"]').val( id );

        $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
    });

    // 4.配置fileupload,实现文件上传
    $('#fileupload').fileupload({
        dataType:"json", // 返回的数据
        done:function( e, data ) {
            // console.log(data.result);
            var picObj = data.result;
            picArr.unshift ( picObj ); // 往数组最前面添加

            var picUrl = picObj.picAddr;
            $('#imgBox').prepend('<img src="'+ picUrl +'" style="width:100px;">');

            // 如果长度 > 3 说明超出范围,需要将最后一张删除
            if ( picArr.length > 3 ){
                // 删除数组的最后一项
                picArr.pop();
                // 删除最后一张图片
                $('#imgBox img:last-of-type').remove();
            }
            // console.log(picArr);
            if ( picArr.length === 3 ) {
                // 说明当前图片已经上传满 3 张, 需要将 picStatus 校验状态改成 VALID
                $('#form').data("bootstrapValidator").updateStatus("picStatus", "VALID");
              }
        }

    });
    $('#form').bootstrapValidator({
        // 配置排除项, 需要对隐藏域进行校验
        excluded: [],
    
        // 配置小图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',   // 校验成功
          invalid: 'glyphicon glyphicon-remove',   // 校验失败
          validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
    
        // 配置校验规则
        fields: {
          brandId: {
            validators: {
              notEmpty: {
                message: "请选择二级分类"
              }
            }
          },
          proName: {
            validators: {
              notEmpty: {
                message: "请输入商品名称"
              }
            }
          },
          proDesc: {
            validators: {
              notEmpty: {
                message: "请输入商品描述"
              }
            }
          },
          num: {
            validators: {
              notEmpty: {
                message: "请输入商品库存"
              },
              //正则校验, 非零(1-9)
              // \d  0-9
              // *    表示0次或多次
              // +    表示1次或多次
              // ?    表示0次或一次
              // {m,n}
              regexp: {
                regexp: /^[1-9]\d*$/,
                message: '商品库存必须是非零开头的数字'
              }
            }
          },
          size: {
            validators: {
              notEmpty: {
                message: "请输出商品尺码"
              },
              regexp: {
                regexp: /^\d{2}-\d{2}$/,
                message: '必须是xx-xx的格式, xx是两位数字, 例如: 36-44'
              }
            }
          },
          oldPrice: {
            validators: {
              notEmpty: {
                message: "请输入商品原价"
              }
            }
          },
          price: {
            validators: {
              notEmpty: {
                message: "请输入商品现价"
              }
            }
          },
          picStatus: {
            validators: {
              notEmpty: {
                message: "请上传3张图片"
              }
            }
          }
        }
      });

  // 6. 注册表单校验成功事件, 阻止默认的提交, 通过 ajax提交
  $('#form').on("success.form.bv",function( e ){
      e.preventDefault();

      var paramsStr = $('#form').serialize(); //所有表单内容
    //   console.log(paramsStr);
    paramsStr += "&picName1=" + picArr[0].picName + "&picAddr1=" + picArr[0].picAddr;
    paramsStr += "&picName2=" + picArr[1].picName + "&picAddr2=" + picArr[1].picAddr;
    paramsStr += "&picName3=" + picArr[2].picName + "&picAddr3=" + picArr[2].picAddr;
    $.ajax({
      type: "post",
      url: "/product/addProduct",
      data: paramsStr,
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          $('#addModal').modal("hide");
          currentPage = 1;
          render();

          // 重置所有的表单内容和状态
          $('#form').data("bootstrapValidator").resetForm(true);

          // 由于下拉菜单  和  图片 不是表单元素, 需要手动重置
          $('#dropdownText').text("请选择二级分类");

          // 删除图片的同时, 清空数组
          $('#imgBox img').remove();
          picArr = [];
        }
      }
    })

  })

})