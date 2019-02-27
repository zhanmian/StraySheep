<!-- header
================================================== -->
<header class="s-header header">

    <div class="header__logo">
        <a class="logo" href="${baseUrl}/index">
            <img src="/blog/images/straysheep_logo.svg" alt="Homepage">
        </a>
    </div> <!-- end header__logo -->

    <a class="header__search-trigger" href="#0"></a>
    <div class="header__search">

        <form role="search" method="get" class="header__search-form" action="/search">
            <label>
                <span class="hide-content">搜索:</span>
                <input type="search" id="search-keyword" class="search-field" name="keyword" title="Search for:" autocomplete="off">
            </label>
            <input type="submit" id="seach-submit" class="search-submit" value="Search">
        </form>

        <a href="#0" title="Close Search" class="header__overlay-close">Close</a>

    </div>  <!-- end header__search -->

    <a class="header__toggle-menu" href="#0" title="Menu"><span>Menu</span></a>
    <nav class="header__nav-wrap">

        <h2 class="header__nav-heading h6">Navigate to</h2>

        <ul id="header" class="header__nav">
            <li><a href="${baseUrl}/index" title="">首页</a></li>
            <li id="has-children" class="has-children">
                <a href="#0" title="">分类</a>
                <ul id="children" class="sub-menu">
                    <#list categoryList as item>
                        <li><a href="${baseUrl}/category?categoryId=${item.categoryId!}">
                            ${item.category!}
                        </a></li>
                    </#list>
                </ul>
            </li>
            <li><a href="${baseUrl}/about" title="">关于</a></li>
            <li><a href="${baseUrl}/contact" title="">联系方式</a></li>
        </ul> <!-- end header__nav -->

        <a href="#0" title="Close Menu" class="header__overlay-close close-mobile-menu">Close</a>

    </nav> <!-- end header__nav-wrap -->

</header> <!-- s-header -->

