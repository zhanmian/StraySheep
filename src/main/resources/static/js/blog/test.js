var reply_comment_list_zx = '<div class="comment-reply-box">'+
    '<ul class="comment-reply">'+
    '{{each reply_list as his}}' +
    '<li class="comment-reply-item">'+
    '<div class="media_box">'+
    '<div class="m_left">'+
    '<div class="author_avator paBottom-10" data-uid="{{his.authorid}}">'+
    '<a class="avator" target="_blank" href="home.php?mod=group&type=thread&uid={{his.authorid}}">'+
    '<img class="media-object img-rounded"  src="{{his.avatar}}" />'+
    '</a>'+

    '</div>'+
    '</div>'+
    '<div class="m_body">'+
    '<h5 class="m_heading">'+
    '<div class="author_name_box" data-uid="{{his.authorid}}">'+
    '<a class="author-name" target="_blank" href="home.php?mod=group&type=thread&uid={{his.authorid}}">{{his.author}}</a>'+
    '</div>'+
    '{{#his.report}}<span class="dot">•</span><em>{{his.date}}</em>'+
    '{{if his.operation}}' +
    '<a class="m_del" href="javascript:;" onclick="modaction(\'delcomment\', \'{{his.id}}\')" sl-processed="1">删除</a>' +
    '{{/if}}' +
    '</h5>'+
    '<p class="comment-summary">{{#his.comment}}</p>'+
    '</div>'+
    '</div> '+
    '<div class="comment-icon-reply">'+
    '<a class="replyA" onclick="isBindPhoneWindow(\'comment\', \'forum.php?mod=misc&amp;action=comment&amp;tid={{his.tid}}&amp;pid={{his.pid}}&amp;extra=&amp;page=1&amp;recommentaid={{his.authorid}}&amp;replytoname={{his.author}}&amp;oldmessage={{his.comment}}\', \'get\', 0)" href="javascript:;">回复</a>' +
    '</div>'+
    '</li>'+
    '{{/each}}' +
    '</ul>'+
    '</div>';
var quote_comment_list_zx = '<div class="comment-reply-box">'+
    '<ul class="comment-reply">'+
    '<li class="comment-reply-item">'+
    '<div class="media">'+
    '<p class="comment-summary">{{#his.comment}}</p>'+
    '<div class="comment-icon-reply">'+
    '<a class="replyA" onclick="isBindPhoneWindow(\'comment\', \'forum.php?mod=misc&amp;action=comment&amp;tid={{his.tid}}&amp;pid={{his.pid}}&amp;extra=&amp;page=1&amp;replytoname={{his.author}}\', \'get\', 0)" href="javascript:;">回复</a>' +
    '</div>'+
    '</div> '+
    '</li>'+
    '</ul>'+
    '</div>';

var comment_list_zx = '{{each list as his}}' +
    '<li class="comment-item">'+
    '<div class="media_box">'+
    '<div class="m_left">'+
    '<div class="author_avator paBottom-10" data-uid="{{his.authorid}}">'+
    '<a target="_blank" class="avator" href="home.php?mod=group&type=thread&uid={{his.authorid}}">'+
    '<img class="media-object img-rounded" src="{{his.avatar}}" />'+
    '</a>'+
    '</div>'+
    '</div>'+
    '<div class="m_body">'+
    '<h5 class="m_heading">'+
    '<div class="author_name_box" data-uid="{{his.authorid}}">'+
    '<a class="author-name" target="_blank" href="home.php?mod=group&type=thread&uid={{his.authorid}}">{{his.author}}</a>'+
    '</div>'+
    '<span class="dot">•</span><em>{{his.date}}</em></h5>'+
    '{{#his.quote}}'+
    '<p class="comment-summary">{{#his.message}}</p>'+
    '{{#his.attachment}}'+
    '{{#his.reply}}'+
    '</div>'+
    '</div> '+
    '<div class="comment-icon-group">'+
    '{{if his.operation}}' +
    '<a href="javascript:;" onclick="modaction(\'delpost\', \'{{his.pid}}\')">删除<span>|</span></a>'+
    '{{/if}}' +
    '<a href="javascript:;" onclick="showWindow(\'miscreport{{his.pid}}\', \'misc.php?mod=report&amp;rtype=post&amp;rid={{his.pid}}&amp;tid={{his.tid}}&amp;fid={{his.fid}}\', \'get\', -1);return false;">举报</a><span>|</span>'+
    '<a class="repquote" href="javascript:;" onclick="isBindPhoneWindow(\'reply\', \'dgtle_post.html?action=reply&amp;fid={{his.fid}}&amp;tid={{his.tid}}&amp;repquote={{his.pid}}&amp;extra=&amp;page=1\')">引用</a><span>|</span>' +
    '<a class="replyA" onclick="isBindPhoneWindow(\'comment\', \'forum.php?mod=misc&amp;action=comment&amp;tid={{his.tid}}&amp;pid={{his.pid}}&amp;extra=&amp;page=1&amp;replytoname={{his.author}}\', \'get\', 0)" href="javascript:;">回复</a>' +
    '</div>'+
    '</li>'+
    '{{/each}}';

