<link rel="stylesheet" href="/cropper/cropper.css" type="text/css">
<style>
    img {
        max-width: 100%; /* This rule is very important, please do not ignore this! */
    }
</style>
<section class="content-header">
    <h1>
        My Blog
        <small>随便写点什么吧...</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>首页</a></li>
        <li class="active">编辑用户</li>
    </ol>
</section>

<section class="content">

    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">编辑用户</h3>
        </div>
        <div class="box-body">
            <form role="form">

                <input type="hidden" id="id" value="${adminUser.userId!}">

                <div class="form-group">
                    <label>用户名</label>
                    <input type="text" id="username" class="form-control" value="${adminUser.username!}" placeholder="……">
                </div>
                <div class="form-group">
                    <label>昵称</label>
                    <input type="text" id="nickName" class="form-control" value="${adminUser.nickName!}" placeholder="……">
                </div>
                <div class="form-group has-feedback">
                    <label>修改头像</label>
                    <div class="img-container" style="width:30%">
                        <img id="image"
                             src="${baseUrl}/article/downloadImage?filePath=${adminUser.avatar!}">
                    </div>
                </div>
                <div class="form-group has-feedback">
                    <label class="btn btn-primary fa fa-file-image-o" for="inputImage" title="Upload image file">
                        <input type="file" class="sr-only" id="inputImage" name="file" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff">
                        <span class="docs-tooltip" data-toggle="tooltip" data-animation="false" title="Import image with Blob URLs">
                        选择图片
                        </span>
                    </label>
                    <div class="btn-group btn-group-crop">
                        <button class="btn btn-primary fa fa-upload" id="upload" data-method="getCroppedCanvas" type="button">
                            上传头像
                        </button>
                    </div>
                    <label id="upload-avatar-result"></label><#--显示上传结果-->
                </div>

                <input type="hidden" id="avatar-path" value="${adminUser.avatar!}"><#--隐藏域存储头像路径-->

                <input type="hidden" id="selectedRoleId" value="${adminUser.roleId}">

                <div class="form-group">
                    <label>角色</label>
                    <div class="checkbox">
                       <#list rolesList as item>
                           <div class="checkbox">
                               <label>
                                   <input type="checkbox" name="role" value="${item.roleId}">${item.roleName}
                               </label>
                           </div>
                       </#list>
                    </div>
                </div>

        </div>

        <div class="box-footer">
            <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal" id="openModal">
                提交
            </button>
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">×</span></button>
                            <h4 class="modal-title" id="myModalLabel">编辑用户</h4></div>

                        <div class="modal-body">

                            <div id="submit-message">
                                <p>确定提交更新吗？</p>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                                <button type="button" id="submit" class="btn btn-primary">确定</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="result-modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">×</span></button>
                            <h4 class="modal-title" id="myModalLabel">操作结果</h4></div>

                        <div class="modal-body">
                            <p id="result-message"></p>
                        </div>

                        <div class="modal-footer">
                            <button type="button" id="result-submit" class="btn btn-primary" data-dismiss="modal">确定</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script src="/js/admin_user/admin_user_update.js"></script>
<script type="text/javascript" src="/cropper/cropper.js"></script>
<script>
    var baseUrl = '${baseUrl}';
</script>
