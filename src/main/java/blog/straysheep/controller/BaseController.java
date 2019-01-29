package blog.straysheep.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.WebUtils;
import blog.straysheep.dto.AdminUserDto;
import blog.straysheep.service.AdminUserServiceImp;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.Locale;

@Controller
public class BaseController {

    @Value("${baseUrl}")
    private String baseUrl;

    @ModelAttribute
    public void populateModel(Model model) {
        model.addAttribute("baseUrl", baseUrl);

    }

    @Resource
    AdminUserServiceImp adminUserServiceImp = new AdminUserServiceImp();

    @RequestMapping(value = "")
    public String home(HttpServletRequest request, Locale locale, Model model) {

        Cookie cookie = WebUtils.getCookie(request, "username");
        String username = cookie.getValue();

        AdminUserDto adminUser = adminUserServiceImp.findNickNameByUsername(username);

        model.addAttribute("adminUser", adminUser);

        return "index";
    }

    public static String getRequestBodyAsString(HttpServletRequest request) throws Exception {
        BufferedReader br = null;
        StringBuilder sb = new StringBuilder("");
        try {
            br = request.getReader();
            String str;
            while ((str = br.readLine()) != null) {
                sb.append(str);
            }
            br.close();
        } catch (IOException e) {
            throw e;
        } finally {
            if (null != br) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        String s = sb.toString();
        System.out.println("请求数据：" + s);
        return s;
    }

    public static boolean checkLoginStatus(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();
        if (cookies == null){
             return false;
        }else{
            boolean hasUserName = false;
            for(Cookie cookie : cookies){
                if(cookie.getName().equals("username")){
                    hasUserName = true;
                    break;
                }
            }
           return hasUserName;
        }
    }


}
