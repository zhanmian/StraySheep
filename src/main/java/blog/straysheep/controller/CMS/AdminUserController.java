package blog.straysheep.controller.CMS;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.DisabledAccountException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import blog.straysheep.common.ResultData;
import blog.straysheep.common.PaginationResultData;
import blog.straysheep.controller.BaseController;
import blog.straysheep.dto.AdminUserDto;
import blog.straysheep.dto.ArticleDto;
import blog.straysheep.dto.PermissionDto;
import blog.straysheep.requestParam.AdminUserRequestParam;
import blog.straysheep.service.AdminUserServiceImp;
import blog.straysheep.service.ArticleServiceImp;

import javax.annotation.Resource;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

@Controller
@RequestMapping(value = "/admin")
public class AdminUserController extends BaseController {

    @Value("${baseUrl}")
    private String baseUrl;

    @Resource
    AdminUserServiceImp adminUserServiceImp = new AdminUserServiceImp();

    @Resource
    ArticleServiceImp articleServiceImp = new ArticleServiceImp();

    private static final Logger logger = LoggerFactory.getLogger(AdminUserController.class);

    @ModelAttribute
    public void populateModel(Model model) {
        model.addAttribute("baseUrl", baseUrl);

    }

    @RequestMapping(value = "/to_login")
    public String toLogin(HttpServletRequest request, Model model){

//        if(BaseController.checkLoginStatus(request)){
//            return "redirect:/";
//        }'
        if (SecurityUtils.getSubject().isAuthenticated()) {
            return "redirect:/";
        }
        return "admin_user/admin_user_login";
    }

//    @RequestMapping(value = "/login")
//    @ResponseBody
//    public ResultData login(HttpServletRequest request, String username, String password, HttpServletResponse response){
//
//        ResultData resultData = new ResultData<>();
//
//        AdminUserDto adminUserDto = adminUserServiceImp.findAdmin(username, password);
//
//        if(adminUserDto == null){
//            resultData.setCode(1);
//            resultData.setMessage("登录失败");
//            return resultData;
//        }
//
//        HttpSession session = request.getSession();
//        session.setAttribute("username", username);
//        session.setAttribute("password", password);
//
//        Cookie usernameCookie = new Cookie("username", username);
//        usernameCookie.setMaxAge(7200);
//        usernameCookie.setPath("/");
//
//        response.addCookie(usernameCookie);
//
//        Cookie[] cookies = request.getCookies();
//        System.out.println("外部的SessionId:" + session.getId());
//
////        for (Cookie cookie : cookies) {
////            if (cookie.getName().equals("JSESSIONID")) {
////                System.out.println("Cookie里边的：" + session.getId());
////                cookie.setValue(session.getId());
////                cookie.setPath("/");
////                cookie.setMaxAge(500);
////                response.addCookie(cookie);
////            }
////        }
//        return  resultData;
//    }
    @RequestMapping(value = "/login")
    @ResponseBody
    public ResultData login(HttpServletRequest request, HttpServletResponse response,
                            String username, String password, boolean rememberMe, Model model) {

        ResultData resultData = new ResultData<>();

        Subject user = SecurityUtils.getSubject();
        UsernamePasswordToken token = new UsernamePasswordToken(username, password, rememberMe);

        try {
            //shiro帮我们匹配密码什么的，我们只需要把东西传给它，它会根据我们在UserRealm里认证方法设置的来验证
            user.login(token);

            HttpSession session = request.getSession();
            session.setAttribute("username", username);
            session.setAttribute("password", password);

            Cookie usernameCookie = new Cookie("username", username);
            usernameCookie.setMaxAge(7200);
            usernameCookie.setPath("/");

            response.addCookie(usernameCookie);

            Cookie[] cookies = request.getCookies();
            System.out.println("外部的SessionId:" + session.getId());

        } catch (UnknownAccountException e) {
            //账号不存在和下面密码错误一般都合并为一个账号或密码错误，这样可以增加暴力破解难度
            resultData.setCode(1);
            resultData.setMessage("账号不存在");
        } catch (DisabledAccountException e) {
            resultData.setCode(2);
            resultData.setMessage("账号未启用！");
        } catch (IncorrectCredentialsException e) {
            resultData.setCode(3);
            resultData.setMessage("密码错误！");
        } catch (Throwable e) {
            resultData.setCode(4);
            resultData.setMessage("未知错误！");
        }
        return resultData;
    }

