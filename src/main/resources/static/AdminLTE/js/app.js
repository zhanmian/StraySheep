
    $(document).ready(function(){

        handleMenu();
        highlightMenu();

        toMyProfile();
        exportExcel();
        importExcel();
    });

    function toMyProfile(){

        var userId = $('#user-id').val();

        $('#my-profile').click(
            function(){
                $.ajax({
                    type: 'post',
                    data: userId,
                    url:baseUrl+'/admin/to_admin_user_profile?userId='+userId,
                    success: function (response) {
                        $('#content-wrapper').html(response);
                    }
                });
            }
        )
    }

    function exportExcel(){
        $('#export-excel').click(
            function(){
                /*
                不能使用ajax，因为ajax请求只是个“字符型”的请求，即请求的内容是以文本类型存放的。
                文件的下载是以二进制形式进行的，ajax没法解析后台返回的文件流，
                所以无法处理二进制流response输出来下载文件。
                */
                window.location.href = baseUrl+'/admin/export_excel';
            }
        )
    }

    function importExcel(){

        $("#submit-excel").click(
            function(){
                var formData = new FormData();
                formData.append('file', $('#inputFile')[0].files[0]);
                $.ajax({
                    url:baseUrl+'/admin/import_excel',
                    data: formData,
                    type: 'post',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (response) {

                    }
                });
            }
        );
    }


    function handleMenu() {
        var params = (new URL(document.location)).searchParams;
        var dataUrl = params.get("data-url");
        loadModule(dataUrl);

        $('#sidebar-menu').find('a').click(
            function () {
                var a = $(this);
                var url = a.data('url');
                loadModule(url);
            });

        //刷新后遍历<a>标签的url并和地址栏的data-url进行比对
        //匹配后高亮
        $('.sidebar-menu a').each(function(){
            if($(this).data("url") === dataUrl){
                $(this).parent().addClass('active')
                    .closest('.treeview-menu').addClass('.menu-open')
                    .closest('.treeview').addClass('active');
            }
        });

    }

    function loadModule(url){
        $.ajax({
            type: "post",
            url: baseUrl + "/" + url,
            success: function (response) {
                //控制台输出响应信息
                // console.log(response);
                $('#content-wrapper').html(response);
            }
        });
    }

    //当前菜单栏高亮
    function highlightMenu(){
        $('.sidebar-menu li:not(.treeview) > a').on('click', function(){
            var $parent = $(this).parent().addClass('active');
            $parent.siblings('.treeview.active').find('> a').trigger('click');
            $parent.siblings().removeClass('active').find('li').removeClass('active');
        });

        // $(window).on('load', function(){
        //     $('.sidebar-menu a').each(function(){
        //         if(this.href === window.location.href){
        //             $(this).parent().addClass('active')
        //                 .closest('.treeview-menu').addClass('.menu-open')
        //                 .closest('.treeview').addClass('active');
        //         }
        //     });
        // });
    }
