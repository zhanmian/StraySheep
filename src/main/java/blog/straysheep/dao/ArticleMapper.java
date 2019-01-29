package blog.straysheep.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import blog.straysheep.common.PaginationRequestParam;
import blog.straysheep.dto.ArticleDto;
import blog.straysheep.dto.CommentDto;
import blog.straysheep.requestParam.ArticleRequestParam;

import java.util.List;

@Mapper
public interface ArticleMapper {

    //以下为CMS部分
    ArticleDto findArticle(Integer id);

    String findContent(Integer id);

    Integer selectTotalRecord(ArticleRequestParam param);

    List<ArticleDto> selectByPage(ArticleRequestParam pagination);

    List<ArticleDto> selectAllArticle();

    ArticleDto selectArticleById(@Param("id") Integer id);

    void updateArticle(ArticleDto article);

    void updateContent(ArticleDto article);

    void insertArticle(ArticleDto article);

    void insertContent(ArticleDto article);

    void deleteArticle(ArticleDto article);

    void deleteContent(ArticleDto article);

    //以下为client部分
    void insertComment(CommentDto commentDto);

    List<CommentDto> selectCommentsByArticleId(PaginationRequestParam param);

    List<CommentDto> selectReplyByCommentId(@Param("id") Integer id);

    CommentDto selectReplyNickNameByReplyId(@Param("id") Integer id);

    Integer selectCommentTotalRecord(ArticleRequestParam param);

    List<ArticleDto> selectAllCategory();

    List<ArticleDto> selectArticleByCategoryId(ArticleRequestParam param);

    ArticleDto selectPreviousArticleByArticleId(@Param("id") Integer id);

    ArticleDto selectNextArticleByArticleId(@Param("id") Integer id);

    Integer selectTotalRecordByCategory(ArticleRequestParam param);

    Integer selectCommentsCountByArticleId(@Param("id") Integer id);






//    @Select("select * from article limit #{from}, #{pageSize}")
//    @Results({
//            //返回结果实体属性与数据库字段转换
//            @Result(property = "createTime", column = "create_time")
//    })

//    @Insert("insert into article (title, create_time) values(#{title}, now())")
//    同时插入两个表时要获取主表最后插入的id
//    @SelectKey(statement = "select last_insert_id()", keyProperty = "id", before=false, resultType=Integer.class)
}
