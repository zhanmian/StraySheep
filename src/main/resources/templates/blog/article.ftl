<!DOCTYPE html>
<html class="no-js" lang="en">
<head>

    <!--- basic page needs
    ================================================== -->
    <meta charset="utf-8">
    <title>${article.title!}</title>
    <meta name="description" content="">
    <meta name="author" content="">

    <!-- mobile specific metas
    ================================================== -->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <!-- CSS
    ================================================== -->
    <link rel="stylesheet" href="/blog/base.css">
    <link rel="stylesheet" href="/blog/vendor.css">
    <link rel="stylesheet" href="/blog/main.css">

    <!-- script
    ================================================== -->
    <script src="js/blog/modernizr.js"></script>

    <!-- favicons
    ================================================== -->
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="icon" href="favicon.ico" type="image/x-icon">

</head>

<body id="top">

<!-- preloader
================================================== -->
<div id="preloader">
    <div id="loader" class="dots-fade">
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>


<!-- header
================================================== -->

<#include "/blog/header.ftl"/>

<!-- s-header -->


<!-- s-content
================================================== -->
<section class="s-content s-content--top-padding s-content--narrow">

    <article class="row entry format-standard">

        <div class="entry__media col-full">
            <div class="entry__post-thumb">
                <#--<img src="images/thumbs/single/standard/standard-1000.jpg"-->
                <img src="${baseUrl}/article/downloadImage?filePath=${article.image!}"
                     <#--srcset="images/thumbs/single/standard/standard-2000.jpg 2000w,-->
                                 <#--images/thumbs/single/standard/standard-1000.jpg 1000w,-->
                                 <#--images/thumbs/single/standard/standard-500.jpg 500w"-->
                     sizes="(max-width: 2000px) 100vw, 2000px" alt="">
            </div>
        </div>

        <div class="entry__header col-full">
            <h1 class="entry__header-title display-1">
                ${article.title!}
            </h1>
            <ul class="entry__header-meta">
                <li class="date">${article.createTime!}</li>
                <li class="byline">
                    By
                    <a href="#0">${article.nickName!}</a>
                </li>
            </ul>
        </div>

        <div class="col-full entry__main">
            <p class="lead drop-cap">${article.content!}</p>
            <div class="entry__taxonomies">
                <div class="entry__cat">
                    <h5>Posted In: </h5>
                    <span class="entry__tax-list">
                            <a href="#0">Lifestyle</a>
                            <a href="#0">Management</a>
                        </span>
                </div> <!-- end entry__cat -->

                <div class="entry__tags">
                    <h5>Tags: </h5>
                    <span class="entry__tax-list entry__tax-list--pill">
                            <a href="#0">orci</a>
                            <a href="#0">lectus</a>
                            <a href="#0">varius</a>
                            <a href="#0">turpis</a>
                        </span>
                </div> <!-- end entry__tags -->
            </div> <!-- end s-content__taxonomies -->

            <div class="entry__author">
                <img src="${baseUrl}/article/downloadImage?filePath=${article.avatar}" alt="">

                <div class="entry__author-about">
                    <h5 class="entry__author-name">
                        <span>Posted by</span>
                        <a href="#0">${article.nickName!}</a>
                    </h5>

                    <div class="entry__author-desc">
                        <p>If you lay down the load, you will find a great weight lifting.</p>
                    </div>
                </div>
            </div>

        </div> <!-- s-entry__main -->

    </article> <!-- end entry/article -->


    <div class="s-content__entry-nav">
        <div class="row s-content__nav">
            <div class="col-six s-content__prev">
                <a href="${baseUrl}/article?id=${(preArticle.id)!"${article.id!}"}" rel="prev">
                    <span>Previous Post</span>
                    <#--如果是第一篇或最后一篇文章，后端返回的是Null值-->
                    <#--所以使用freemarker对null值的默认值处理-->
                    ${(preArticle.title)!"已经是第一篇了"}
                </a>
            </div>
            <div class="col-six s-content__next">
                <a href="${baseUrl}/article?id=${(nextArticle.id)!"${article.id!}"}" rel="next">
                    <span>Next Post</span>
                    ${(nextArticle.title)!"已经是最后一篇了"}
                </a>
            </div>
        </div>
    </div> <!-- end s-content__pagenav -->

    <div class="comments-wrap">

        <div id="comments" class="row">
            <div class="col-full">

                <h3 class="h2">${commentCount!} 条评论</h3>

                <!-- START commentlist -->
                <ol id="commentList" class="commentlist">

                </ol>

                <div align="center">
                    <button id="more-comment" class="btn btn--default btn--pill ">更多评论</button>
                </div>

                <p class="text-center" id="more-comment-info"></p>

                <!-- END commentlist -->
            </div> <!-- end col-full -->

        </div> <!-- end comments -->

        <input type="hidden" id="article-id" value="${article.id!}">
        <input type="hidden" id="reply-id">
        <input type="hidden" id="root-comment-id">
        <input type="hidden" id="commentCount" value="${commentCount!}">

        <div class="row comment-respond">

            <!-- START respond -->
            <div id="respond" class="col-full">

                <h3 class="h2">添加一条评论 <span></span></h3>

                <#--<form name="contactForm" id="contactForm" method="post" action="" autocomplete="off">-->
                    <fieldset>

                        <div class="form-field">
                            <input name="cName" id="nickName" class="full-width" placeholder="昵称*" type="text">
                        </div>

                        <div class="message form-field">
                            <textarea name="cMessage" id="comment" class="full-width" placeholder="评论*"></textarea>
                        </div>

                        <button id="submit" class="btn btn--primary btn-wide btn--large full-width">提交</button>
                    </fieldset>

            </div>
            <!-- END respond-->

        </div> <!-- end comment-respond -->

    </div> <!-- end comments-wrap -->

</section> <!-- end s-content -->

<!-- s-footer
================================================== -->

<#include "/blog/footer.ftl">

<!-- end s-footer -->


<!-- Java Script
================================================== -->
<script src="js/blog/jquery-3.2.1.min.js"></script>
<script src="js/blog/plugins.js"></script>
<script src="js/blog/main.js"></script>
<script src="js/blog/article.js"></script>

<script>
    var baseUrl = '${baseUrl}';
</script>

<script>

    //评论书写区
    var comment = document.getElementById("respond");

    function reply(id, nickName){
        //跳转到评论书写区位置
        comment.scrollIntoView();
        $('#comment').attr('placeholder', '回复 '+nickName);
        $('#reply-id').val(id);
        $('#root-comment-id').val(id);
    }

    function replyComment(id, rootCommentId, nickName){
        //跳转到评论书写区位置
        comment.scrollIntoView();
        $('#comment').attr('placeholder', '回复 '+nickName);
        $('#reply-id').val(id);
        $('#root-comment-id').val(rootCommentId);
    }

</script>

</body>

</html>