function ajaxNewCom(url){
    var jqCommentList = jQuery('.comment-list-box-zx .comment-list'),
        clickMoreBtn = jqCommentList.siblings('.clickMore'),
        clickSpan = clickMoreBtn.find('span'),
        g_tid = jqCommentList.data('tid'),
        g_com_uid = jqCommentList.data('guid'),
        page = jqCommentList.data('page');
    jQuery.ajax({
        url: url,
        data: {
            tid: g_tid,
            page: page
        },
        beforeSend: function(){
            if( page == 1 ){
                // clickMoreBtn.hide();
                clickMoreBtn.attr('disabled','disabled');
            }else {
                clickSpan.text('正在加载...');
                clickMoreBtn.attr('disabled','disabled');
            }

        },
        success: function(resp){
            if ( resp && resp.list ) {
                var comment_items = resp.list,
                    totalpage = resp.total;

                //加载二级评论
                for(var i=0; i<comment_items.length; i++){
                    var reply_items = comment_items[i]['reply'];
                    var reply_html = '';
                    if (reply_items.length != 0){

                        reply_items['comment'] = '';
                        var reply_data = {
                            reply_list : reply_items
                        }
                        var render = template.compile(reply_comment_list_zx);
                        reply_html = render(reply_data);
                        comment_items[i]['reply'] = reply_html;
                    } else {
                        comment_items[i]['reply'] = '';
                    }
                    var comment_summary = comment_items[i]['message'];
                    comment_items[i]['message'] = comment_summary;


                    //评论中的图片
                    var comImg = comment_items[i]['attachment'],
                        comTid = comment_items[i]['tid'],
                        comPid = comment_items[i]['pid'];
                    comment_items[i]['attachment'] = addComImg( comImg, comTid, comPid );

                }
                //加载引用评论
                for(var i=0; i<comment_items.length; i++){
                    var quote_html = comment_items[i]['quote'];
                    if (!quote_html){
                        comment_items[i]['quote'] = '';
                    } else {

                        var quote_comment_list_zx = '<div class="quote-box">'+
                            '<p class="quote-summary">'+quote_html+'</p>'+
                            '</div>';
                        comment_items[i]['quote'] = quote_comment_list_zx;
                    }

                }
                var render = template.compile(comment_list_zx);
                var comment_html = render(resp);
                jQuery('#comment-list-box-1 .comment-list').append( comment_html );

                //评论中图片数量为4个时的样式
                var jqComItem = jqCommentList.find('.comment-item');
                jqComItem.each(function(){
                    var jqthis = jQuery(this),
                        comImgItemsBox = jqthis.find('.comImgBox'),
                        comImgItems = comImgItemsBox.find('.zjj_attachimg');
                    comImgLen = comImgItems.length;
                    if( comImgLen == 4 ){
                        jqthis.find('.comImgBox').css('width','180px')
                    }
                })
                var commGroupBtn = jqCommentList.find('.comment-icon-group');
                commGroupBtn.each(function(){
                    if( !g_com_uid ) {

                        jQuery(this).parent('.comment-item').css('paddingBottom','0')
                        jQuery(this).remove();
                    }else {
                        //引用
                        // jQuery('.repquote').each(function(){
                        //   var jqThis = jQuery(this);
                        //   var jqHerf = jqThis.attr('href');
                        //   jqThis.click(function(){
                        //     showWindow('reply', jqHerf)
                        //   })
                        // })
                        //回复
                        // jQuery('.replyA').each(function(){
                        //   var jqThis = jQuery(this);
                        //   var jqHerf = jqThis.attr('href');
                        //   jqThis.click(function(){
                        //     showWindow('comment', jqHerf, 'get', 0)
                        //   })
                        // })
                    }
                })
                var commGroupBtn = jqCommentList.find('.comment-icon-reply');
                commGroupBtn.each(function(){
                    if( !g_com_uid ) {
                        jQuery(this).remove();
                    }else {
                        //回复
                        // jQuery('.replyA').each(function(){
                        //   var jqThis = jQuery(this);
                        //   var jqHerf = jqThis.attr('href');
                        //   jqThis.click(function(){
                        //     showWindow('comment', jqHerf, 'get', 0)
                        //   })
                        // })
                    }
                })
                if( page != totalpage ) {
                    page++;
                    jqCommentList.data('page',page);
                    clickMoreBtn.show();
                    clickSpan.text('更多评论');
                    clickMoreBtn.removeAttr('disabled');
                } else {
                    clickMoreBtn.text('全部加载完毕');
                    // clickMoreBtn.attr('disabled','disabled');
                }

            } else {
                if (page == 1) {
                    jQuery('.comment-list-box-zx').html('暂无评论')
                        .css({'height': '300px', 'line-height': '94px', 'text-align': 'center', 'color': '#999'});
                }
            }



        }
    })
}

