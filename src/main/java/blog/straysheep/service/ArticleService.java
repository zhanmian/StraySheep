package blog.straysheep.service;

import org.springframework.data.domain.Page;
import blog.straysheep.common.PaginationResultData;
import blog.straysheep.common.ResultData;
import blog.straysheep.dto.ArticleDto;
import blog.straysheep.dto.CommentDto;
import blog.straysheep.entity.Article;
import blog.straysheep.requestParam.ArticleRequestParam;

import java.util.List;

public interface ArticleService {

    ResultData addArticle(ArticleDto article);

    PaginationResultData<ArticleDto> selectByPage(ArticleRequestParam param);

    List<ArticleDto> selectAllArticle();

    ResultData delete(ArticleDto article);

    ResultData update(String json)throws Exception;

    ArticleDto selectById(int id);

    String trimStr(String string);

    ResultData addComment(CommentDto commentDto);


    ResultData createArticleForHibernateTest(Article article);

    Page<Article> selectAllArticleByPage(ArticleRequestParam param);

}
