package blog.straysheep.service;

import blog.straysheep.common.PaginationResultData;
import blog.straysheep.common.ResultData;
import blog.straysheep.dto.AdminUserDto;
import blog.straysheep.dto.PermissionDto;
import blog.straysheep.requestParam.AdminUserRequestParam;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface AdminUserService {

    AdminUserDto findAdmin(String username, String password);

    AdminUserDto findAdminByUsername(String username);

    PaginationResultData<AdminUserDto> selectAdminUserByPage(AdminUserRequestParam param);

    ResultData createAdminUser(AdminUserDto adminUserDto);

    ResultData deleteAdminUser(AdminUserDto adminUserDto);

    AdminUserDto selectAdminUserByUserId(AdminUserDto adminUser);

    AdminUserDto selectAdminRoleByRoleId(AdminUserDto adminUser);

    List selectPermissionIdByRoleId(AdminUserDto adminUser);

    List selectPermissionCodeByUserId(AdminUserDto adminUser);

    ResultData updateAdminUser(AdminUserDto adminUserDto);

    ResultData updateProfile(AdminUserDto adminUserDto);

    List<AdminUserDto> selectAllUser();

    List<AdminUserDto> selectAllRoleName();

    PaginationResultData<AdminUserDto> selectAdminRoleByPage(AdminUserRequestParam param);

    List<PermissionDto> getPermission();

    ResultData createAdminRole(String jsonString) throws Exception;

    ResultData updateAdminRole(HttpServletRequest request) throws Exception;

    ResultData deleteAdminRole(AdminUserDto adminUserDto);

}