//最新评论图片
function addComImg(data, tid, pid){
    var commentListBox = '',
        imgItem = '';
    if( !data || JSON.stringify(data) === '[]' ){
        commentListBox = '';
    }else {
        for( var val in data ) {
            imgItem +='<div class="zjj_attachimg l">'+
                '<a id="aimg_' + val + '" aid="' + val + '" href="javascript:;" style="background-image:url(' + data[val] + ')" onclick="showWindow(\'aimg_' + val + '\',\'viewphoto.php?aid=' + val + '&amp;tid=' + tid + '&amp;pid=' + pid + '\',\'get\',0);hideaimg(' + val + ')"></a>' +
                '</div>';
        }
        commentListBox = '<div class="comImgBox cl">'+ imgItem+'</div>';

    }
    return commentListBox;
}

//首页社区内容tab切换
var forum_list = '{{each list}}' +
    '<ul class="list-group">'+
    '<li class="list-group-item img-box">'+
    '<a target="_blank" href="thread-{{$value.tid}}-1-1.html">'+
    '<img src={{$value.attach}} />'+
    '</a>'+
    '</li>'+
    '<li class="list-group-item cards-content">'+
    '<h3><a target="_blank" href="thread-{{$value.tid}}-1-1.html">{{$value.subject}}</a></h3>'+
    '<p>{{$value.message}}</p>'+
    '</li>'+
    '<li class="list-group-item">'+
    '<div class="media_box paTop-14">'+
    '<div class="m_left author_avator paBottom-10" data-uid="{{$value.authorid}}">'+
    '<a target="_blank" class="img_box" href="home.php?mod=space&type=thread&uid={{$value.authorid}}">'+
    '<img class="media-object img-rounded"  src=\'http://www.dgtle.com/uc_server/avatar.php?uid={{$value.authorid}}\' />'+
    '</a>'+

    '</div>'+
    '<div class="m_body">'+
    '<h5 class="m_heading">'+
    '<div class="author_name_box" data-uid="{{$value.authorid}}">'+
    '<a target="_blank" href="home.php?mod=space&type=thread&uid={{$value.authorid}}">{{$value.author}}</a>'+
    '</div>'+
    '<span>·</span>{{$value.date}}<a target="_blank" class="forum_type" href="home.php?mod=space&type=thread&uid={{$value.authorid}}">{{$value.type}}</a>'+
    '</h5>'+
    '</div>'+
    '</div>'+
    '</li>'+
    '<li class="list-group-item">'+
    '<div class="list-stat">'+
    '<a href="javascript:;" style="display: inline-block;">'+
    '<div class="dgtle-fonts like-icon {{$value.recommend}}"  data-groupfid="{{$value.fid}}" data-grouptid="{{$value.tid}}">'+
    '<i class="icobutton icobutton--thumbs-up Dgtle-fonts icon-Dgtlex-dgtlexicon-like">'+
    '<b class="fa fa-thumbs-up"></b>'+
    '</i>'+
    '</div>'+
    '</a>'+
    '<span class="like-num">{{$value.recommend_add}}</span>'+
    '<a target="_blank" href="thread-{{$value.tid}}-1-1.html"><i class="Dgtle-fonts icon-Dgtlex-dgtlexicon-comment"></i></a><span>{{$value.comment_num}}</span>'+
    '<div class="{{$value.homed}} pull-right is_home" title="首页推荐"><i class="Dgtle-fonts icon-Dgtlex-dgtlexicon-Home-commend"></i></div>'+
    '</div>'+
    '</li>'+
    '</ul>'+
    '{{/each}}';

