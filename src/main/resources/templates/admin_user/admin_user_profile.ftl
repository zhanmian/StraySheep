<link rel="stylesheet" href="/cropper/cropper.css" type="text/css">
<style>
    img {
        max-width: 100%; /* This rule is very important, please do not ignore this! */
    }
</style>
<section class="content-header">
    <h1>
        个人资料
        <small>My Profile</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
        <li class="active">个人资料</li>
    </ol>
</section>

    <!-- Main content -->
<section class="content">
    <div class="row">
        <div class="col-md-9">
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    <li class="active"><a href="#activity" data-toggle="tab">我的资料</a></li>
                    <li><a href="#settings" data-toggle="tab">设置</a></li>
                </ul>
                <div class="tab-content">
                    <div class="active tab-pane" id="activity">
                        <div class="box-body box-profile">
                            <img class="profile-user-img img-circle"
                                 src="${baseUrl}/article/downloadImage?filePath=${adminUser.avatar!}"
                                 alt="User profile picture">
                        </div>
                        <form class="form-horizontal">
                            <div class="form-group">
                                <div  class="col-xs-6 pull-left"><b>用户名：</b>${adminUser.username!}</div>
                            </div>
                            <div class="form-group">
                                <div  class="col-xs-6 pull-left"><b>昵称：</b>${adminUser.nickName!}</div>
                            </div>
                            <div class="form-group">
                                <div  class="col-xs-6 pull-left"><b>角色：</b>${adminUser.roleName!}</div>
                            </div>

                            <input type="hidden" id="roleId" value="${adminUser.roleId!}">

                            <button class="btn btn-primary " data-toggle="modal" data-target="#myModal" onclick="return false;">
                                查看拥有的权限
                            </button>
                            <!-- 模态框（Modal） -->
                            <div class="modal fade" id="myModal" tabindex="-1" role="dialog"
                                 aria-labelledby="myModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header" style="padding:5px;">
                                            <h4 class="modal-title" id="myModalLabel">
                                                权限列表
                                            </h4>
                                        </div>
                                        <div class="modal-body">
                                            <div class="zTreeDemoBackground left">
                                                <ul id="permissionTree" class="ztree"></ul>
                                            </div>
                                        </div>
                                        <div class="modal-footer" style="padding:5px;">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                                        </div>
                                    </div><!-- /.modal-content -->
                                </div><!-- /.modal -->
                            </div>
                        </form>
                    </div>

                    <div class="tab-pane" id="settings">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label for="nickName" class="col-sm-2 control-label pull-left">昵称</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="nickName" value="${adminUser.nickName!}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password" class="col-sm-2 control-label">密码</label>
                                <div class="col-sm-10">
                                    <input type="password" class="form-control" id="password" placeholder="Password">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="avatar" class="col-sm-2 control-label">修改头像</label>
                                <div class="img-container col-sm-10" id="avatar" style="width:30%">
                                    <img id="image"
                                         src="${baseUrl}/article/downloadImage?filePath=${adminUser.avatar!}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="btn btn-primary fa fa-file-image-o col-sm-offset-2" for="inputImage" title="Upload image file">
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
                            <input type="hidden" id="id" value="${adminUser.userId!}">
                            <input type="hidden" id="username" value="${adminUser.username!}">

                            <div class="form-group">
                                <div class="col-sm-offset-2 col-sm-10">
                                    <button id="profile-submit" class="btn btn-primary">提交</button>
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
                        </form>
                    </div>
                    <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
            </div>
            <!-- /.nav-tabs-custom -->
        </div>
        <!-- /.col -->
    </div>
    <!-- /.row -->

</section>

<script src="/js/admin_user/admin_user_profile.js"></script>
<link rel="stylesheet" href="/zTree/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="/zTree/jquery.ztree.core.js"></script>
<script type="text/javascript" src="/zTree/jquery.ztree.excheck.js"></script>
<script type="text/javascript" src="/cropper/cropper.js"></script>
<script>
    var baseUrl = '${baseUrl}';
</script>