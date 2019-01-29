
var articleId = $('#article-id').val();

$(document).ready(function(){

    submit();

    loadComments(articleId);

    moreComment();

    checkButton();

});

function loadComments(articleId, page){

    var param = {};
    param.articleId = articleId;
    param.page = page;

    $.ajax({
        type:'post',
        data: param,
        url: baseUrl + '/comment',
        success: function(response){
            $('#commentList').append(response);
        }
    });
}

function moreComment(){

    $('#more-comment').click(function(){

        var p = $('#current-page-comment');
        var t = $('#totalPage-comment');
        var currentPage = p.val();
        var totalPage = t.val();
        t.val(totalPage);

        if(currentPage!==totalPage){

            currentPage++;
            //设置递增后的值到隐藏域，否则递增无效
            p.val(currentPage);

            loadComments(articleId, currentPage);
        }

        checkButton();

    });
}

function checkButton(){
    var currentPage = $('#current-page-comment').val();
    var totalPage = $('#totalPage-comment').val();
    var commentCount = $('#commentCount').val();

    //评论数量为零时不显示 “更多评论” 按钮
    if(commentCount == 0){
        $('#more-comment').hide();
    }

    if(currentPage === totalPage && totalPage!==undefined){
        $('#more-comment').hide();
        $('#more-comment-info').html('评论加载完毕');
    }
}


function submit(){

    $('#submit').click(function() {
        var nickName = $('#nickName').val();

        if (nickName.length === 0) {
            alert('请输入昵称后再提交评论。');
        } else {
            addComment();
        }
    })
}

function addComment() {
    var articleId = $('#article-id').val();
    var nickName = $('#nickName').val();
    var comment = $('#comment').val();
    var replyId = $('#reply-id').val();
    var rootCommentId = $('#root-comment-id').val();
    var param = {};
    param.articleId = articleId;
    param.nickName = nickName;
    param.comment = comment;
    param.replyId = replyId;
    param.rootCommentId = rootCommentId;

    if(replyId.length===0){
        param.commentType = 0;
    }else{
        param.commentType = 1;
    }

    $.ajax({
        type: 'post',
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(param),
        url: baseUrl + '/add_comment',
        success: function (response) {
            alert(response.message);
            window.location.reload();
        }
    });
}