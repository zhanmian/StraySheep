package blog.straysheep.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import blog.straysheep.common.PaginationRequestParam;
import blog.straysheep.dto.AdminUserDto;
import blog.straysheep.dto.PermissionDto;
import blog.straysheep.requestParam.AdminUserRequestParam;

import java.util.List;

@Mapper
public interface AdminUserMapper {

    AdminUserDto findAdmin(@Param("username") String username, @Param("password") String password);

    AdminUserDto findAdminByUsername(@Param("username") String username);

    Integer selectTotalRecord(AdminUserRequestParam adminUserRequestParam);

    Integer selectRoleTotalRecord(AdminUserRequestParam adminUserRequestParam);

    List<AdminUserDto> selectAdminUser(PaginationRequestParam param);

    List<AdminUserDto> selectAdminRole(PaginationRequestParam param);

    List<AdminUserDto> selectAllAdminUser();

    List<AdminUserDto> selectAllAdminRole();

    List<PermissionDto> selectPermission();

    AdminUserDto selectAdminUserByUserId(AdminUserDto adminUserDto);

    AdminUserDto selectAdminRoleByRoleId(AdminUserDto adminUserDto);

    List selectPermissionIdByRoleId(AdminUserDto adminUserDto);

    List<String> selectPermissionCodeByUserId(AdminUserDto adminUserDto);

    void updateAdminUser(AdminUserDto adminUserDto);

    void updateProfile(AdminUserDto adminUserDto);

    void updateAdminUserRole(AdminUserDto adminUserDto);

    void updateAdminRole(PermissionDto permissionDto);

    void insertAdminUser(AdminUserDto adminUserDto);

    void insertAdminUserRole(AdminUserDto adminUserDto);

    void insertAdminRole(PermissionDto permissionDto);

    void insertRolePermission(PermissionDto permissionDto);

    void deleteAdminUser(AdminUserDto adminUserDto);

    void deleteAdminUserRole(AdminUserDto adminUserDto);

    void deleteAdminRole(AdminUserDto adminUserDto);

    void deleteAdminRolePermission(AdminUserDto adminUserDto);

    void deleteRolePermissionBeforeUpdate(AdminUserDto adminUserDto);

}
