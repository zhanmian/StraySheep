
var role = {};

$(document).ready(function(){

    //点击modal后再加载数据
    $('#myModal').on('show.bs.modal', function () {
        loadZTree();
        getPermission();
    });

    $('body').on('click', '#result-submit', function(){
        window.location.href = baseUrl+"?data-url=admin/to_admin_role_list";
    });

    createAdminRole();

});

function getPermission() {
    $('body').on('click', '#permission-submit', function () {

        var treeObj = $.fn.zTree.getZTreeObj("permissionTree");

        role.nodes = treeObj.getCheckedNodes(true);

        $('#myModal').modal('hide');

    });
}

function createAdminRole(){

    $('body').on('click', '#submit', function () {

        $(this).attr("disabled","disabled");

        role.roleName = $('#role-name').val();

        $.ajax({
            type: 'post',
            dataType: 'json',
            data: JSON.stringify(role),
            contentType: 'application/json;charset=UTF-8',
            url: baseUrl+'/admin/create_admin_role',
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
// demo实例
// var zNodes = [
//     { id:1, pId:0, name:"can check 1", open:true},
//     { id:11, pId:1, name:"can check 1-1-1"},
//     { id:11, pId:1, name:"can check 1-1-2"},
//     { id:11, pId:1, name:"can check 1-1-2"},
//     { id:2, pId:0, name:"can check 1-2", open:true},
//     { id:22, pId:2, name:"can check 1-2-1"},
//     { id:22, pId:2, name:"can check 1-2-2"},
//     { id:22, pId:2, name:"can check 1-2-2"},
//     { id:3, pId:0, name:"can check 2", checked:true, open:true},
//     { id:33, pId:3, name:"can check 2-1"},
//     { id:33, pId:3, name:"can check 2-1"},
//     { id:33, pId:3, name:"can check 2-2"}
// ];

