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
    window.location.href=baseUrl+'/index?page='+page;
}