    @RequestMapping(value = "/logout")
    public String logout(HttpServletResponse response){

//        Cookie cookie = new Cookie("username",null);
//        cookie.setMaxAge(0);
//        cookie.setPath("/");
//        response.addCookie(cookie);
        SecurityUtils.getSubject().logout();

        return "admin_user/admin_user_login";

    }

    @RequestMapping(value = "/to_admin_user_list")
    public String toAdminUserList(HttpServletRequest request, Model model){

        return "admin_user/admin_user_list";
    }

    @RequestMapping(value = "/admin_user_list")
    @ResponseBody
    public Object getAdminUserList(HttpServletRequest request, AdminUserRequestParam aurp,
                                   @ModelAttribute("model") ModelMap model)throws Exception{
        PaginationResultData<AdminUserDto> pagination = adminUserServiceImp.selectAdminUserByPage(aurp);
        model.addAttribute("pagination", pagination);
        model.addAttribute("requestParam", aurp);

        Map<String, Object> map = pagination.convertToMap(aurp.getDraw());

        return map;
    }

    @RequestMapping(value = "/to_admin_user_create")
    @RequiresPermissions("create user")
    public String toCreateUser(HttpServletRequest request, Model model){

        List<AdminUserDto> rolesList = adminUserServiceImp.selectAllRoleName();
        model.addAttribute("rolesList", rolesList);

        return "admin_user/admin_user_create";
    }

    @RequestMapping(value = "/create_admin_user")
    @RequiresPermissions("create user")
    @ResponseBody
    public ResultData createAdminUser(@RequestBody AdminUserDto adminUserDto){

        ResultData resultData = adminUserServiceImp.createAdminUser(adminUserDto);

        return resultData;
    }

    @RequestMapping(value = "/to_admin_user_update")
    @RequiresPermissions("update user")
    public String toUpdate(HttpServletRequest request, AdminUserDto adminUserDto,
                           Model model){

        AdminUserDto adminUser = adminUserServiceImp.selectAdminUserByUserId(adminUserDto);
        List<AdminUserDto> rolesList = adminUserServiceImp.selectAllRoleName();

        model.addAttribute("adminUser", adminUser);
        model.addAttribute("rolesList", rolesList);

        return "admin_user/admin_user_update";
    }

    @RequestMapping(value = "/update_admin_user")
    @RequiresPermissions("update user")
    @ResponseBody
    public ResultData updateAdminUser(@RequestBody AdminUserDto adminUserDto){

        ResultData resultData = adminUserServiceImp.updateAdminUser(adminUserDto);

        return resultData;

    }

    @RequestMapping(value = "/delete_admin_user")
    @RequiresPermissions("delete user")
    @ResponseBody
    public ResultData deleteAdminUser(HttpServletRequest request, AdminUserDto adminUserDto){

        ResultData resultData = adminUserServiceImp.deleteAdminUser(adminUserDto);

        return resultData;
    }

    @RequestMapping(value = "/to_admin_role_list")
    public String toAdminRoleList(HttpServletRequest request){

        return "admin_user/admin_role_list";

    }

    @RequestMapping(value = "/admin_role_list")
    @ResponseBody
    public Object getAdminRoleList(HttpServletRequest request, AdminUserRequestParam aurp,
                                   @ModelAttribute("model") ModelMap model){

        PaginationResultData<AdminUserDto> pagination = adminUserServiceImp.selectAdminRoleByPage(aurp);
        model.addAttribute("pagination", pagination);
        model.addAttribute("requestParam", aurp);

        Map<String, Object> map = pagination.convertToMap(aurp.getDraw());
        return map;
    }

    @RequestMapping(value = "/to_admin_role_create")
    @RequiresPermissions("create role")
    public String toCreateRole(HttpServletRequest request){

        return "admin_user/admin_role_create";
    }

    @RequestMapping(value = "/get_permission_list")
    @ResponseBody
    public Object getPermissionList(){

        List<PermissionDto> list = adminUserServiceImp.getPermission();

        List<Map<String,Object>> data = new ArrayList<>();
        for(PermissionDto dto:list){
            Map<String,Object> map = new HashMap<>();
            map.put("id",dto.getId());
            map.put("pId",dto.getpId());
            map.put("name",dto.getPermissionName());
            data.add(map);
        }
        return data;
    }

    @RequestMapping(value = "/create_admin_role")
    @RequiresPermissions("create role")
    @ResponseBody
    public ResultData createRole(HttpServletRequest request) throws Exception {

        String jsonString = getRequestBodyAsString(request);

        ResultData resultData = adminUserServiceImp.createAdminRole(jsonString);

        return resultData;
    }

