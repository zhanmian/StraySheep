package blog.straysheep.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import blog.straysheep.common.CommonException;
import blog.straysheep.common.PaginationResultData;
import blog.straysheep.common.ResultData;
import blog.straysheep.dao.ArticleDao;
import blog.straysheep.dao.ArticleMapper;
import blog.straysheep.dto.ArticleDto;
import blog.straysheep.dto.CommentDto;
import blog.straysheep.entity.Article;
import blog.straysheep.requestParam.ArticleRequestParam;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ArticleServiceImp implements ArticleService {

    @Resource
    private ArticleMapper articleMapper;

    @Autowired
    private ArticleDao articleDao;

    @Override
    @Transactional
    public ResultData addArticle(ArticleDto article) {

        ResultData resultData = new ResultData();

        try {
            if (StringUtils.isBlank(article.getTitle())) {
                throw new CommonException(2000, "错误参数：title");
            }
            articleMapper.insertArticle(article);
            articleMapper.insertContent(article);

//            RestHighLevelClient client = new RestHighLevelClient(
//                    RestClient.builder(
//                            new HttpHost("localhost", 9200, "http"),
//                            new HttpHost("localhost", 9201, "http")));
//
//            Map<String, Object> jsonMap = new HashMap<>();
//            jsonMap.put("id", article.getId());
//            jsonMap.put("title", article.getTitle());
//            jsonMap.put("summary", article.getSummary());
//            jsonMap.put("article_content", article.getContent());
//            jsonMap.put("image", article.getImage());
//            jsonMap.put("category_id", article.getCategoryId());
//            jsonMap.put("creator_id", article.getCreatorId());
//            jsonMap.put("create_time", );
//            IndexRequest indexRequest = new IndexRequest("article_list", "article", article.getId().toString())
//                    .source(jsonMap);
//
//            IndexResponse indexResponse = client.index(indexRequest, RequestOptions.DEFAULT);
//
//            client.close();

            resultData.setMessage("新建文章成功！");

        } catch (CommonException e) {
            e.printStackTrace();
            throw new CommonException(e.getCode(), e.getMessage());

        } catch (Exception e) {
            e.printStackTrace();
            throw new CommonException();
        }
        return resultData;
    }

    @Override
    public PaginationResultData<ArticleDto> selectByPage(ArticleRequestParam param) {

        PaginationResultData<ArticleDto> resultData = new PaginationResultData<>();

        int totalRecord = articleMapper.selectTotalRecord(param);

        resultData.calc(param.getPage(),param.getPageSize(),totalRecord);

        List<ArticleDto> list = articleMapper.selectByPage(param);

        resultData.setList(list);

        return resultData;
    }

    @Override
    public List<ArticleDto> selectAllArticle(){

        List<ArticleDto> list = articleMapper.selectAllArticle();

        return list;
    }

    @Override
    @Transactional
    public ResultData delete(ArticleDto article) {

        ResultData resultData = new ResultData();

        try{
            articleMapper.deleteArticle(article);
            articleMapper.deleteContent(article);

            resultData.setMessage("删除成功！");

        }catch(CommonException e){
            e.printStackTrace();
            throw new CommonException(e.getCode(),e.getMessage());

        }catch(Exception e){
            e.printStackTrace();
            throw new CommonException();
        }
        return resultData;
    }

    @Override
    @Transactional
    public ArticleDto selectById(int id) {

        ArticleDto findArticle = articleMapper.findArticle(id);

        String content = articleMapper.findContent(id);

        findArticle.setContent(content);

        return findArticle;
    }

    @Override
    @Transactional
    public ResultData update(String json) throws Exception {

        ResultData resultData = new ResultData();

        try{
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(json);
            int id = jsonNode.get("id").asInt();
            String summary = jsonNode.get("summary").asText();
            String title = jsonNode.get("title").asText();
            String content = jsonNode.get("content").asText();
            String image = jsonNode.get("image").asText();
            int categoryId = jsonNode.get("categoryId").asInt();

            ArticleDto article = new ArticleDto();
            article.setId(id);
            article.setTitle(title);
            article.setSummary(summary);
            article.setContent(content);
            article.setImage(image);
            article.setCategoryId(categoryId);

            articleMapper.updateArticle(article);
            articleMapper.updateContent(article);

            resultData.setMessage("修改成功！");

        }catch(CommonException e){
            e.printStackTrace();
            throw new CommonException(e.getCode(),e.getMessage());

        }catch(Exception e){
            e.printStackTrace();
            throw new CommonException();
        }
        return resultData;
    }

    @Override
    public String trimStr(String string){
        String str = string.trim();
        return str;
    }

    @Override
    public ResultData addComment(CommentDto commentDto){

        ResultData resultData = new ResultData();

        try{
            articleMapper.insertComment(commentDto);
            resultData.setMessage("评论添加成功！");

        }catch(CommonException e){
            e.printStackTrace();
            throw new CommonException(e.getCode(),e.getMessage());

        }catch(Exception e){
            e.printStackTrace();
            throw new CommonException();
        }
        return resultData;
    }

    @Override
    public ResultData createArticleForHibernateTest(Article article){

        ResultData resultData = new ResultData();

        try{
            articleDao.save(article);

            resultData.setMessage("新建文章成功");

        }catch(CommonException e){
            e.printStackTrace();
            throw new CommonException(e.getCode(),e.getMessage());

        }catch(Exception e){
            e.printStackTrace();
            throw new CommonException();
        }
        return resultData;
    }

    @Override
    public Page<Article> selectAllArticleByPage(ArticleRequestParam param){

        Sort sort = new Sort(Sort.Direction.ASC, "id");
        //通过from和pageSize计算当前页码，因为DataTable只返回start而不返回当前页码
        Integer pageSize = param.getPageSize();
        Integer from = param.getStart();
        Integer page = (from + pageSize)/pageSize;
        //Pageable页码初始值是0，代表第一页
        Pageable pageable = new PageRequest(page-1, param.getLength(), sort);
        Page<Article> articles = articleDao.findAll(pageable);

        return articles;
    }


}
