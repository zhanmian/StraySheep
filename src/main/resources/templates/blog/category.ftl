<!DOCTYPE html>
<html class="no-js" lang="en">
<head>

    <!--- basic page needs
    ================================================== -->
    <meta charset="utf-8">
    <title>${pagination.list[0].category!} - StraySheep.</title>
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
    <script src="/js/blog/modernizr.js"></script>

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
<section class="s-content s-content--top-padding">

    <div class="row narrow">
        <div class="col-full s-content__header" data-aos="fade-up">
            <h5 class="display-1 display-1--with-line-sep">${pagination.list[0].category!}</h5>
            <p class="lead"></p>
        </div>
    </div>

    <div id="article-list" class="row entries-wrap add-top-padding wide">
        <div class="entries">
            <#list pagination.list as item>
                <article class="col-block">
                    <div class="item-entry" data-aos="zoom-in">
                        <div class="item-entry__thumb">
                            <a href="${baseUrl}/article?id=${item.id!}" class="item-entry__thumb-link">
                                <img src="${baseUrl}/article/downloadImage?filePath=${item.image!}">
                            </a>
                        </div>

                        <div class="item-entry__text">
                            <div class="item-entry__cat">
                                <a href="${baseUrl}/category?categoryId=${item.categoryId!}">
                                    ${item.category!}
                                </a>
                            </div>

                            <h1 class="item-entry__title">
                                <a href="${baseUrl}/article?id=${item.id!}">
                                ${item.title!}
                                </a>
                            </h1>

                            <div class="item-entry__date">
                                <a href="${baseUrl}/article?id=${item.id!}">${item.createTime!}</a>
                            </div>
                        </div>
                    </div> <!-- item-entry -->
                </article> <!-- end article -->
            </#list>
        </div> <!-- end entries -->
    </div> <!-- end entries-wrap -->

    <div class="row pagination-wrap">
        <div class="col-full">
            <nav class="pgn" data-aos="fade-up">
                <ul id="pagination"></ul>
            </nav>
        </div>
    </div>

</section> <!-- end s-content -->

<!-- s-footer
================================================== -->

<#include "/blog/footer.ftl">

<!-- end s-footer -->


<!-- Java Script
================================================== -->
<script src="/js/blog/jquery-3.2.1.min.js"></script>
<script src="/js/blog/plugins.js"></script>
<script src="/js/blog/main.js"></script>
<script>
    var baseUrl = "${baseUrl}";
</script>
<script>
    var totalPage = ${pagination.totalPage!};
    var currentPage = ${pagination.page!};

    $(document).ready(function(){
        initPagination();
    });

    function initPagination(){
        var p = [];
        var pre = '<li><a class="pgn__prev" href="javascript:search('+(currentPage-1)+');">Prev</a></li>';
        var next = '<li><a class="pgn__next" href="javascript:search('+(currentPage+1)+');">Next</a></li>';
        var isDots = 0;

        if (currentPage !== 1) {
            p.push(pre);
        }
        for (var i = 1; i <= totalPage; i++) {

            if (i === currentPage) {
                p.push('<li><span class="pgn__num current">' + i + '</span></li>');

            } else {
                //根据条件判断是否显示页码
                if (i < 2 || i === totalPage || i === (currentPage + 1) || i === (currentPage - 1)) {
                    p.push('<li><a class="pgn__num" href="javascript:search(' + i + ');">' + i + '</a></li>');
                    isDots = 1;

                } else {
                    if (isDots === 1) {
                        p.push('<li><span class="pgn__num dots">…</span></li>');
                        isDots = 0;
                    }
                }
            }
        }
        if(currentPage !== totalPage){
            p.push(next);
        }
        $('#pagination').html(p);
    }

    function search(page) {
        var categoryId = ${pagination.list[0].categoryId!};
        window.location.href=baseUrl+'/category?categoryId='+categoryId+'&page='+page;
    }

</script>

</body>

</html>