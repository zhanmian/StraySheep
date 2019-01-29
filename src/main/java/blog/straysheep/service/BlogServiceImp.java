package blog.straysheep.service;

import org.apache.http.HttpHost;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.stereotype.Service;
import blog.straysheep.common.PaginationResultData;
import blog.straysheep.dao.ArticleMapper;
import blog.straysheep.dto.ArticleDto;
import blog.straysheep.dto.CommentDto;
import blog.straysheep.requestParam.ArticleRequestParam;

import javax.annotation.Resource;
import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Service
public class BlogServiceImp implements BlogService {

    @Resource
    private ArticleMapper articleMapper;

    @Override
    public ArticleDto selectArticleById(int id){

        ArticleDto articleDto = articleMapper.selectArticleById(id);

        return articleDto;
    }

    @Override
    public PaginationResultData<CommentDto> selectCommentsByArticleId(ArticleRequestParam param){

        PaginationResultData<CommentDto> resultData = new PaginationResultData<>();

        Integer totalRecord = articleMapper.selectCommentTotalRecord(param);

        resultData.calc(param.getPage(),param.getPageSize(),totalRecord);

        //查找出文章的评论
        List<CommentDto> list = articleMapper.selectCommentsByArticleId(param);

        for(CommentDto dto:list){
            //根据文章评论的id查找出该评论的回复
            List<CommentDto> replyList = articleMapper.selectReplyByCommentId(dto.getId());
            dto.setReply(replyList);

            for(CommentDto dto1:replyList){
                //根据replyId查找被回复的昵称
                CommentDto replyNickName = articleMapper.selectReplyNickNameByReplyId(dto1.getReplyId());
                if(replyNickName!=null){
                    dto1.setReplyNickName(" 回复 "+replyNickName.getNickName());
                }
            }

        }
        resultData.setList(list);
        return  resultData;
    }

    @Override
    public Integer selectCommentCount(Integer articleId){

        Integer commentCount = articleMapper.selectCommentsCountByArticleId(articleId);

        return commentCount;
    }

    @Override
    public List<ArticleDto> selectArticleForBanner(){

        List<ArticleDto> list = new ArrayList<>();

        list.add(selectArticleById(1));
        list.add(selectArticleById(1));
        list.add(selectArticleById(1));

        return list;
    }

    @Override
    public List<ArticleDto> selectAllCategory(){

        List<ArticleDto> list = articleMapper.selectAllCategory();

        return list;
    }

    @Override
    public PaginationResultData<ArticleDto> selectArticleByCategory(ArticleRequestParam param) {

        PaginationResultData<ArticleDto> resultData = new PaginationResultData<>();

        int totalRecord = articleMapper.selectTotalRecordByCategory(param);

        resultData.calc(param.getPage(),param.getPageSize(),totalRecord);

        List<ArticleDto> list = articleMapper.selectArticleByCategoryId(param);

        resultData.setList(list);

        return resultData;
    }

    @Override
    public ArticleDto selectPreviousArticle(Integer id){
        ArticleDto articleDto = articleMapper.selectPreviousArticleByArticleId(id);
        return articleDto;
    }

    @Override
    public ArticleDto selectNextArticle(Integer id){
        ArticleDto articleDto = articleMapper.selectNextArticleByArticleId(id);
        return articleDto;
    }

    @Override
    public PaginationResultData<ArticleDto> search(ArticleRequestParam param)
                                throws IOException, ParseException {

        PaginationResultData<ArticleDto> resultData = new PaginationResultData<>();

        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(
                        new HttpHost("localhost", 9200, "http"),
                        new HttpHost("localhost", 9201, "http")));
        //设置要查询的index，type
        SearchRequest searchRequest = new SearchRequest("article_list");
        searchRequest.types("article");

        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
        //查询条件 使用短语匹配左模糊查询搭配ik分词器
        searchSourceBuilder.query(QueryBuilders.boolQuery()
                .should(QueryBuilders.matchPhrasePrefixQuery("title", param.getKeyword()))
                .should(QueryBuilders.matchPhrasePrefixQuery("article_content", param.getKeyword())));

        searchRequest.source(searchSourceBuilder);
        SearchResponse searchResponse = client.search(searchRequest, RequestOptions.DEFAULT);
        //获取搜索总数量
        SearchHits hits = searchResponse.getHits();
        SearchHit[] searchHits = hits.getHits();
        Integer totalRecord = searchHits.length;
        //计算分页需要的总页数，起始数
        resultData.calc(param.getPage(), param.getPageSize(), totalRecord);
        Integer totalPage = resultData.getTotalPage();
        Integer from = param.getFrom();

        searchSourceBuilder.from(from);
        searchSourceBuilder.size(param.getPageSize());
        searchRequest.source(searchSourceBuilder);
        SearchResponse searchResponse1 = client.search(searchRequest, RequestOptions.DEFAULT);

        SearchHits hits1 = searchResponse1.getHits();
        SearchHit[] searchHits1 = hits1.getHits();

        List<ArticleDto> list = new ArrayList<>();

        for(SearchHit hit:searchHits1){

            Map<String, Object> sourceMap = hit.getSourceAsMap();

            Integer id = (Integer)sourceMap.get("id");
            String title = (String)sourceMap.get("title");
            String image = (String)sourceMap.get("image");
            String createTime = (String)sourceMap.get("create_time");

            ArticleDto article = new ArticleDto();
            article.setId(id);
            article.setTitle(title);
            article.setImage(image);
            article.setCreateTime(article.UTCToCST(createTime));

            list.add(article);
        }
        client.close();
        resultData.setList(list);
        return resultData;
    }
}
