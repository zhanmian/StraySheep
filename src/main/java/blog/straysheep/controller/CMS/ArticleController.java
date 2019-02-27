package blog.straysheep.controller.CMS;

import net.coobird.thumbnailator.Thumbnails;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.WebUtils;
import blog.straysheep.common.PaginationResultData;
import blog.straysheep.common.ResultData;
import blog.straysheep.dto.AdminUserDto;
import blog.straysheep.dto.ArticleDto;
import blog.straysheep.entity.Article;
import blog.straysheep.requestParam.ArticleRequestParam;
import blog.straysheep.service.AdminUserServiceImp;
import blog.straysheep.service.ArticleServiceImp;
import blog.straysheep.service.BlogServiceImp;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/article")
public class ArticleController {

    @Value("${storage.location.root}")
    private String storageLocationRoot;
    @Value("${storage.location.image}")
    private String storageLocationImage;
    @Value("${baseUrl}")
    private String baseUrl;

    @ModelAttribute
    public void populateModel(Model model) {
        model.addAttribute("baseUrl", baseUrl);
    }

    @Resource
    ArticleServiceImp articleServiceImp = new ArticleServiceImp();
    @Resource
    AdminUserServiceImp adminUserServiceImp = new AdminUserServiceImp();
    @Resource
    BlogServiceImp blogServiceImp = new BlogServiceImp();



    @RequestMapping(value = "/to_list")
    public String listHtml(HttpServletRequest request, ArticleRequestParam arp,
                           @ModelAttribute("model") ModelMap model) {
//        arp.setTitle(blogServiceImp.trimStr(arp.getTitle()));
//        arp.setContent(blogServiceImp.trimStr(arp.getContent()));
//        PaginationResultData<ArticleDto> pagination = blogServiceImp.selectByPage(arp);
//        model.addAttribute("pagination", pagination);
//        model.addAttribute("requestParam", arp);

        return "article/article_list";
    }

    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list(HttpServletRequest request, ArticleRequestParam arp,
                       @ModelAttribute("model") ModelMap model) {

        PaginationResultData<ArticleDto> pagination = articleServiceImp.selectByPage(arp);
        model.addAttribute("pagination", pagination);
        model.addAttribute("requestParam", arp);

        Map<String, Object> map = pagination.convertToMap(arp.getDraw());
        return map;
    }

    @RequestMapping(value = "/to_create")
    @RequiresPermissions("create article")
    public String toCreate(HttpServletRequest request, Model model) {

        Cookie cookie = WebUtils.getCookie(request, "username");
        String username = cookie.getValue();

        AdminUserDto adminUser = adminUserServiceImp.findNickNameByUsername(username);
        List<ArticleDto> categoryList = blogServiceImp.selectAllCategory();
        model.addAttribute("adminUser", adminUser);
        model.addAttribute("categoryList", categoryList);

        return "article/create";
    }

    @RequestMapping(value = "/create")
    @ResponseBody
    public ResultData newBlog(@RequestBody ArticleDto article) throws IOException{

        ResultData resultData = articleServiceImp.addArticle(article);

        return resultData;
    }

    @RequestMapping(value = "/upload")
    @ResponseBody
    public ResultData upload(@RequestPart("file") MultipartFile image) throws IOException {

        String fileName = image.getOriginalFilename();
        String filePath = storageLocationRoot + storageLocationImage + "/" + fileName;
        System.out.println("The path is : " + filePath);
        image.transferTo(new File(filePath));

//        String filePath = storageLocationImage + "/" + fileName;
//        String newFilePath = storageLocationImage + "/small_" + fileName;

        Thumbnails.of(filePath)
                .scale(1f)
                .outputQuality(0.3f)
                .toFile(filePath);

        Map<String, Object> map = new HashMap<>();
        map.put("filePath", filePath.replace(storageLocationRoot, ""));

        Object o = new Object();
        o.equals(map);

        ResultData resultData = new ResultData();
        resultData.setData(map);
        return resultData;
    }

    @RequestMapping(value = "/upload/CKImage")
    @ResponseBody
    public Map uploadCkImage(@RequestPart("upload") MultipartFile image) throws IOException {
        String fileName = image.getOriginalFilename();
        image.transferTo(new File(storageLocationRoot + storageLocationImage + "/" +fileName));

        String filePath = storageLocationImage + "/" + fileName;

        Map map = new HashMap();
        map.put("uploaded", "true");
        map.put("url", baseUrl+"/article/downloadImage?filePath="+filePath);

        return map;
    }


    @RequestMapping(value = "/downloadImage")
    public void downloadImage(HttpServletResponse response, String filePath) throws IOException {

        File f = new File(storageLocationRoot + filePath);
        String fileName = f.getName();
        String ext = StringUtils.substringAfter(fileName, ".");
        FileInputStream fis = new FileInputStream(f);
        BufferedInputStream bis = new BufferedInputStream(fis);
        response.setContentType("image/" + ext);
        BufferedOutputStream output = new BufferedOutputStream(response.getOutputStream());
        for (int data; (data = bis.read()) > -1;) {
            output.write(data);
        }
        fis.close();
        output.close();
    }


    @RequestMapping(value = "/delete")
    @RequiresPermissions("delete article")
    @ResponseBody
    public ResultData delete(HttpServletRequest request, ArticleDto article){
        ResultData resultData = articleServiceImp.delete(article);

        return resultData;
    }

    @RequestMapping(value = "/to_update")
    @RequiresPermissions("update article")
    public String getArticle(HttpServletRequest request, Integer id,
                             Model model) {
        List<ArticleDto> categoryList = blogServiceImp.selectAllCategory();
        ArticleDto article2 = articleServiceImp.selectById(id);
        model.addAttribute("article", article2);
        model.addAttribute("categoryList", categoryList);

        return "article/update";
    }

    @RequestMapping(value = "/update")
    @RequiresPermissions("update article")
    @ResponseBody
    public ResultData update(HttpServletRequest request, String json)throws Exception{
        ResultData resultData = articleServiceImp.update(json);

        return resultData;
    }

//    @RequestMapping(value = "/hibernate_create")
//    @ResponseBody
//    public ResultData createArticle(@RequestBody Article article){
//
//        ResultData resultData = articleServiceImp.createArticleForHibernateTest(article);
//
//        return resultData;
//    }
//
//    @RequestMapping(value = "/hibernate_list")
//    @ResponseBody
//    public Object hibernateArticleList(HttpServletRequest request, ArticleRequestParam arp,
//                                       @ModelAttribute("model") ModelMap model) {
//
//        Page<Article> articles = articleServiceImp.selectAllArticleByPage(arp);
//        model.addAttribute("pagination", articles);
//        model.addAttribute("requestParam", arp);
//
//        Map<String, Object> map = new HashMap<>();
//        map.put("draw", arp.getDraw());
//        map.put("recordsTotal", articles.getTotalElements());
//        map.put("recordsFiltered", articles.getTotalElements());
//        map.put("data", articles.getContent());
//
//        return map;
//    }

    @RequestMapping(value = "/jsoup")
    public void getArticleFromOtherSites() throws IOException{

        Document document = Jsoup.connect("http://www.dgtle.com/").get();

        Element element = document.getElementById("mixbox1");

        Elements url = element.select("div").select("ul:nth-child(13)")
                .select("li.list-group-item.cards-content")
                .select("h3")
                .select("a");

        for(Element e:url){
            System.out.println(e);
        }

    }


}
