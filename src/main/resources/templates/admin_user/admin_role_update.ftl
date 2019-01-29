<section class="content-header">
    <h1>
        My Blog
        <small>随便写点什么吧...</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>首页</a></li>
        <li class="active">编辑角色</li>
    </ol>
</section>

<section class="content">

    <div class="box box-primary" id="article-create">
        <div class="box-header with-border">
            <h3 class="box-title">编辑角色</h3>
        </div>
        <div class="box-body">
            <form role="form">

                <input type="hidden" id="roleId" value="${adminRole.roleId}">

                <div class="form-group">
                    <label>名称</label>
                    <input type="text" id="roleName" class="form-control" value="${adminRole.roleName}" placeholder="text ...">
                </div>

                <button class="btn btn-primary btn-xs" data-toggle="modal" data-target="#myModal" onclick="return false;">选择权限</button>

                <!-- 模态框（Modal） -->
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog"
                     aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header" style="padding:5px;">
                                <h4 class="modal-title" id="myModalLabel">
                                    选择权限
                                </h4>
                            </div>
                            <div class="modal-body">
                                <div class="zTreeDemoBackground left">
                                    <ul id="permissionTree" class="ztree"></ul>
                                </div>
                            </div>
                            <div class="modal-footer" style="padding:5px;">
                                <button type="button" id="permission-submit" class="btn btn-primary">确认</button>
                                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal -->
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

        <div class="box-footer">
            <button type="button" id="submit" class="btn btn-primary">提交</button>
        </div>
    </div>
</section>

<script src="/js/admin_user/admin_role_update.js"></script>
<link rel="stylesheet" href="/zTree/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="/zTree/jquery.ztree.core.js"></script>
<script type="text/javascript" src="/zTree/jquery.ztree.excheck.js"></script>
<script>
    var baseUrl = '${baseUrl}';
</script>