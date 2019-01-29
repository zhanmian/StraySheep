<section class="content-header">
    <h1>
        My Blog
        <small>随便写点什么吧...</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>首页</a></li>
        <li class="active">修改文章</li>
    </ol>
</section>

<section class="content">

    <div class="box box-primary">
        <div class="box-header with-border">
            <h3 class="box-title">修改文章</h3>
        </div>
        <div class="box-body">
            <form role="form">

                <input type="hidden" id="id" value="${article.id!}">

                <div class="form-group">
                    <label>标题</label>
                    <input type="text" id="title" class="form-control" value="${article.title!}" placeholder="text ...">
                </div>
                <div class="form-group">
                    <label>摘要</label>
                    <input type="text" id="summary" class="form-control" value="${article.summary!}" placeholder="text ...">
                </div>
                <div class="form-group">
                    <label>封面图片</label>
                    <label>
                        <img border="0" src="${baseUrl}/article/downloadImage?filePath=${article.image!}" alt="picture" width="18%" height="18%">
                    </label>
                </div>
                <div class="form-group">
                    <label for="exampleInputFile">上传封面</label>
                    <input type="file" id="upload-image">
                </div>
                <div class="form-group">
                    <button type="button" id="upload" class="btn btn-primary">上传</button>
                    <label id="upload-succeed"></label>
                </div>
                <div class="form-group">
                    <label>正文</label>
                    <textarea class="form-control" id="content" rows="3" placeholder="text ...">${article.content!}</textarea>
                </div>
                <div class="form-group">
                    <label>分类</label>
                    <#list categoryList as item>
                        <div class="checkbox">
                            <label>
                                <input type="checkbox" name="category" value="${item.categoryId!}">${item.category!}
                            </label>
                        </div>
                    </#list>
                </div>
                <#--隐藏文本框以存储图片路径-->
                <input type="hidden" id="filePath" value="${article.image!}">
                <input type="hidden" id="selectedCategoryId" value="${article.categoryId!}">
        </div>

        <div class="box-footer">
                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
                    提交
                </button>
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog"
                     aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                        aria-hidden="true">×</span></button>
                                <h4 class="modal-title" id="myModalLabel">更新文章</h4></div>

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


<script src="/AdminLTE/js/ckeditor.js"></script>
<script src="/js/article/article_update.js"></script>
<script>
    var baseUrl = '${baseUrl}';
</script>