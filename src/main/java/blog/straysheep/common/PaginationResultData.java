package blog.straysheep.common;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PaginationResultData<T> extends ResultData implements Serializable {
    private Integer page = 0;
    private Integer pageSize = 0;

    private Integer totalPage = 0;
    private Integer totalRecord = 0;
    //new一个对象以确保不是null
    List<T> list = new ArrayList<>();

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

    public Integer getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
    }

    public Integer getTotalRecord() {
        return totalRecord;
    }

    public void setTotalRecord(Integer totalRecord) {
        this.totalRecord = totalRecord;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }


    public void calc(Integer page, Integer pageSize, Integer totalRecord){

        if(totalRecord == null){
            return;
        }

        this.setPage(page);
        this.setPageSize(pageSize);
        this.setTotalRecord(totalRecord);

        this.totalPage = this.totalRecord / this.pageSize;

        if (this.totalRecord % this.pageSize != 0) {
            this.totalPage = this.totalPage + 1;
        }
    }

    public Map<String, Object> convertToMap(Integer draw){
        Map<String, Object> map = new HashMap<>();
        map.put("draw", draw);
        map.put("recordsTotal", this.totalRecord);
        map.put("recordsFiltered", this.totalRecord);
        map.put("data", this.list);

        return map;
    }
}
