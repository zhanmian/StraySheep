package blog.straysheep.common;

public class ResultData<T> {
    int code;
    String message;
    T data;



    public ResultData(){
        this.code = 0;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
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