    @RequestMapping(value = "/delete_admin_role")
    @RequiresPermissions("delete role")
    @ResponseBody
    public ResultData deleteRole(HttpServletRequest request, AdminUserDto adminUserDto){

        ResultData resultData = adminUserServiceImp.deleteAdminRole(adminUserDto);
        return resultData;
    }

    @RequestMapping(value = "/to_admin_role_update")
    @RequiresPermissions("update role")
    public String toAdminRoleUpdate(HttpServletRequest request, AdminUserDto adminUserDto,
                                    Model model){

        AdminUserDto adminRole = adminUserServiceImp.selectAdminRoleByRoleId(adminUserDto);
        model.addAttribute("adminRole", adminRole);

        return "admin_user/admin_role_update";
    }

    @RequestMapping(value = "/get_permission_id_list")
    @ResponseBody
    public List getPermissionIdList(HttpServletRequest request, AdminUserDto adminUserDto){
        List permissionIdList = adminUserServiceImp.selectPermissionIdByRoleId(adminUserDto);
        return permissionIdList;
    }

    @RequestMapping(value = "/update_admin_role")
    @RequiresPermissions("update role")
    @ResponseBody
    public ResultData updateRole(HttpServletRequest request) throws Exception{

        ResultData resultData = adminUserServiceImp.updateAdminRole(request);

        return resultData;
    }

    @RequestMapping(value = "/to_admin_user_profile")
    public String myProfile(HttpServletRequest request, AdminUserDto adminUserDto,
                            Model model){

        AdminUserDto adminUser = adminUserServiceImp.selectAdminUserByUserId(adminUserDto);
        model.addAttribute("adminUser", adminUser);

        return "/admin_user/admin_user_profile";
    }

    @RequestMapping(value = "/update_profile")
    @ResponseBody
    public ResultData updateProfile(@RequestBody AdminUserDto adminUserDto){

        ResultData resultData = adminUserServiceImp.updateProfile(adminUserDto);
        return resultData;
    }

    @RequestMapping(value = "/export_excel")
    public void exportExcel(HttpServletResponse response) throws IOException {

        List<ArticleDto> articleList = articleServiceImp.selectAllArticle();
        List<AdminUserDto> adminUserList = adminUserServiceImp.selectAllUser();

        String[] articleTableHeaders = {"文章标题", "摘要", "创建者", "创建时间"};

        HSSFWorkbook workbook = new HSSFWorkbook();
        HSSFSheet sheet1 = workbook.createSheet("Sheet1");
        HSSFCellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setAlignment(HorizontalAlignment.CENTER);
        cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        sheet1.addMergedRegion(new CellRangeAddress(0, 0, 0, 3));
        HSSFRow rowOfSheet1 = sheet1.createRow(0);
        HSSFCell beginCell = rowOfSheet1.createCell(0);
        beginCell.setCellValue("文章列表");
        beginCell.setCellStyle(cellStyle);

        rowOfSheet1 = sheet1.createRow(1);
        //创建表头
        for(int i = 0; i < articleTableHeaders.length; i++){
            HSSFCell cell = rowOfSheet1.createCell(i);
            cell.setCellValue(articleTableHeaders[i]);
            cell.setCellStyle(cellStyle);
        }
        //遍历填充表格
        for(int i = 0; i < articleList.size(); i++){
            rowOfSheet1 = sheet1.createRow(i +2);

            ArticleDto article = articleList.get(i);
            rowOfSheet1.createCell(0).setCellValue(article.getTitle());
            rowOfSheet1.createCell(1).setCellValue(article.getSummary());
            rowOfSheet1.createCell(2).setCellValue(article.getNickName());
            rowOfSheet1.createCell(3).setCellValue(article.getCreateTime());
        }

        String[] adminUserTableHeaders = {"用户名", "昵称", "角色", "创建时间"};

        HSSFSheet sheet2 = workbook.createSheet("Sheet2");
        sheet2.addMergedRegion(new CellRangeAddress(0, 0, 0, 3));
        HSSFRow rowOfSheet2 = sheet2.createRow(0);
        beginCell = rowOfSheet2.createCell(0);
        beginCell.setCellValue("用户列表");
        beginCell.setCellStyle(cellStyle);

        rowOfSheet2 = sheet2.createRow(1);
        //创建表头
        for(int i = 0; i < adminUserTableHeaders.length; i++){
            HSSFCell cell = rowOfSheet2.createCell(i);
            cell.setCellValue(adminUserTableHeaders[i]);
            cell.setCellStyle(cellStyle);
        }

        for(int i = 0; i < adminUserList.size(); i++){

            rowOfSheet2 = sheet2.createRow(i+2);

            AdminUserDto adminUser = adminUserList.get(i);
            rowOfSheet2.createCell(0).setCellValue(adminUser.getUsername());
            rowOfSheet2.createCell(1).setCellValue(adminUser.getNickName());
            rowOfSheet2.createCell(2).setCellValue(adminUser.getRoleName());
            rowOfSheet2.createCell(3).setCellValue(adminUser.getCreateTime());
        }

        String fileName = URLEncoder.encode("后台管理数据表", "UTF-8");

        OutputStream outputStream = response.getOutputStream();
        response.reset();;
        response.setContentType("application/vnd.ms-excel;charset=UTF-8");
        response.setHeader("Content-disposition", "attachment;filename="+fileName+".xls");

        workbook.write(outputStream);
        outputStream.flush();
        outputStream.close();

    }

