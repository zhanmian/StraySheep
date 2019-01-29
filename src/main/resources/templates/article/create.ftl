<section class="content-header">
    <h1>
        My Blog
        <small>随便写点什么吧...</small>
    </h1>
    <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>首页</a></li>
        <li class="active">新建文章</li>
    </ol>
</section>

<section class="content">

    <div class="box box-primary" id="article-create">
        <div class="box-header with-border">
            <h3 class="box-title">新建文章</h3>
        </div>
        <div class="box-body">
            <form role="form">
                <div class="form-group">
                    <label>标题</label>
                    <input type="text" id="title" class="form-control" placeholder="……">
                </div>
                <div class="form-group">
                    <label>摘要</label>
                    <input type="text" id="summary" class="form-control" placeholder="……">
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
                    <textarea class="form-control" id="content" rows="3" placeholder="……"></textarea>
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
                    <p id="category-message" style="color:red"></p>
                </div>
                <#--隐藏文本框以存储图片路径-->
                <input type="hidden" id="filePath">
                <input type="hidden" id="userId" value="${adminUser.userId}">
            </form>

        </div>

        <div class="box-footer">
            <button type="button" id="submit" class="btn btn-primary">提交</button>
        </div>
    </div>
</section>
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
                <button type="button" id="result-submit" class="btn btn-primary">确定</button>
            </div>
        </div>
    </div>
</div>

<script src="/AdminLTE/js/ckeditor.js"></script>
<script src="/js/article/article_list.js"></script>