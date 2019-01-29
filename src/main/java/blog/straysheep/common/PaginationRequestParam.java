package blog.straysheep.common;

import java.io.Serializable;

public class PaginationRequestParam implements Serializable {
    private Integer page = 1;
    private Integer pageSize = 10;

    private Integer start;
    private Integer length;
    private Integer draw;

    private Integer from = 0;

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getDraw() {
        return draw;
    }

    public void setDraw(Integer draw) {
        this.draw = draw;
    }

    public Integer getStart() {
        return start;
    }

    public void setStart(Integer start) {
        this.start = start;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public void setFrom(Integer from) {
        this.from = from;
    }

    public Integer getFrom() {
        if(start != null){
            pageSize = length;
            return start;
        }


        int from = (page * pageSize) - pageSize;
        return from;
    }


}
