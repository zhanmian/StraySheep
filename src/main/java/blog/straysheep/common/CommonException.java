package blog.straysheep.common;

public class CommonException extends RuntimeException {
    int code;
    String message;

    public CommonException() {
        this.code = 1;
        this.message = "系统错误！";
    }

    public CommonException(int code, String message) {
        this.code = code;
        this.message = message;
    }


    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
