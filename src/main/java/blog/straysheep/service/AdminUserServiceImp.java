package blog.straysheep.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.util.ByteSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import blog.straysheep.common.ResultData;
import blog.straysheep.common.CommonException;
import blog.straysheep.common.PaginationResultData;
import blog.straysheep.dao.AdminUserMapper;
import blog.straysheep.dto.AdminUserDto;
import blog.straysheep.dto.PermissionDto;
import blog.straysheep.requestParam.AdminUserRequestParam;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import static blog.straysheep.controller.BaseController.getRequestBodyAsString;

@Service
@Component
public class AdminUserServiceImp implements AdminUserService {

    @Resource
    private AdminUserMapper adminUserMapper;

    private static final Logger logger = LoggerFactory.getLogger(AdminUserServiceImp.class);

    @Override
    public AdminUserDto findAdmin(String username, String password){
        ResultData resultData = new ResultData();

        AdminUserDto adminUser = adminUserMapper.findAdmin(username, password);

        if(adminUser != null){
            return adminUser;
        }

        return null;
    }
    @Override
    public AdminUserDto findAdminByUsername(String username){
        ResultData resultData = new ResultData();

        AdminUserDto adminUser = adminUserMapper.findAdminByUsername(username);

        if(adminUser != null){
            return adminUser;
        }

        return null;
    }

    public AdminUserDto findNickNameByUsername(String username){

        AdminUserDto adminUserDto = adminUserMapper.findAdminByUsername(username);

        return adminUserDto;

    }

    @Override
    public PaginationResultData<AdminUserDto> selectAdminUserByPage(AdminUserRequestParam param) {

        PaginationResultData<AdminUserDto> resultData = new PaginationResultData<>();

        int totalRecord = adminUserMapper.selectTotalRecord(param);

        resultData.calc(param.getPage(),param.getPageSize(),totalRecord);

        List<AdminUserDto> list = adminUserMapper.selectAdminUser(param);

        resultData.setList(list);

        return resultData;
    }

    @Override
    @Transactional
    public ResultData createAdminUser(AdminUserDto adminUserDto) {
        ResultData resultData = new ResultData();

        String username = adminUserDto.getUsername();
        String password = adminUserDto.getPassword();
        //使用用户名作为盐值
        ByteSource salt = ByteSource.Util.bytes(username);
        //toHex()将加密后的密码转换为String
        String pwd = new SimpleHash("MD5", password, salt, 1024).toHex();

        adminUserDto.setPassword(pwd);

        try {
            if (StringUtils.isBlank(adminUserDto.getUsername())) {
                throw new CommonException(2000, "错误参数：用户名不能为空");
            }

            AdminUserDto adminUser = adminUserMapper.findAdminByUsername(adminUserDto.getUsername());
            if(adminUser!=null){
                throw new CommonException(2001, "错误参数：用户名重复");
            }

            adminUserMapper.insertAdminUser(adminUserDto);
            adminUserMapper.insertAdminUserRole(adminUserDto);

            resultData.setMessage("新建用户成功！");

        } catch (CommonException e) {
            e.printStackTrace();
            throw new CommonException(e.getCode(), e.getMessage());

        } catch (Exception e) {
            e.printStackTrace();
            throw new CommonException();
        }
        return resultData;
    }

    @Override
    public AdminUserDto selectAdminUserByUserId(AdminUserDto adminUser){
        AdminUserDto adminUserDto = adminUserMapper.selectAdminUserByUserId(adminUser);
        return adminUserDto;
    }

    @Override
    public AdminUserDto selectAdminRoleByRoleId(AdminUserDto adminUser){
        AdminUserDto adminUserDto = adminUserMapper.selectAdminRoleByRoleId(adminUser);
        return adminUserDto;
    }

    @Override
    public List selectPermissionIdByRoleId(AdminUserDto adminUser){
        List permissionIdList = adminUserMapper.selectPermissionIdByRoleId(adminUser);
        return permissionIdList;
    }

