
var myEditor;

$(document).ready(function(){

    checkBox();

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


    $("#upload").click(

        function(){
            var formData = new FormData();
            formData.append('file', $('#upload-image')[0].files[0]);
            $.ajax({
                url:baseUrl+'/article/upload',
                data: formData,
                type: 'post',
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {
                    $('#filePath').val(response.data.filePath);
                    $("#upload-succeed").html("图片上传成功，请点击下方提交按钮更新文章。");
                }
            });
        }
    );


    $('#submit').click(

        function update(){
            var article = {};
            article.id = $('#id').val();
            article.title = $('#title').val();
            article.summary = $('#summary').val();
            article.content = myEditor.getData();
            article.image = $('#filePath').val();

            //获取checkbox被选中的值并赋给categoryId
            $("input[name='category']:checked").each(function () {
                article.categoryId = this.value;
            });

            $.ajax({
                type: 'post',
                url: baseUrl+'/article/update',
                dataType: 'json',
                data:{
                    json:JSON.stringify(article)
                },
                success: function(response){
                    $('#myModal').modal('hide');
                    $('#result-message').html(response.message);
                    $('#result-modal').modal('show');
                }
            });
        }
    );
});

function checkBox(){
    var categoryId = $('#selectedCategoryId').val();
    //遍历checkBox并与隐藏域里的roleId进行匹配和勾选
    $("input[name='category']").each(function() {
        if($(this).val()===categoryId){
            $(this).prop("checked",true);
        }
    });
}

