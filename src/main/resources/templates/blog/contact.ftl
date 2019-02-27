<!DOCTYPE html>
<html class="no-js" lang="en">
<head>

    <!--- basic page needs
    ================================================== -->
    <meta charset="utf-8">
    <title>联系方式 - StraySheep.</title>
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

<!-- s-content
================================================== -->
<section class="s-content s-content--top-padding s-content--narrow">

    <div class="row narrow">
        <div class="col-full s-content__header">
            <h1 class="display-1 display-1--with-line-sep">联系方式</h1>
            <p class="lead">
                Duis ex ad cupidatat tempor Excepteur cillum cupidatat fugiat nostrud cupidatat dolor
                sunt sint sit nisi est eu exercitation incididunt adipisicing veniam velit id fugiat enim
                mollit amet anim veniam dolor dolor irure velit commodo.</p>
        </div>
    </div>

    <div class="row">
        <div class="col-full s-content__main">
            <p>
                <img src="images/thumbs/contact/contact-1000.jpg"
                     srcset="images/thumbs/contact/contact-2000.jpg 2000w,
                             images/thumbs/contact/contact-1000.jpg 1000w,
                             images/thumbs/contact/contact-500.jpg 500w"
                     sizes="(max-width: 2000px) 100vw, 2000px" alt="">
            </p>

            <h2>Say Hello</h2>

            <p>
                Odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti
                dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
                sunt in culpa. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis

            <p>
                Duis ex ad cupidatat tempor Excepteur cillum cupidatat fugiat nostrud cupidatat dolor
                sunt sint sit nisi est eu exercitation incididunt adipisicing veniam velit id fugiat enim
                mollit amet anim veniam dolor dolor irure velit commodo cillum sit nulla ullamco. Lorem
                ipsum Nisi amet fugiat eiusmod et aliqua ad qui ut nisi Ut aute anim mollit fugiat aute.
            </p>

            <div id="map-wrap">
                <div id="map-container"></div>
                <div id="map-zoom-in"></div>
                <div id="map-zoom-out"></div>
            </div>

            <div class="row">
                <div class="col-six tab-full">
                    <h4>Where to Find Us</h4>

                    <p>
                        1600 Amphitheatre Parkway<br>
                        Mountain View, CA<br>
                        94043 US
                    </p>

                </div>

                <div class="col-six tab-full">
                    <h4>Contact Info</h4>

                    <p>sayhello@wordsmith.com<br>
                        info@wordsmith.com <br>
                        Phone: (+1) 123 456
                    </p>

                </div>
            </div>

            <h4>Get In Touch</h4>

            <form name="cForm" id="cForm" class="contact-form" method="post" action="">
                <fieldset>

                    <div>
                        <input name="cName" id="cName" class="full-width" placeholder="Your Name*" value="" type="text">
                    </div>

                    <div class="form-field">
                        <input name="cEmail" id="cEmail" class="full-width" placeholder="Your Email*" value="" type="text">
                    </div>

                    <div class="form-field">
                        <input name="cWebsite" id="cWebsite" class="full-width" placeholder="Website" value="" type="text">
                    </div>

                    <div class="message form-field">
                        <textarea name="cMessage" id="cMessage" class="full-width" placeholder="Your Message*"></textarea>
                    </div>

                    <button type="submit" class="submit btn btn--primary btn--large full-width">Send Message</button>

                </fieldset>
            </form>

        </div> <!-- s-content__main -->
    </div> <!-- end row -->

</section> <!-- end s-content -->

<!-- s-footer
================================================== -->
<#include "/blog/footer.ftl">

<!-- Java Script
================================================== -->
<script src="/js/blog/jquery-3.2.1.min.js"></script>
<script src="/js/blog/plugins.js"></script>
<script src="/js/blog/main.js"></script>

</body>

</html>