    @RequestMapping(value = "/import_excel")
    public void importExcel(@RequestParam("file") MultipartFile file)throws Exception {

        InputStream inputStream = file.getInputStream();
        BufferedInputStream bufferedInputStream = new BufferedInputStream(inputStream);

        POIFSFileSystem fileSystem = new POIFSFileSystem(bufferedInputStream);
        HSSFWorkbook workbook = new HSSFWorkbook(fileSystem);
        HSSFSheet sheet1 = workbook.getSheetAt(0);
        HSSFSheet sheet2 = workbook.getSheetAt(1);

        ExecutorService executor = Executors.newFixedThreadPool(2);

        Future<List<Map<String, Object>>> future1 = executor.submit(new Callable<List<Map<String, Object>>>() {
            @Override
            public List<Map<String, Object>> call() throws Exception {

                List<Map<String, Object>> list = new ArrayList<>();
                int lastRowNum = sheet1.getLastRowNum();

                for (int i = 2; i <= lastRowNum; i++) {
                    HSSFRow row = sheet1.getRow(i);
                    //格式化单元格数据，避免出现异常：getStringCellValue()无法获取数字
                    DataFormatter formatter = new DataFormatter();
                    String title = formatter.formatCellValue(row.getCell(0));
                    String summary = formatter.formatCellValue(row.getCell(1));
                    String creator = formatter.formatCellValue(row.getCell(2));
                    String createTime = formatter.formatCellValue(row.getCell(3));
                    Map<String, Object> map = new HashMap<>();
                    map.put("title", title);
                    map.put("summary", summary);
                    map.put("creator", creator);
                    map.put("createTime", createTime);
                    list.add(map);
                    System.out.println("标题：" + title + "；摘要：" + summary + "；创建者：" + creator + "；创建时间：" + createTime);
                }
//                Thread.sleep(5000);
                return list;
            }
        });

        List<Map<String, Object>> list1 = future1.get();
        ObjectMapper objectMapper = new ObjectMapper();
        System.out.println(objectMapper.writeValueAsString(list1));

        Future<List<Map<String, Object>>> future2 = executor.submit(new Callable<List<Map<String, Object>>>() {
            @Override
            public List<Map<String, Object>> call() throws Exception {

                List<Map<String, Object>> list = new ArrayList<>();
                int lastRowNum = sheet2.getLastRowNum();

                for(int i = 2; i <= lastRowNum; i++){
                    HSSFRow row = sheet1.getRow(i);
                    DataFormatter formatter = new DataFormatter();
                    String username = formatter.formatCellValue(row.getCell(0));
                    String nickName = formatter.formatCellValue(row.getCell(1));
                    String roleName = formatter.formatCellValue(row.getCell(2));
                    String createTime = formatter.formatCellValue(row.getCell(3));

                    Map<String, Object> map = new HashMap<>();
                    map.put("username", username);
                    map.put("nickName", nickName);
                    map.put("roleName", roleName);
                    map.put("createTime", createTime);
                    list.add(map);

                    System.out.println("用户名："+username+"；昵称："+nickName+"；角色："+roleName+"；创建时间："+createTime);
                }
                return list;
            }
        });

        List<Map<String, Object>> list = future2.get();
        System.out.println(objectMapper.writeValueAsString(list));
    }
}

