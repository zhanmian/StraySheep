package blog.straysheep.configuration;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginInterceptor implements HandlerInterceptor {

    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o)throws Exception {
        System.out.println("进入了preHandle方法！！！！");

//        if (BaseController.checkLoginStatus(request) == false ) {
//            response.sendRedirect("/admin/to_login");
//            return false;
//        }
        return true;
    }

    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {
        System.out.println("进入了postHandle方法！！！！");
    }

    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {
        System.out.println("进入了afterCompletion方法！！！！");
    }


}
