$(document).ready(function () {

    initDataTable();

    handleDelete();
    handleEdit();
    handleSearch();
    handleCheckBox();

    toCreate();
    uploadImage();
    submit();

    $('body').on('click', '#result-submit', function(){
        window.location.href = baseUrl+"?data-url=article/to_list";
    });

});

var myEditor;

function initDataTable() {

    $('#article-list-table').DataTable({
        "processing": true,
        "searching": false,
        "serverSide": true,
        "lengthChange": false,
        "ajax": {
            "url":baseUrl+"/article/list",
            "type":"post",
            "data": function (param) {
                //搜索的关键词，datatable向服务器传额外参数
                param.title = $('#title').val();
                param.content = $('#content').val();
            }
        },

        "columns": [
            {"data": "id", "visible": false},
            {"data": "title"},
            {"data": "summary"},
            {"data": "createTime"},
            {
                data: 'adfdfdfdf',
                render: function (data, type, row) {
                    return '<button type="button" class="btn btn-default" id="edit" data-id="'+row.id+'">编辑</button>'
                        +'<button type="button" class="btn btn-default" id="delete" data-id="'+row.id+'">删除</button>';
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

function handleEdit() {

    $('#article-list-table tbody').on( 'click', '#edit', function () {
        var id = $(this).attr("data-id");
        $.ajax({
            type: 'post',
            data: id,
            url: baseUrl+'/article/to_update?id='+id,
            success: function (response) {
                    console.log(response);//控制台输出响应信息
                    $('#content-wrapper').html(response);
                }
        });
    });
}
function handleDelete() {

    $('#article-list-table tbody').on( 'click', '#delete', function () {
        var id = $(this).attr("data-id");
        var table = $('#article-list-table').DataTable();

        $('#show-delete-modal').modal('show');

        $('#delete-submit').click(
            function(){
                $.ajax({
                    type: 'post',
                    data: id,
                    url: baseUrl+'/article/delete?id='+id,
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

function handleSearch(){
    $('body').on( 'click', '#search', function () {

        var table = $('#article-list-table').DataTable();
        //json就是上面initDataTable()方法里的data额外参数
        table.ajax.reload( function ( json ) { } );
    });
}

function toCreate(){
    $('body').on( 'click', '#create', function () {
        $.ajax({
            type: 'post',
            url: baseUrl+"/article/to_create",
            success: function (response) {
                $('#content-wrapper').html(response);
                CKEditor();
            }
        });
    });
}
function CKEditor(){
    ClassicEditor
        .create( document.querySelector( '#content' ),{
            language:'zh-cn',//需要引入语言文件
            ckfinder: {
                uploadUrl: baseUrl+'/article/upload/CKImage'
            }
        })
        .then(function(editor){
            myEditor  = editor;
        }).catch(function(error){
        console.error(error);
    });
}
function uploadImage(){

    $("#upload").click(
        function(){
            var formData = new FormData();
            var file = $('#upload-image')[0].files[0];
            formData.append('file', file);
            $.ajax({
                url:baseUrl+'/article/upload',
                data: formData,
                type: 'post',
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {
                    $('#filePath').val(response.data.filePath);
                    $("#upload-succeed").html("图片上传成功!请点击下方提交按钮提交文章。");
                }
            });
        }
    );
}

function submit(){
    $('#submit').click(function(){

        var checked=$("input[name='category']:checked");

        if($('#filePath').val().length === 0){
            alert('请插入图片');
        }if(checked.length === 0) {
            $('#category-message').html('请选择分类！');
        } else{
            create();
        }
    });
}

function create(){
    var article = {};
    article.title = $('#title').val();
    article.summary = $('#summary').val();
    article.content = myEditor.getData();
    article.image = $('#filePath').val();
    article.creatorId = $('#userId').val();

    //获取checkbox被选中的值并赋给categoryId
    $("input[name='category']:checked").each(function () {
        article.categoryId = this.value;
    });

    $.ajax({
        type: 'post',
        url: baseUrl+'/article/create',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        data:JSON.stringify(article),
        success: function(data){
            $('#result-message').html(data.message);
            $('#result-modal').modal('show');
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




