package blog.straysheep.service;

import blog.straysheep.common.PaginationResultData;
import blog.straysheep.dto.ArticleDto;
import blog.straysheep.dto.CommentDto;
import blog.straysheep.requestParam.ArticleRequestParam;

import java.io.IOException;
import java.text.ParseException;
import java.util.List;

public interface BlogService {

    ArticleDto selectArticleById(int id);

    PaginationResultData<CommentDto> selectCommentsByArticleId(ArticleRequestParam param);

    List<ArticleDto> selectArticleForBanner();

    List<ArticleDto> selectAllCategory();

    Integer selectCommentCount(Integer articleId);

    PaginationResultData<ArticleDto> selectArticleByCategory(ArticleRequestParam param);

    ArticleDto selectPreviousArticle(Integer id);

    ArticleDto selectNextArticle(Integer id);

    PaginationResultData<ArticleDto> search(ArticleRequestParam param) throws IOException, ParseException;
}