    @Override
    public List<String> selectPermissionCodeByUserId(AdminUserDto adminUser){
        List<String> permissionIdList = adminUserMapper.selectPermissionCodeByUserId(adminUser);
        return permissionIdList;
    }


    @Override
    @Transactional
    public ResultData updateAdminUser(AdminUserDto adminUserDto){

        ResultData resultData = new ResultData();

        try{

            adminUserMapper.updateAdminUser(adminUserDto);
            adminUserMapper.updateAdminUserRole(adminUserDto);

            resultData.setMessage("更新成功！");

        }catch(CommonException e){
            e.printStackTrace();
            throw new CommonException(e.getCode(), e.getMessage());

        }catch(Exception e){
            e.printStackTrace();
            throw new CommonException();
        }

        return resultData;
    }

    @Override
    @Transactional
    public ResultData updateProfile(AdminUserDto adminUserDto){

        ResultData resultData = new ResultData();

        String username = adminUserDto.getUsername();
        String password = adminUserDto.getPassword();
        //使用用户名作为盐值
        ByteSource salt = ByteSource.Util.bytes(username);
        //toHex()将加密后的密码转换为String
        String pwd = new SimpleHash("MD5", password, salt, 1024).toHex();

        adminUserDto.setPassword(pwd);

        try{
            adminUserMapper.updateProfile(adminUserDto);
            resultData.setMessage("更新成功！");

        }catch(CommonException e){
            e.printStackTrace();
            throw new CommonException(e.getCode(), e.getMessage());

        }catch(Exception e){
            e.printStackTrace();
            throw new CommonException();
        }

        return resultData;
    }

    @Override
    @Transactional
    public ResultData deleteAdminUser(AdminUserDto adminUserDto){

        ResultData resultData = new ResultData();

        try{
            adminUserMapper.deleteAdminUser(adminUserDto);
            adminUserMapper.deleteAdminUserRole(adminUserDto);
            resultData.setMessage("删除成功！");

        }catch(CommonException e){
            e.printStackTrace();
            throw new CommonException(e.getCode(), e.getMessage());

        }catch(Exception e){
            e.printStackTrace();
            throw new CommonException();
        }

        return resultData;
    }

    @Override
    public List<AdminUserDto> selectAllUser(){

        List<AdminUserDto> list = adminUserMapper.selectAllAdminUser();

        return list;
    }

    @Override
    public List<AdminUserDto> selectAllRoleName(){

        List<AdminUserDto> list = adminUserMapper.selectAllAdminRole();

        return list;
    }

    @Override
    public PaginationResultData<AdminUserDto> selectAdminRoleByPage(AdminUserRequestParam param) {

        PaginationResultData<AdminUserDto> resultData = new PaginationResultData<>();

        int totalRecord = adminUserMapper.selectRoleTotalRecord(param);

        resultData.calc(param.getPage(),param.getPageSize(),totalRecord);

        List<AdminUserDto> list = adminUserMapper.selectAdminRole(param);

        resultData.setList(list);

        return resultData;
    }

    @Override
    public List<PermissionDto> getPermission(){

        List<PermissionDto> list = adminUserMapper.selectPermission();

        return list;
    }

