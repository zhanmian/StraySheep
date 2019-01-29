$(document).ready(function(){

    submit();
    uploadAvatar();

});

function submit(){

    $('#submit').click(
        function update(){
            var adminUser = {};
            adminUser.userId = $('#id').val();
            adminUser.username = $('#username').val();
            adminUser.nickName = $('#nickName').val();
            adminUser.avatar = $('#avatar-path').val();

            $("input[name='role']:checked").each(function () {
                adminUser.roleId = this.value;
            });

            $.ajax({
                type: 'post',
                data: JSON.stringify(adminUser),
                contentType: 'application/json;charset=UTF-8',
                dataType: 'json',
                url: baseUrl+'/admin/update_admin_user',
                success: function(response){
                    $('#myModal').modal('hide');
                    $('#result-message').html(response.message);
                    $('#result-modal').modal('show');
                }
            });
        }
    );
}

function uploadAvatar(){
    'use strict';//表示强规则
    var $image = $('#image');
    var $inputImage = $('#inputImage');
    var URL = window.URL || window.webkitURL;
    var uploadedImageURL;
    //获取图片截取的位置
    var $dataX = $('#dataX');
    var $dataY = $('#dataY');
    var $dataHeight = $('#dataHeight');
    var $dataWidth = $('#dataWidth');
    var $dataRotate = $('#dataRotate');
    var $dataScaleX = $('#dataScaleX');
    var $dataScaleY = $('#dataScaleY');
    var options = {
        aspectRatio: 1 / 1, //裁剪框比例1:1
        preview: '.img-preview',
        autoCropArea: 1,//裁剪框的大小（0~1之间的数值）
        background: false,
        crop: function (e) {
            $dataX.val(Math.round(e.x));
            $dataY.val(Math.round(e.y));
            $dataHeight.val(Math.round(e.height));
            $dataWidth.val(Math.round(e.width));
            $dataRotate.val(e.rotate);
            $dataScaleX.val(e.scaleX);
            $dataScaleY.val(e.scaleY);
        }
    };
    // Cropper
    $image.on({
        ready: function (e) {
            // console.log(e.type);
        },
        cropstart: function (e) {
            // console.log(e.type, e.action);
        },
        cropmove: function (e) {
            // console.log(e.type, e.action);
        },
        cropend: function (e) {
            // console.log(e.type, e.action);
        },
        crop: function (e) {
            // console.log(e.type, e.x, e.y, e.width, e.height, e.rotate, e.scaleX, e.scaleY);
        },
        zoom: function (e) {
            // console.log(e.type, e.ratio);
        }
    }).cropper(options);

    var file;

    if (URL) {
        $inputImage.change(function () {
            var files = this.files;

            if (!$image.data('cropper')) {
                return;
            }

            if (files && files.length) {
                file = files[0];

                if (/^image\/\w+$/.test(file.type)) {
                    if (uploadedImageURL) {
                        URL.revokeObjectURL(uploadedImageURL);
                    }

                    uploadedImageURL = URL.createObjectURL(file);
                    $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
                    $inputImage.val('');
                } else {
                    window.alert('Please choose an image file.');
                }
            }
        });
    } else {
        $inputImage.prop('disabled', true).parent().addClass('disabled');
    }

    $('#upload').click(
        function(){
            $image.cropper("getCroppedCanvas",
                {
                    width: 160,
                    height: 160 //设置长宽避免文件体积过大
                })
                .toBlob(function(blob){

                    var formData = new FormData();
                    var avatarName = 'avatar_' + file.name;//文件名添加头像前缀不会和原本的图片冲突
                    formData.append('file', blob, avatarName);
                    console.log(formData);

                    $.ajax({
                        method: 'post',
                        data: formData,
                        processData: false,
                        contentType: false,
                        url: baseUrl+'/article/upload',
                        success: function (response) {
                            $('#avatar-path').val(response.data.filePath);
                            $('#upload-avatar-result').html('(●\'◡\'●)ﾉ头像上传成功！');
                        }
                    });
                });
        });
}