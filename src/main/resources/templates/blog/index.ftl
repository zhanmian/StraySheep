<!DOCTYPE html>
<html class="no-js" lang="en">
<head>

    <!--- basic page needs
    ================================================== -->
    <meta charset="utf-8">
    <title>Stray Sheep</title>
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

<!-- featured
================================================== -->
<section class="s-featured">
    <div class="row">
        <div class="col-full">

            <div id="banners" class="featured-slider featured" data-aos="zoom-in">
                <#list banner as item>
                    <div class="featured__slide">
                        <div class="entry">

                            <div class="entry__background"
                                 style="background-image:url('${baseUrl}/article/downloadImage?filePath=${item.image!}');">
                            </div>

                            <div class="entry__content">
                                <span class="entry__category">
                                    <a href="${baseUrl}/category?categoryId=${item.categoryId!}">
                                    ${item.category!}
                                    </a>
                                </span>

                                <h1><a href="${baseUrl}/article?id=${item.id!}" title="">${item.title!}</a></h1>

                                <div class="entry__info">
                                    <a href="#0" class="entry__profile-pic">
                                        <img class="avatar"
                                             src="${baseUrl}/article/downloadImage?filePath=${item.avatar!}"
                                             alt="">
                                    </a>
                                    <ul class="entry__meta">
                                        <li><a href="#0">${item.nickName!}</a></li>
                                        <li>${item.createTime!}</li>
                                    </ul>
                                </div>
                            </div> <!-- end entry__content -->

                        </div> <!-- end entry -->
                    </div> <!-- end featured__slide -->
                </#list>

            </div> <!-- end featured -->

        </div> <!-- end col-full -->
    </div>
</section> <!-- end s-featured -->


<!-- s-content
================================================== -->
<section id="article-list" class="s-content">
    <div class="row entries-wrap wide">
        <div class="entries">
            <#list pagination.list as item>
                <article class="col-block">

                    <div class="item-entry" data-aos="zoom-in">
                        <div class="item-entry__thumb">
                            <a href="${baseUrl}/article?id=${item.id!}" class="item-entry__thumb-link">
                                <img src="${baseUrl}/article/downloadImage?filePath=${item.image!}"
                                     alt="">
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
<script src="js/blog/jquery-3.2.1.min.js"></script>
<script src="js/blog/plugins.js"></script>
<script src="js/blog/main.js"></script>
<script src="js/blog/index.js"></script>
<script>
    var baseUrl = "${baseUrl}";
    var totalPage = ${pagination.totalPage!};
    var currentPage = ${pagination.page!};
</script>

</body>

</html>