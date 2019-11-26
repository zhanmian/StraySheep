$(document).ready(function(){
    initPagination();
    window.onscroll = watchScroll;
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
    window.location.href=baseUrl+'/index?page='+page;
}

function watchScroll () {
    var bodyScrollHeight =  document.body.scrollTop;// body滚动高度
    var windowHeight = window.innerHeight;// 视窗高度
    var imgs = document.getElementsByClassName('lazyLoad');
    for (var i =0; i < imgs.length; i++) {
        var imgHeight = imgs[i].offsetTop;// 图片距离顶部高度
        if (imgHeight  < windowHeight  + bodyScrollHeight) {
            imgs[i].src = imgs[i].getAttribute('data-src');
            console.log(imgs[i].getAttribute('data-src'));
            imgs[i].className = imgs[i].className.replace('lazyLoad','')
        }
    }
}

