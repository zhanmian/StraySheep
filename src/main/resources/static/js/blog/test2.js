"use strict";
define("modal_pl", function(e, a, t) {
    function s(e, a, t, s) {
        var o = '<div id="' + e + '" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button><h4 class="modal-title">' + a + '</h4></div><div class="modal-body">' + t + '</div><div class="modal-footer">' + s + "</div></div></div></div>";
        $("#" + e).length > 0 && $("#" + e).remove(),
            $("body").append(o),
            $("#" + e).modal()
    }
    function o() {
        $("#comment_noSpeak_box").length > 0 && $("#comment_noSpeak_box").remove(),
            $("body").append('<div id="comment_noSpeak_box" class="modal fade" role="dialog"><div class="modal-dialog mt-person-modal-dialog"><div class="modal-content mt-person-24-border"><div class="modal-body modal-body-alert mt-person-top"><div class="modal-alert-title"></div><div class="edit-title-box"><div class="f3 mt-person-24-text">哦no，你被禁言了</div><div class="form-warp current-warp mt-person-line"></div><div class="pc-comment-noSpeak-group"><div class="pc-comment-noSpeak-windowCancel" data-dismiss="modal">我知道了</div></div></div></div></div></div></div>'),
            $("#comment_noSpeak_box").modal()
    }
    function n() {
        c = "",
            $.ajax({
                url: comment_api_url + "/index/checkPermission",
                data: {
                    platform: "www"
                },
                dataType: "json",
                type: "post",
                xhrFields: {
                    withCredentials: !0
                },
                crossDomain: !0,
                async: !1,
                success: function(e) {
                    c = e.success ? "noSpeak" : "Speak"
                },
                error: function(e) {
                    console.log(e)
                }
            })
    }
    function l() {
        var e = {
            object_type: m,
            object_id: u,
            type: 2,
            page: h
        };
        $.ajax({
            url: "/comment/getCommentList",
            dataType: "json",
            data: e,
            type: "post",
            success: function(e) {
                var a = parseInt(e.data.total_page)
                    , t = parseInt(e.data.cur_page)
                    , s = "<div class='get-mod-more transition js-comment-get-more' id='comment-new-get-more' data-next-page='" + (parseInt(t) + 1) + "'>点击加载更多</div>";
                e.success && ($("#comment_show_new_position").append(e.data.data),
                    $("#comment-new-get-more").remove(),
                a > t && $("#comment_show_new_position").append(s))
            },
            error: function(e) {
                console.log(e)
            }
        })
    }
    var i;
    e.async("modal_build", function(e) {
        i = e
    });
    var d = ""
        , r = function() {
        d = "",
            $.ajax({
                url: "/user_action/userIsBindMobile",
                data: {},
                dataType: "json",
                type: "post",
                async: !1,
                success: function(e) {
                    d = e.data.is_bind ? "true" : "false"
                },
                error: function(e) {
                    console.log(e)
                }
            })
    }
        , c = "";
    $(document).on("focus", ".js-comment-yh-form-control", function() {
        n(),
            "noSpeak" == c ? o() : (c = "Speak") && (r(),
            "false" == d && i.commentPhoneCheckPop())
    });
    var p = $("#comment_object_sign").val();
    a.plShowEffect = function(e, a) {
        if (0 == uid)
            return i.showMessagePrompt("此操作需要登录", "error"),
                !1;
        $(".dp-article-box, .hu-pl-box, .mt-comment-publish-wrap").slideUp(),
            "none" == e.css("display") ? (n(),
                "noSpeak" == c ? o() : (r(),
                    "false" == d ? i.commentPhoneCheckPop() : e.slideDown()),
                $.myDetection.htmDetection(a)) : e.slideUp()
    }
        ,
        $(document).on("click", ".js-add-dp-box", function() {
            var e = $(this).parent(".pl-box-btm").find(".dp-article-box")
                , t = p + "内容,评论,我要点评";
            a.plShowEffect(e, t)
        }),
        $(document).on("click", ".js-hf-article-pl", function() {
            var e = $(this).parents(".one-pl-content").find(".hu-pl-box")
                , t = p + "内容,回复,回复TA";
            a.plShowEffect(e, t)
        }),
        $(document).on("click", ".js-article-pl-anchor", function() {
            var e = $("#comment-pl-position").offset().top - 100;
            $("html, body").animate({
                scrollTop: e
            }, 500),
                $("#saytext").focus()
        }),
        $(document).on("click", ".js-comment-yh-report-windows", function() {
            var e = $(this);
            s("commentReport", "举报", '<div class="rep-wrap"><div class="form-horizontal rep-moder-box"><label class="radio-inline"><i class="icon icon-radio"></i><input type="radio" name="repRadio" id="repRadio1" value="色情"> 色情</label><label class="radio-inline"><i class="icon icon-radio"></i><input type="radio" name="repRadio" id="repRadio2" value="谣言"> 谣言</label><label class="radio-inline"><i class="icon icon-radio"></i><input type="radio" name="repRadio" id="repRadio3" value="网络钓鱼/广告">网络钓鱼/广告</label><label class="radio-inline"><i class="icon icon-radio"></i><input type="radio" name="repRadio" id="repRadio4" value="政治"> 政治</label><label class="radio-inline"><i class="icon icon-radio"></i><input type="radio" name="repRadio" id="repRadio5" value="侵权"> 侵权</label><label class="radio-inline"><i class="icon icon-radio"></i><input type="radio" name="repRadio" id="repRadio6" value="人身攻击"> 人身攻击</label><h4 class="t-h4">补充说明</h4><div class="textarea-box"><textarea class="form-control" rows="3"></textarea></div></div></div>', '<div class="clearfix text-right rep-moder-btm"><button class="btn btn-blue js-comment-yh-report-pl" data-cid="' + e.attr("cid") + '" data-sign="' + e.attr("data-sign") + '">提交</button></div>')
        });
    var m = $("#comment_object_type").val()
        , u = $("#comment_object_id").val();
    $("#pl-yh-wrap").length > 0 && (!function() {
        var e = {
            object_type: m,
            object_id: u,
            type: 1
        };
        $.ajax({
            url: "/comment/getCommentList",
            dataType: "json",
            data: e,
            type: "post",
            success: function(e) {
                e.success && $("#comment_show_hot_position").append(e.data.data)
            },
            error: function(e) {
                console.log(e)
            }
        })
    }(),
        l());
    var h;
    $(document).on("click", ".js-comment-get-more", function() {
        var e = $(this);
        h = e.attr("data-next-page"),
            l()
    }),
        $(document).on("click", ".js-comment-yh-submit", function() {
            var e = $(this)
                , a = e.parent(".pl-form-box").find(".form-control").val()
                , t = {
                object_type: m,
                object_id: u,
                content: a,
                platform: "www"
            };
            return "" == $.trim(t.content) ? (i.showMessagePrompt("发布内容不可为空", "error"),
                !1) : $.trim(t.content).length < 8 ? (i.showMessagePrompt("额，请用8-500字表明你的观点", "error"),
                !1) : void (e.hasClass("disabled") || (e.addClass("disabled"),
                $.ajax({
                    url: comment_api_url + "/index/addComment",
                    data: t,
                    dataType: "json",
                    type: "post",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    success: function(t) {
                        if (t.success) {
                            i.showMessagePrompt(t.data.message, "success"),
                                e.parent(".pl-form-box").find(".form-control").val("");
                            var s = t.data.comment_id
                                , o = $("#user_avatar").val()
                                , n = $("#user_username").val()
                                , l = $("#user_url").val()
                                , d = $("#user_is_admin").val()
                                , r = ""
                                , c = '<ul class="dropdown-menu hide js-dropdown-menu-ul">\x3c!--管理员专属--\x3e<li class="pl-yl js-comment-yh-pl-yl" actype="recommend">有料</li><li class="pl-dz js-comment-yh-pl-dj" actype="article_eye">点睛</li><li class="pl-banned js-get-reason" data-type="detail-stopUse" data-text="封停理由" data-comment_id="' + s + '" uid="' + uid + '" type="stopuser">封停</li><li class="pl-kill js-delPl-btn" data-type="detail-delPl" data-text="删除评论理由" data-comment_id="' + s + '">删除</li>\x3c!--所有人--\x3e<li class="pl-report js-comment-yh-report-windows" aid="' + aid + '" cid="' + s + '" data-sign="pl-report">举报</li></ul>'
                                , m = '<ul class="dropdown-menu hide js-dropdown-menu-ul"><li class="pl-kill js-delPl-btn" data-type="detail-delPl" data-text="删除评论理由" data-comment_id="' + s + '">删除</li></ul>'
                                , u = '<div class="pl-box-wrap comment-' + s + '" data-pid="' + s + '" id="g_pid"><div class="pl-box-top"><div class="pl-box"><div class="author-info"><div class="author-yh-face"><img src="' + o + '"></div><span class="author-name"><a href="' + l + '" class="js-nick-dataPoint">' + n + '</a></span><span class="comment-yh-time">刚刚</span></div><div class="pl-content pl-yh-content" data-comment-id="' + s + '"><div class="pull-left ">' + a + '</div><div style="clear: both;"></div></div><div class="pl-event-right"><div class="disInlineBlock pl-yh-zan js-pl-praise-box"><div class="pl-zan-wrap disInlineBlock clearfix"><i class="pl-yh-icon-zan js-pl-yh-icon-zan" data-id="' + s + '" data-zan-sign="pl-zan" data-type="pl-agree"></i><span class="num"></span></div><div class="pl-zan-wrap pl-disagree disInlineBlock clearfix"><i class="pl-yh-icon-zan js-pl-yh-icon-cai" data-id="' + s + '" data-zan-sign="pl-zan" data-type="pl-disagree"></i><span class="num"></span></div></div><div class="disInlineBlock pl-yh-dropdown"><i class="icon3 mt-pl-icon js-mt-dropdown-menu"></i>' + (r = "1" == d ? c : m) + '</div></div></div></div>\x3c!--回复列表--\x3e<div class="pl-box-btm"><div class="btn-dp transition js-add-dp-box"><i class="icon3 icon3-dp"></i>我要点评</div><div class="pl-form-box dp-article-box"><textarea class="form-control" placeholder="客官，8个字起评，不讲价哟"></textarea><button class="btn btn-article js-comment-yh-dp-submit">发表</button></div></div>'
                                , h = $("#comment_show_new_position .pl-form-wrap .pl-yh-no-content")
                                , v = $("#comment_show_new_position .pl-form-wrap");
                            h.length > 0 ? (v.hide(),
                                $("#comment_show_new_position").append(u)) : $("#comment_show_new_position .pl-yh-wrap .pl-box-wrap").eq(0).before(u);
                            var f = $("#comment_show_new_position").offset().top - 100;
                            $("html, body").animate({
                                scrollTop: f
                            }, 500);
                            var y = p + "内容,评论,发表";
                            $.myDetection.htmDetection(y)
                        } else
                            i.showMessagePrompt(t.error.message, "error");
                        e.removeClass("disabled")
                    },
                    error: function(e) {
                        console.log(e)
                    }
                })))
        }),
        $(document).on("click", ".js-comment-yh-dp-submit", function() {
            var e = $(this)
                , a = e.parent(".pl-form-box").find(".form-control").val()
                , t = {
                object_type: m,
                object_id: u,
                content: a,
                platform: "www",
                parent_comment_id: $(this).parents(".pl-box-wrap").attr("data-pid")
            };
            e.hasClass("disabled") || (e.addClass("disabled"),
                $.ajax({
                    url: comment_api_url + "/index/addReply",
                    data: t,
                    dataType: "json",
                    type: "post",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    success: function(t) {
                        if (t.success) {
                            i.showMessagePrompt(t.data.message, "success"),
                                e.parent(".pl-form-box").find(".form-control").val(""),
                                e.parents(".pl-box-btm").find(".js-add-dp-box").trigger("click");
                            var s = t.data.comment_id
                                , o = $("#user_username").val()
                                , n = $("#user_is_admin").val()
                                , l = ""
                                , d = $("#user_url").val()
                                , r = '<ol class="dropdown-menu hide js-dropdown-menu-ul">\x3c!--管理员--\x3e<li class="pl-kill js-get-reason" data-type="detail-stopUse" data-text="封停理由" data-comment_id="' + s + '" uid="' + uid + '" type="stopuser">封停</li><li class="pl-kill js-delDp-btn" data-type="detail-delDp" data-text="删除评论理由" data-comment_id="' + s + '">删除</li>\x3c!--所有人--\x3e<li class="pl-kill js-comment-yh-report-windows" cid="' + s + '">举报</li></ol>'
                                , c = '<ol class="dropdown-menu hide js-dropdown-menu-ul"><li class="pl-kill js-delDp-btn" data-type="detail-delDp" data-text="删除评论理由" data-comment_id="' + s + '">删除</li></ol>';
                            l = "1" == n ? r : c;
                            var p = '<div class="dl-user del-pl comment-yh-dp-box-parent comment-' + s + '"><div class="one-pl-content" data-uid="' + uid + '" data-comment-dp-id="' + s + '"><div class="content comment-dp-box-cont"><div class="author-info"><span class="name"><a href="' + d + '" class="js-nick-dataPoint">' + o + '</a></span><span class="time">刚刚</span></div><div class="author-content js-hf-article-pl">' + a + '</div><div class="pl-event-right"><div class="disInlineBlock pl-yh-zan js-pl-praise-box"><div class="pl-zan-wrap disInlineBlock clearfix"><i class="pl-yh-icon-zan js-pl-yh-icon-zan" data-id="' + s + '" data-type="pl-agree"></i><span class="num"></span></div><div class="pl-zan-wrap pl-disagree disInlineBlock clearfix"><i class="pl-yh-icon-zan js-pl-yh-icon-cai" data-id="' + s + '" data-type="pl-disagree"></i><span class="num"></span></div></div><div class="disInlineBlock pl-yh-dropdown"><i class="icon3 mt-pl-icon js-mt-dropdown-menu"></i>' + l + '</div></div></div><div class="hu-pl-box" style=""><textarea class="form-control" placeholder="客官，8个字起评，不讲价哟"></textarea><button class="btn btn-article js-comment-yh-hf-dp" data-type="hf">发表</button></div></div></div>';
                            if (e.parents(".pl-box-wrap").find(".dp-box .dp-list-box").length > 0)
                                e.parents(".pl-box-wrap").find(".dp-box .dp-list-box").prepend(p);
                            else {
                                var m = "<div class='dp-box'><div class='dp-list-box' style='display: block;'>" + p + "</div></div>";
                                e.parents(".pl-box-wrap").find(".pl-box-top").append(m)
                            }
                        } else
                            i.showMessagePrompt(t.error.message, "error");
                        e.removeClass("disabled")
                    },
                    error: function(e) {
                        console.log(e)
                    }
                }))
        }),
        $(document).on("click", ".js-comment-yh-hf-dp", function() {
            var e = $(this)
                , a = $(this).parent(".hu-pl-box").find(".form-control").val()
                , t = $(this).parents(".one-pl-content").attr("data-uid")
                , s = e.parents(".one-pl-content").find(".comment-dp-box-cont .name a").text()
                , o = {
                object_type: m,
                object_id: u,
                content: a,
                platform: "www",
                parent_comment_id: $(this).parents(".pl-box-wrap").attr("data-pid"),
                to_uid: t
            };
            e.hasClass("disabled") || (e.addClass("disabled"),
                $.ajax({
                    url: comment_api_url + "/index/addReply",
                    data: o,
                    dataType: "json",
                    type: "post",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    success: function(o) {
                        if (o.success) {
                            i.showMessagePrompt(o.data.message, "success"),
                                e.parent(".hu-pl-box").find(".form-control").val(""),
                                e.parents(".one-pl-content").find(".js-hf-article-pl").trigger("click");
                            var n = o.data.comment_id
                                , l = $("#user_username").val()
                                , d = $("#user_is_admin").val()
                                , r = ""
                                , c = $("#user_url").val()
                                , p = '<ol class="dropdown-menu hide js-dropdown-menu-ul">\x3c!--管理员--\x3e<li class="pl-kill js-get-reason" data-type="detail-stopUse" data-text="封停理由" data-comment_id="' + n + '" uid="' + uid + '" type="stopuser">封停</li><li class="pl-kill js-delDp-btn" data-type="detail-delDp" data-text="删除评论理由" data-comment_id="' + n + '">删除</li>\x3c!--所有人--\x3e<li class="pl-kill js-comment-yh-report-windows" cid="' + n + '">举报</li></ol>'
                                , m = '<ol class="dropdown-menu hide js-dropdown-menu-ul"><li class="pl-kill js-delDp-btn" data-type="detail-delDp" data-text="删除评论理由" data-comment_id="' + n + '">删除</li></ol>';
                            r = "1" == d ? p : m;
                            var u = '<div class="dl-user del-pl comment-yh-dp-box-parent comment-' + n + '"><div class="one-pl-content" data-uid="' + uid + '" data-comment-dp-id="' + n + '"><div class="content comment-dp-box-cont"><div class="author-info"><span class="name"><a href="' + c + '">' + l + '</a></span>&nbsp;回复&nbsp;<a href="/member/' + t + '.html" target="_blank">' + s + '</a><span class="time">刚刚</span></div><div class="author-content js-hf-article-pl">' + a + '</div><div class="pl-event-right"><div class="disInlineBlock pl-yh-zan js-pl-praise-box"><div class="pl-zan-wrap disInlineBlock clearfix"><i class="pl-yh-icon-zan js-pl-yh-icon-zan" data-id="' + n + '" data-type="pl-agree"></i><span class="num"></span></div><div class="pl-zan-wrap pl-disagree disInlineBlock clearfix"><i class="pl-yh-icon-zan js-pl-yh-icon-cai" data-id="' + n + '" data-type="pl-disagree"></i><span class="num"></span></div></div><div class="disInlineBlock pl-yh-dropdown"><i class="icon3 mt-pl-icon js-mt-dropdown-menu"></i>' + r + '</div></div></div><div class="hu-pl-box" style=""><textarea class="form-control" placeholder="客官，8个字起评，不讲价哟"></textarea><button class="btn btn-article js-comment-yh-hf-dp" data-type="hf">发表</button></div></div></div>';
                            e.parents(".pl-box-wrap").find(".dp-box .dp-list-box").prepend(u)
                        } else
                            i.showMessagePrompt(o.error.message, "error");
                        e.removeClass("disabled")
                    },
                    error: function(e) {
                        console.log(e)
                    }
                }))
        }),
        a.plAgreeOrDisagree = function(e, a, t) {
            var s = e.parents(".js-pl-praise-box")
                , o = s.find(".js-pl-yh-icon-zan")
                , n = o.next("span.num").html()
                , l = s.find(".js-pl-yh-icon-cai")
                , d = l.next("span.num").html()
                , r = e.next("span.num").html();
            e.hasClass("disabled") || (e.addClass("disabled"),
                $.ajax({
                    type: "post",
                    url: a,
                    data: t,
                    dataType: "json",
                    async: !0,
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    success: function(a) {
                        if (a.success) {
                            if (e.parents(".pl-zan-wrap").hasClass("pl-disagree") ? o.hasClass("active") && (o.removeClass("active"),
                                n > 1 ? o.next("span.num").html(n - 0 - 1) : o.next("span.num").html("")) : l.hasClass("active") && (l.removeClass("active"),
                                d > 1 ? l.next("span.num").html(d - 0 - 1) : l.next("span.num").html("")),
                                e.hasClass("active"))
                                if (e.removeClass("active"),
                                    r > 1 ? e.next("span.num").html(r - 0 - 1) : e.next("span.num").html(""),
                                "pl-zan" === e.attr("data-zan-sign")) {
                                    var t = p + "评论,评论内容,取消点赞";
                                    $.myDetection.htmDetection(t)
                                } else {
                                    var s = p + "评论,回复内容,取消点赞";
                                    $.myDetection.htmDetection(s)
                                }
                            else if (e.addClass("active"),
                                e.next("span.num").html(r - 0 + 1),
                            "pl-zan" === e.attr("data-zan-sign")) {
                                var c = p + "评论,评论内容,点赞";
                                $.myDetection.htmDetection(c)
                            } else {
                                var m = p + "评论,回复内容,点赞";
                                $.myDetection.htmDetection(m)
                            }
                            i.showMessagePrompt(a.data.message, "success")
                        } else
                            i.showMessagePrompt(a.error.message, "error");
                        e.removeClass("disabled")
                    },
                    error: function(e) {
                        console.log(e)
                    }
                }))
        }
        ,
        $(document).on("click", ".js-pl-yh-icon-zan, .js-pl-yh-icon-cai", function() {
            var e = $(this)
                , t = void 0
                , s = comment_api_url + "/index/agreeComment"
                , o = comment_api_url + "/index/disagreeComment"
                , n = e.attr("data-type")
                , l = {
                platform: "www",
                comment_id: e.attr("data-id")
            };
            if (0 == uid)
                return i.showMessagePrompt("此操作需要登录", "error"),
                    !1;
            t = "pl-agree" === n ? s : o,
                a.plAgreeOrDisagree(e, t, l)
        }),
        $(document).on("click", ".js-comment-yh-report-pl", function() {
            var e = $(this)
                , a = e.attr("data-cid")
                , t = e.attr("data-sign")
                , s = "";
            $(".rep-moder-box .radio-inline input").each(function(e, a) {
                $(this).prop("checked") && (s = $(this).val())
            });
            var o = $(".rep-moder-box .textarea-box .form-control").val()
                , n = s + "#" + o;
            if ("" == s && "" == o)
                return i.showMessagePrompt("请填写举报理由", "error"),
                    !1;
            var l = {
                comment_id: a,
                platform: "www",
                description: n
            };
            e.hasClass("disabled") || (e.addClass("disabled"),
                $.ajax({
                    url: comment_api_url + "/index/reportComment",
                    data: l,
                    dataType: "json",
                    type: "post",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    success: function(a) {
                        if (a.success)
                            if (i.showMessagePrompt(a.data.message, "success"),
                            "pl-report" == t) {
                                var s = p + "评论,评论内容,举报";
                                $.myDetection.htmDetection(s)
                            } else {
                                var o = p + "评论,回复内容,举报";
                                $.myDetection.htmDetection(o)
                            }
                        else
                            i.showMessagePrompt(a.error.message, "error");
                        e.removeClass("disabled")
                    },
                    error: function(e) {
                        console.log(e)
                    }
                })),
                $(".modal-header button").trigger("click")
        }),
        $(document).on("click", ".js-comment-yh-pl-yl", function() {
            var e = $(this);
            if (0 == uid)
                return i.showMessagePrompt("此操作需要登录", "error"),
                    !1;
            var a, t = $(this).parents(".pl-box-wrap").attr("data-pid"), s = $(this).attr("actype");
            "recommend" == s ? a = "material" : "del_recommend" == s && (a = "cancel_material");
            var o = {
                comment_id: t,
                type: a
            };
            e.hasClass("disabled") || (e.addClass("disabled"),
                $.ajax({
                    url: comment_api_url + "/index/highlightComment",
                    data: o,
                    dataType: "json",
                    type: "post",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    success: function(t) {
                        if (t.success)
                            if (i.showMessagePrompt(t.data.message, "success"),
                                e.parents(".pl-box-top").find(".pl-yh-content .pl-yh-elite").remove(),
                                e.parents(".pl-box-top").find(".pl-yh-content .pull-left:last").removeClass("pl-yh-content-cont"),
                                e.next(".pl-dz").text("点睛"),
                                e.next(".pl-dz").attr("actype", "article_eye"),
                            "material" == a) {
                                e.parents(".pl-box-top").find(".pl-yh-content").prepend("<div class='pull-left pl-yh-elite'>有料</div>"),
                                    e.parents(".pl-box-top").find(".pl-yh-content .pull-left").eq(1).addClass("pl-yh-content-cont"),
                                    e.text("取消有料"),
                                    e.attr("actype", "del_recommend")
                            } else
                                "cancel_material" == a && (e.parents(".pl-box-top").find(".pl-yh-content .pull-left").eq(1).removeClass("pl-yh-content-cont"),
                                    e.parents(".pl-box-top").find(".pl-yh-content .pl-yh-elite").remove(),
                                    e.text("有料"),
                                    e.attr("actype", "recommend"));
                        else
                            i.showMessagePrompt(t.error.message, "error");
                        e.removeClass("disabled")
                    },
                    error: function(e) {
                        console.log(e)
                    }
                }))
        }),
        $(document).on("click", ".js-comment-yh-pl-dj", function() {
            var e = $(this);
            if (0 == uid)
                return i.showMessagePrompt("此操作需要登录", "error"),
                    !1;
            var a, t = $(this).parents(".pl-box-wrap").attr("data-pid"), s = $(this).attr("actype");
            "article_eye" == s ? a = "dotting" : "del_article_eye" == s && (a = "cancel_dotting");
            var o = {
                comment_id: t,
                type: a
            };
            e.hasClass("disabled") || (e.addClass("disabled"),
                $.ajax({
                    url: comment_api_url + "/index/highlightComment",
                    data: o,
                    dataType: "json",
                    type: "post",
                    xhrFields: {
                        withCredentials: !0
                    },
                    crossDomain: !0,
                    success: function(t) {
                        if (t.success)
                            if (i.showMessagePrompt(t.data.message, "success"),
                                e.parents(".pl-box-top").find(".pl-yh-content .pl-yh-elite").remove(),
                                e.parents(".pl-box-top").find(".pl-yh-content .pull-left:last").removeClass("pl-yh-content-cont"),
                                e.prev(".pl-yl").text("有料"),
                                e.prev(".pl-yl").attr("actype", "recommend"),
                            "dotting" == a) {
                                e.parents(".pl-box-top").find(".pl-yh-content").prepend("<div class='pull-left pl-yh-elite'>点睛</div>"),
                                    e.parents(".pl-box-top").find(".pl-yh-content .pull-left").eq(1).addClass("pl-yh-content-cont"),
                                    e.text("取消点睛"),
                                    e.attr("actype", "del_article_eye")
                            } else
                                "cancel_dotting" == a && (e.parents(".pl-box-top").find(".pl-yh-content .pull-left").eq(1).removeClass("pl-yh-content-cont"),
                                    e.parents(".pl-box-top").find(".pl-yh-content .pl-yh-elite").remove(),
                                    e.text("点睛"),
                                    e.attr("actype", "article_eye"));
                        else
                            i.showMessagePrompt(t.error.message, "error");
                        e.removeClass("disabled")
                    },
                    error: function(e) {
                        console.log(e)
                    }
                }))
        }),
        $(document).on("click", ".js-nick-dataPoint", function() {
            var e = p + "评论,昵称,点击";
            $.myDetection.htmDetection(e)
        }),
        function() {
            $("#pl-yh-wrap").length > 0 && $(document).on("click", ".js-sure-reason-modal, .js-delDp-btn, .js-delPl-btn", function() {
                var s = $(this)
                    , o = ""
                    , n = {}
                    , l = s.attr("data-type")
                    , d = s.attr("type")
                    , r = s.attr("data-uid")
                    , c = s.attr("data-comment_id")
                    , p = i.checkReason();
                if ("detail-stopUse" === l && "" === p)
                    return i.showMessagePrompt("请选择理由", "error"),
                        !1;
                "detail-stopUse" === l && (o = "/setuser/stop_user",
                    n.is_ajax = 1,
                    n.huxiu_hash_code = huxiu_hash_code,
                    n.uid = r,
                    n.pid = c,
                    n.type = d,
                    n.reason = p,
                    e(s, o, n)),
                "detail-delPl" !== l && "detail-delDp" !== l || (o = comment_api_url + "/index/deleteComment",
                    n.platform = "www",
                    n.comment_id = c,
                    n.reason = p),
                "detail-delPl" === l && a(s, o, n, c),
                "detail-delDp" === l && t(s, o, n, c),
                    $("#reason .modal-close").trigger("click")
            });
            var e = function(e, a, t) {
                e.hasClass("disabled") || (e.addClass("disabled"),
                    i.initPromise(a, t).then(function(a) {
                        a.result ? i.showMessagePrompt(a.msg, "success") : i.showMessagePrompt(a.msg, "error"),
                            e.removeClass("disabled")
                    }).catch(function(a) {
                        i.showMessagePrompt("操作失败，请重试"),
                            e.removeClass("disabled")
                    }))
            }
                , a = function(e, a, t, s) {
                e.hasClass("disabled") || (e.addClass("disabled"),
                    i.initPromise(a, t).then(function(a) {
                        if (a.success) {
                            i.showMessagePrompt(a.data.message, "success"),
                                $(".comment-" + s).remove();
                            if ($("#comment_show_new_position .pl-box-wrap").length <= 0 && $("#comment_show_new_position").append('<div class="pl-form-wrap"><p class="pl-yh-no-content">这里空空如也，期待你的发声</p></div>'),
                            uid == e.attr("data-uid")) {
                                var t = p + "评论,删除评论";
                                $.myDetection.htmDetection(t)
                            }
                        } else
                            i.showMessagePrompt(a.error.message, "error");
                        e.removeClass("disabled")
                    }).catch(function(a) {
                        i.showMessagePrompt("操作失败，请重试"),
                            e.removeClass("disabled")
                    }))
            }
                , t = function(e, a, t, s) {
                e.hasClass("disabled") || (e.addClass("disabled"),
                    i.initPromise(a, t).then(function(a) {
                        a.success ? (i.showMessagePrompt(a.data.message, "success"),
                            $(".comment-" + s).remove()) : i.showMessagePrompt(a.error.message, "error"),
                            e.removeClass("disabled")
                    }).catch(function(a) {
                        i.showMessagePrompt("操作失败，请重试"),
                            e.removeClass("disabled")
                    }))
            }
        }(),
        $(document).on("click", ".js-mt-dropdown-menu", function() {
            var e = $(this).parents(".pl-yh-dropdown");
            e.find(".js-dropdown-menu-ul").hasClass("hide") ? ($(".js-dropdown-menu-ul").addClass("hide"),
                e.find(".js-dropdown-menu-ul").removeClass("hide")) : e.find(".js-dropdown-menu-ul").addClass("hide")
        })
});
