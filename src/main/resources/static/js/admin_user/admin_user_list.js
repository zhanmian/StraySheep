
$(document).ready(function(){

    initDataTable();
    toCreate();

    handleDelete();
    handleEdit();

    handleSearch();

    handleCheckBox();

    $('body').on('click', '#result-submit', function(){
        window.location.href = baseUrl+"?data-url=admin/to_admin_user_list";
    });

});

function initDataTable() {

    $('#admin-user-list-table').DataTable({
        "processing": true,
        "searching": false,
        "serverSide": true,
        "lengthChange": false,
        "ajax": {
            "url":baseUrl+"/admin/admin_user_list",
            "type":"post",
            "data": function (param) {
                //搜索的关键词，datatable向服务器传额外参数
                param.username = $('#user-name').val();
                param.nickName = $('#nick-name').val();
                param.roleName = $('#role-name').val();
            }
        },

        "columns": [
            {"data": "userId", "visible": false},
            {"data": "username"},
            {"data": "nickName"},
            {"data": "roleName"},
            {"data": "createTime"},
            {
                data: 'adfdfdfdf',
                render: function (data, type, row) {
                    return '<button type="button" class="btn btn-default" id="edit" data-id="'+row.userId+'">编辑</button>'
                        +'<button type="button" class="btn btn-default" id="delete" data-id="'+row.userId+'">删除</button>';
                }
            }],
        language: {
            "sProcessing": "处理中...",
            "sLengthMenu": "显示 _MENU_ 项结果",
            "sZeroRecords": "没有匹配结果",
            "sInfo": "显示第 _START_ 至 _END_ 项结果，共 _TOTAL_ 项",
            "sInfoEmpty": "显示第 0 至 0 项结果，共 0 项",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoPostFix": "",
            "sSearch": "搜索:",
            "sUrl": "",
            "sEmptyTable": "表中数据为空",
            "sLoadingRecords": "载入中...",
            "sInfoThousands": ",",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            },
            "oAria": {
                "sSortAscending": ": 以升序排列此列",
                "sSortDescending": ": 以降序排列此列"
            }
        }
    });
}

function toCreate(){
    $('body').on('click', '#create-user', function(){

        $.ajax({
            type: 'post',
            url: baseUrl+"/admin/to_admin_user_create",
            success: function (response) {
                $('#content-wrapper').html(response);
            }
        });
    })
}

function handleSearch(){
    $('body').on( 'click', '#search', function () {

        var table = $('#admin-user-list-table').DataTable();
        //json就是上面initDataTable()方法里的data额外参数
        table.ajax.reload( function ( json ) { } );
    });
}

function handleDelete() {

    $('#admin-user-list-table tbody').on( 'click', '#delete', function () {
        var userId = $(this).attr("data-id");
        var table = $('#admin-user-list-table').DataTable();

        $('#show-delete-modal').modal('show');

        $('#delete-submit').click(
            function(){
                $.ajax({
                    type: 'post',
                    data: userId,
                    url: baseUrl+'/admin/delete_admin_user?userId='+userId,
                    success: function (response) {
                        $('#show-delete-modal').modal('hide');
                        $('#result-message').html(response.message);
                        $('#result-modal').modal('show');
                        table.ajax.reload();//局部刷新表格
                    }
                });
            }
        );
    });
}

function handleEdit() {

    $('#admin-user-list-table tbody').on( 'click', '#edit', function () {
        var userId = $(this).attr("data-id");

        $.ajax({
            type: 'post',
            data: userId,
            url: baseUrl+'/admin/to_admin_user_update?userId='+userId,
            success: function (response) {
                $('#content-wrapper').html(response);
                checkBox();//勾选已选角色
                handleCheckBox();//只能单选
            }
        });
    });
}

function checkBox(){
    var roleId = $('#selectedRoleId').val();
    //遍历checkBox并与隐藏域里的roleId进行匹配和勾选
    $("input[name='role']").each(function() {
        if($(this).val()===roleId){
            $(this).prop("checked",true);
        }
    });
}

function handleCheckBox(){
    $('.checkbox').find(':checkbox').click(function(){
        var selectedValue = $(this).val();
        //遍历checkbox并把勾选之外的选项设置为false以实现checkbox单选的功能
        $('.checkbox').find(':checkbox').each(function(){
            var value = $(this).val();
            if(value != selectedValue){
                $(this).prop('checked',false);
            }
        });
    });
}

