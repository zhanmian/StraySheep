package blog.straysheep.configuration;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;
import blog.straysheep.common.CommonException;
import blog.straysheep.common.ResultData;

@ControllerAdvice
public class ExceptionAdvice implements ResponseBodyAdvice {
    @Override
    public boolean supports(MethodParameter methodParameter, Class aClass) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object o, MethodParameter methodParameter, MediaType mediaType, Class aClass, ServerHttpRequest serverHttpRequest, ServerHttpResponse serverHttpResponse) {
        return o;
    }

    @ExceptionHandler(value = {NoHandlerFoundException.class})
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ResultData noHandlerFoundException(HttpServletRequest req, NoHandlerFoundException ex) {
        ResultData resultData = new ResultData();
        resultData.setCode(10086);
        resultData.setMessage("路径不存在");
        return resultData;
    }

    @ExceptionHandler(value = {CommonException.class})
    @ResponseBody
    public ResultData handleCommonException(HttpServletRequest req, CommonException e) {
        ResultData resultData = new ResultData();
        resultData.setCode(e.getCode());
        resultData.setMessage(e.getMessage());
        return resultData;
    }
}
