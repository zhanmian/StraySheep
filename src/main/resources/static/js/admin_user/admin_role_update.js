
var role = {};

$(document).ready(function(){

    //点击modal后再加载数据
    $('#myModal').on('show.bs.modal', function () {
        loadZTree();
    });

    getPermission();
    updateAdminRole();

});

function getPermissionIdList(){

    var roleId = $('#roleId').val();

    $.ajax({
        cache: false,//必须关闭
        type: 'post',
        data: roleId,
        url: baseUrl+'/admin/get_permission_id_list?roleId='+roleId,
        success: function(response){
            var treeObj = $.fn.zTree.getZTreeObj("permissionTree");
            //通过遍历返回的id找到相应的节点并勾选
            for(var i = 0; i < response.length; i++){
                var node = treeObj.getNodeByParam("id", response[i]);
                treeObj.checkNode(node, true);
            }
        }
    });
}

function getPermission() {
    $('body').on('click', '#permission-submit', function () {

        var treeObj = $.fn.zTree.getZTreeObj("permissionTree");

        role.nodes = treeObj.getCheckedNodes(true);

        $('#myModal').modal('hide');

    });
}

function updateAdminRole(){

    $('body').on('click', '#submit', function () {

        $(this).attr("disabled","disabled");

        role.roleName = $('#roleName').val();

        role.roleId = $('#roleId').val();

        $.ajax({
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(role),
            contentType: 'application/json;charset=UTF-8',
            url: baseUrl+'/admin/update_admin_role',
            success: function (data) {
                $('#result-message').html(data.message);
                $('#result-modal').modal('show');

            }
        });
    });
}

function loadZTree(){

    var treeNodes;

    $.ajax({
        cache: false,
        type: 'post',
        dataType: 'json',
        url: baseUrl+'/admin/get_permission_list',
        success:function(data){
            treeNodes = data;
            var t = $('#permissionTree');
            t = $.fn.zTree.init(t, setting, treeNodes);
            //zTree自动展开所有节点
            var treeObj = $.fn.zTree.getZTreeObj("permissionTree");
            treeObj.expandAll(true);
            //获取拥有的权限并遍历勾选
            getPermissionIdList();
        }
    });
}
//配置，不能删除
var setting = {
    check: {
        enable: true
    },
    data: {
        simpleData: {
            enable: true
        }
    }
};