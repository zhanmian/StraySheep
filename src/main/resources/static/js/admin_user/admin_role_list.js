$(document).ready(function(){

    initDataTable();
    toCreate();

    handleSearch();

    handleDelete();
    handleEdit();

    $('body').on('click', '#result-submit', function(){
        window.location.href = baseUrl+"?data-url=admin/to_admin_role_list";
    });
});

function initDataTable() {

    $('#admin-role-list-table').DataTable({
        "processing": true,
        "ordering": true,
        "searching": false,
        "serverSide": true,
        "lengthChange": false,
        "ajax": {
            "url":baseUrl+"/admin/admin_role_list",
            "type":"post",
            "data": function (param) {
                //搜索的关键词，datatable向服务器传额外参数
                param.roleName = $('#role-name').val();
            }
        },

        "columns": [
            {"data": "roleId", "visible": false},
            {"data": "roleName"},
            {"data": "createTime"},
            {
                data: 'adfdfdfdf',
                render: function (data, type, row) {
                    return '<button type="button" class="btn btn-default" id="edit" data-id="'+row.roleId+'">编辑</button>'
                        +'<button type="button" class="btn btn-default" id="delete" data-id="'+row.roleId+'">删除</button>';
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

function handleSearch(){
    $('body').on( 'click', '#search', function () {

        var table = $('#admin-role-list-table').DataTable();
        //json就是上面initDataTable()方法里的data额外参数
        table.ajax.reload( function ( json ) { } );
    });
}

function toCreate() {
    $('body').on('click', '#create-role', function () {
        $.ajax({
            type: 'post',
            url: baseUrl+"/admin/to_admin_role_create",
            success: function (response) {
                $('#content-wrapper').html(response);
            }
        });
    });
}

function handleDelete() {

    $('#admin-role-list-table tbody').on( 'click', '#delete', function () {
        var roleId = $(this).attr("data-id");
        var table = $('#admin-role-list-table').DataTable();

        $('#show-delete-modal').modal('show');

        $('#delete-submit').click(
            function(){
                $.ajax({
                    type: 'post',
                    data: roleId,
                    url: baseUrl+'/admin/delete_admin_role?roleId='+roleId,
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

    $('#admin-role-list-table tbody').on( 'click', '#edit', function () {

        var roleId = $(this).attr("data-id");

        $.ajax({
            type: 'post',
            data: roleId,
            url: baseUrl+'/admin/to_admin_role_update?roleId='+roleId,
            success: function (response) {
                $('#content-wrapper').html(response);
            }
        });
    });
}