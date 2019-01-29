package blog.straysheep.dao;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import blog.straysheep.dto.AdminUserDto;
import blog.straysheep.service.AdminUserServiceImp;

import java.util.List;

public class ShiroRealm extends AuthorizingRealm {

    @Autowired
    AdminUserServiceImp adminUserServiceImp;
    @Autowired
    AdminUserMapper adminUserMapper;
    //认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken)
            throws AuthenticationException {

        UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;

        String username = token.getUsername();

        AdminUserDto adminUserDto = adminUserServiceImp.findAdminByUsername(username);

        if(adminUserDto == null){
            return null;
        }

        ByteSource salt = ByteSource.Util.bytes(username);

        SimpleAuthenticationInfo userInfo = new SimpleAuthenticationInfo(
                adminUserDto.getUsername(),
                adminUserDto.getPassword(),
                salt,
                getName()
        );

        return userInfo;
    }
    //授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals){

        String username = (String) SecurityUtils.getSubject().getPrincipal();
        AdminUserDto adminUserDto = adminUserServiceImp.findAdminByUsername(username);
        List<String> permissions = adminUserServiceImp.selectPermissionCodeByUserId(adminUserDto);

        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        authorizationInfo.addStringPermissions(permissions);

        return authorizationInfo;
    }
}