    @Override
    @Transactional
    public ResultData createAdminRole(String jsonString) throws Exception {

//        String jsonString = getRequestBodyAsString(request);

        //Json字符串转换成JsonNode对象
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonTree = mapper.readTree(jsonString);

        String roleName = jsonTree.get("roleName").asText();
        PermissionDto roleNamePermissionDto = new PermissionDto();
        roleNamePermissionDto.setRoleName(roleName);

        List<PermissionDto> list = new ArrayList<>();

        //将Json嵌套对象里的nodes数组取出并转换成JsonNode对象
        JsonNode nodesTree = jsonTree.get("nodes");
        //遍历nodesTree
        Iterator<JsonNode> iterator = nodesTree.iterator();

        while(iterator.hasNext()){

            JsonNode nodes = iterator.next();
            PermissionDto permissionDto = new PermissionDto();

            Integer id = nodes.get("id").asInt();
            String name = nodes.get("name").asText();

            permissionDto.setId(id);
            permissionDto.setPermissionName(name);

            list.add(permissionDto);
        }

        ResultData resultData = new ResultData();

        try {
            if (StringUtils.isBlank(roleNamePermissionDto.getRoleName())) {
                throw new CommonException(2000, "错误参数：角色名为空");
            }
            adminUserMapper.insertAdminRole(roleNamePermissionDto);

            Iterator<PermissionDto> listIterator = list.iterator();

            while (listIterator.hasNext()) {
                PermissionDto permissionDto = listIterator.next();

                if (permissionDto.getId()==null) {
                    throw new CommonException(2001, "错误参数：权限为空");
                }

                permissionDto.setRoleId(roleNamePermissionDto.getRoleId());
                adminUserMapper.insertRolePermission(permissionDto);

            }
            resultData.setMessage("新建角色成功！");

        } catch (CommonException e) {
            e.printStackTrace();
            throw new CommonException(e.getCode(), e.getMessage());

        }catch(Exception e){
            e.printStackTrace();
            throw new CommonException();

        }
        return resultData;
    }

    @Override
    @Transactional
    public ResultData deleteAdminRole(AdminUserDto adminUserDto){

        ResultData resultData = new ResultData();

        try{
            adminUserMapper.deleteAdminRole(adminUserDto);
            adminUserMapper.deleteAdminRolePermission(adminUserDto);
            resultData.setMessage("删除成功！");

        }catch(CommonException e){
            e.printStackTrace();
            throw new CommonException(e.getCode(), e.getMessage());

        }catch(Exception e){
            e.printStackTrace();
            throw new CommonException();
        }

        return resultData;
    }

    @Override
    @Transactional
    public ResultData updateAdminRole(HttpServletRequest request) throws Exception{

        String jsonString = getRequestBodyAsString(request);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonTree = objectMapper.readTree(jsonString);

        Integer roleId = jsonTree.get("roleId").asInt();
        String roleName = jsonTree.get("roleName").asText();
        PermissionDto roleNamePermissionDto = new PermissionDto();
        roleNamePermissionDto.setRoleId(roleId);
        roleNamePermissionDto.setRoleName(roleName);

        List<PermissionDto> list = new ArrayList<>();

        JsonNode nodesTree = jsonTree.get("nodes");
        Iterator<JsonNode> nodesIterator = nodesTree.iterator();

        while(nodesIterator.hasNext()){
            JsonNode nodes = nodesIterator.next();

            PermissionDto permissionDto = new PermissionDto();

            Integer id = nodes.get("id").asInt();
            String permissionName = nodes.get("name").asText();

            permissionDto.setId(id);
            permissionDto.setPermissionName(permissionName);

            list.add(permissionDto);
        }

        ResultData resultData = new ResultData();

        try{
            if(StringUtils.isBlank(roleNamePermissionDto.getRoleName())){
                throw new CommonException(3000, "角色名不能为空");
            }
            adminUserMapper.updateAdminRole(roleNamePermissionDto);

            Iterator<PermissionDto> listIterator = list.iterator();
            //先删除原有的role-permission再插入新的数据
            //不能放在遍历的循环体中，会重复执行删除刚刚插入的数据
            adminUserMapper.deleteRolePermissionBeforeUpdate(roleNamePermissionDto);

            while(listIterator.hasNext()){
                PermissionDto permissionDto = listIterator.next();

                if(StringUtils.isBlank(permissionDto.getPermissionName())){
                    throw new CommonException(3001, "权限不能为空");
                }

                permissionDto.setRoleId(roleNamePermissionDto.getRoleId());
                adminUserMapper.insertRolePermission(permissionDto);
            }
            resultData.setMessage("更新成功！");

        }catch(CommonException e){
            e.printStackTrace();
            throw new CommonException(e.getCode(), e.getMessage());

        }catch(Exception e){
            e.printStackTrace();
            throw new CommonException();
        }
        return resultData;
    }
}