function ajaxList_group(target,temp,url1,fn1) {
    var Index = jQuery(target).index(),
        forumList = jQuery(target).parent().siblings('.tab-content').find('.tablist').eq(Index).find('.waterfall-cards'),
        flag = forumList.data('flag'),
        type = jQuery(target).data('type');
    forumList.siblings('.clickMore').hide();
    jQuery.ajax({
        url: url1,
        data: {
            perpage: 24,
            typeid: type
        },
        dataType: 'json',
        beforeSend: function () {
            var Loading_animation = '<div class="spinner">' +
                '<div class="bounce1"></div>'+
                '<div class="bounce2"></div>'+
                '<div class="bounce3"></div>'+
                '</div>';
            forumList.html( Loading_animation );
        },
        success: function ( resp ) {
            forumList.html();
            var totalpage = resp.total_page,
                data = resp,
                dateline = data.dateline,
                data_list = data.list;

            if( !data_list || JSON.stringify(data_list) === '[]' || JSON.stringify(data_list) === '{}' ){
                forumList.html('');
            } else {
                var list_len = data_list.length;
                for( var i=0; i<list_len; i++ ){
                    if( data_list[i]['is_home']!= '0' ){
                        data_list[i]['homed'] = 'forum_homed'
                    }
                    if( data_list[i]['is_recommend']!= '0' ){
                        data_list[i]['recommend'] = 'recommed'
                    }
                }
                var render = template.compile(temp);
                var nodeList = jQuery(render(data));
                if( flag ) {
                    forumList.html( nodeList );
                    // setTimeout(function(){jQuery(target).imagesLoaded(
                    //     function(){jQuery(target).masonry({
                    //       itemSelector: '.list-group',
                    //       gutter: 0,
                    //       isAnimated: true
                    //     })
                    //   })
                    // },200);
                    forumList.imagesLoaded(
                        function(){forumList.masonry({
                            itemSelector: '.list-group',
                            gutter: 0,
                            isAnimated: true
                        })
                        })
                    forumList.data('flag', 0);

                } else {
                    forumList.masonry('destroy').html( nodeList );

                    setTimeout(function(){
                        forumList.imagesLoaded(function() {
                            forumList.masonry({
                                itemSelector: '.list-group',
                                gutter: 0,
                                isAnimated: true
                            });
                        });
                    },200);
                }
                jQuery.imgLazy({ effect: 'fadeIn', viewport: true });
                // for( var i=0; i<data_list.length; i++ ){
                //   if( data_list[i]['is_recommend'] ){
                //     var isRecom = data_list[i]['is_recommend'],
                //         likeIcons = forumList.find('ul.list-group .like-icon');
                //     if( isRecom == 1 ){
                //         likeIcons.eq(i).addClass('recommed');
                //     }
                //   }
                // }
                fn1(list_len);
                if( totalpage != 1 && totalpage != 0) {
                    forumList.siblings('.clickMore').css('display','block');

                }
                forumList.siblings('.clickMore').data('dateline',dateline);
            }
        },
        error: function () {
            forumList.html('重新加载...');
        }
    })
}
//ajax 加载更多列表
function g_ajaxGetMoreList(btn,target,temp,url1,fn1) {
    var base = jQuery(btn),
        forumList = base.siblings(),
        flag = forumList.data('flag'),
        dateLine = base.data('dateline'),
        type = jQuery(target).data('type'),
        page = base.data('current');
    page == 1 ? page++ : '';
    jQuery.ajax({
        url: url1 + '&dateline=' + dateLine,
        dataType: 'json',
        data: {
            page: page,
            perpage: 24,
            typeid: type
        },
        beforeSend: function () {
            base.find('span').html('加载中...');
            base.attr('disabled');
        },
        success: function (resp) {
            var totalpage = resp.total,
                data = resp,
                dataline = data.dateline,
                data_list = data.list || [],
                list_len = data_list.length;
            for( var i=0; i<list_len; i++ ){
                if( data_list[i]['is_home']!= '0' ){
                    data_list[i]['homed'] = 'forum_homed'
                }
                if( data_list[i]['is_recommend']!= '0' ){
                    data_list[i]['recommend'] = 'recommed'
                }
            }
            if (page <= totalpage) {
                var render = template.compile(temp);
                var nodeList = jQuery(render({
                    list: data.list
                }));
                forumList.append( nodeList ).imagesLoaded(function() {
                    forumList.masonry( 'appended', nodeList );
                });


                jQuery.imgLazy({ effect: 'fadeIn', viewport: true });
                fn1(list_len);
                base.find('span').html('加载更多');
                base.data('dateline',dataline);
                base.removeAttr('disabled');
                if (page == totalpage) {
                    base.html('全部加载完成');
                }
                page++;
                base.data('current', page);
            } else {
                base.html('全部加载完成');
            }
        },
        error: function () {
            base.removeAttr('disabled');
            base.find('span').html('重新加载...');
        }
    });

}
