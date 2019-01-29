package blog.straysheep.controller.client;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import blog.straysheep.common.PaginationResultData;
import blog.straysheep.common.ResultData;
import blog.straysheep.dto.ArticleDto;
import blog.straysheep.dto.CommentDto;
import blog.straysheep.requestParam.ArticleRequestParam;
import blog.straysheep.service.ArticleServiceImp;
import blog.straysheep.service.BlogServiceImp;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.text.ParseException;
import java.util.List;

@Controller
public class BlogController {

    @Resource
    private ArticleServiceImp articleServiceImp;
    @Resource
    private BlogServiceImp blogServiceImp;

    @Value("${baseUrl}")
    private String baseUrl;

    @ModelAttribute
    public void populateModel(Model model) {
        model.addAttribute("baseUrl", baseUrl);
    }

    @RequestMapping(value = "/index")
    public String toIndex(HttpServletRequest request, ArticleRequestParam param,
                          Model model){
        List<ArticleDto> categoryList = blogServiceImp.selectAllCategory();
        List<ArticleDto> articleListForBanner = blogServiceImp.selectArticleForBanner();

        param.setPageSize(12);
        PaginationResultData<ArticleDto> pagination = articleServiceImp.selectByPage(param);

        model.addAttribute("categoryList", categoryList);
        model.addAttribute("banner", articleListForBanner);
        model.addAttribute("pagination", pagination);
        //如果是首页就返回有banner的页面
        if(param.getPage().equals(1)){
            return "/blog/index";
        }else{
            return "/blog/article_list";
        }
    }

    @RequestMapping(value = "/article")
    public String readArticle(HttpServletRequest request, Integer id,
                              Model model) throws IOException{
        List<ArticleDto> categoryList = blogServiceImp.selectAllCategory();
        ArticleDto article = blogServiceImp.selectArticleById(id);
        Integer commentCount = blogServiceImp.selectCommentCount(id);
        ArticleDto preArticle = blogServiceImp.selectPreviousArticle(id);
        ArticleDto nextArticle = blogServiceImp.selectNextArticle(id);

        model.addAttribute("categoryList", categoryList);
        model.addAttribute("article",article);
        model.addAttribute("commentCount", commentCount);
        model.addAttribute("preArticle", preArticle);
        model.addAttribute("nextArticle", nextArticle);
//        含有ajax的网页使用htmlunit模拟浏览器获取加载后的数据，再用jsoup解析
//        WebClient webClient = new WebClient(BrowserVersion.CHROME);
//        webClient.getOptions().setCssEnabled(false);
//        webClient.getOptions().setJavaScriptEnabled(true);
//        webClient.getOptions().setRedirectEnabled(true);
//        webClient.getOptions().setThrowExceptionOnScriptError(false);
//        webClient.getOptions().setTimeout(50000);
//
//        HtmlPage htmlPage = webClient.getPage("http://www.dgtle.com/");
//        webClient.waitForBackgroundJavaScript(5000);
//        String html = htmlPage.asXml();

//        Document document = Jsoup.parse(html);
//        Elements element = document.getElementsByClass("list-group-item cards-content");
//        Elements url = element.select("h3");


        Document document = Jsoup.connect("https://www.ifanr.com/").get();
        Elements elements = document.getElementById("article-container").select("h3").select("a");

        for(Element e:elements){
            String url = e.attr("href");
            Document document1 = Jsoup.connect(url).get();
            String title = document1.getElementsByTag("h1").get(0).text();
            Elements content = document1.getElementsByTag("article");
            String image = document1.getElementById("article-header").select("img").attr("src").toString();
//
//            ArticleDto articleDto = new ArticleDto();
//            articleDto.setTitle(title);
//            articleDto.setContent(content.toString());

//            System.out.println(title);
//            System.out.println(content);
        }

        return "/blog/article";
    }

    @RequestMapping(value = "/comment")
    public String getComment(HttpServletRequest request, ArticleRequestParam param,
                             Model model){

        param.setPageSize(5);
        PaginationResultData<CommentDto> commentList = blogServiceImp.selectCommentsByArticleId(param);

        model.addAttribute("commentList", commentList);

        return "/blog/comment";
    }

    @RequestMapping(value = "/category")
    public String readByCategory(HttpServletRequest request, ArticleRequestParam param,
                                 Model model){
        param.setPageSize(12);
        PaginationResultData<ArticleDto> pagination = blogServiceImp.selectArticleByCategory(param);
        List<ArticleDto> categoryList = blogServiceImp.selectAllCategory();
        model.addAttribute("categoryList", categoryList);
        model.addAttribute("pagination", pagination);

        return "/blog/category";
    }

    @RequestMapping(value = "/add_comment")
    @ResponseBody
    public ResultData addComment(@RequestBody CommentDto commentDto){

        ResultData resultData = articleServiceImp.addComment(commentDto);

        return resultData;
    }

    @RequestMapping(value = "/search")
    public String search(HttpServletRequest request, ArticleRequestParam param,
                         Model model) throws IOException, ParseException {

        param.setPageSize(6);

        PaginationResultData<ArticleDto> result = blogServiceImp.search(param);
        model.addAttribute("pagination", result);

        List<ArticleDto> categoryList = blogServiceImp.selectAllCategory();
        model.addAttribute("categoryList", categoryList);

        model.addAttribute("keyword", param.getKeyword());

        return "/blog/search_result";
    }
}
