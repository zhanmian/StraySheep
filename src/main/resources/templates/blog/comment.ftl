
<#list commentList.list as item>

    <li class="thread-alt depth-1 comment">

        <div class="comment__avatar">
            <img class="avatar" src="${baseUrl}/article/downloadImage?filePath=${item.avatar!}"
                 alt="" width="50" height="50">
        </div>

        <div class="comment__content">

            <div class="comment__info">
                <div class="comment__author">${item.nickName!}</div>

                <div class="comment__meta">
                    <div class="comment__time">${item.createTime!}</div>
                    <div class="comment__reply">
                        <a class="comment-reply-link"
                           href="javascript:reply(${item.id!}, '${item.nickName!}');">
                            回复
                        </a>
                    </div>
                </div>
            </div>

            <div class="comment__text">
                <p>${item.comment!}</p>
            </div>

        </div>

        <ul class="children">
            <#list item.reply as item>
                <li class="depth-2 comment">

                    <div class="comment__avatar">
                        <img class="avatar" src="${baseUrl}/article/downloadImage?filePath=${item.avatar!}"
                             alt="" width="50" height="50">
                    </div>

                    <div class="comment__content">

                        <div class="comment__info">
                            <div class="comment__author">${item.nickName!}${item.replyNickName!}</div>

                            <div class="comment__meta">
                                <div class="comment__time">${item.createTime!}</div>
                                <div class="comment__reply">
                                    <a class="comment-reply-link"
                                       href="javascript:replyComment(${item.id!}, ${item.rootCommentId!}, '${item.nickName!}');">
                                        回复
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="comment__text">
                            <p>${item.comment!}</p>
                        </div>

                    </div>
                </li>
            </#list>
        </ul>
    </li>
</#list>


<input type="hidden" id="totalPage-comment" value="${commentList.totalPage!}">
<input type="hidden" id="current-page-comment" value="${commentList.page!}">



