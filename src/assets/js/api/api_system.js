import http from "../http";

export default {
    //系统设置
    getSystemInfo() {
        return http.get(`/api/setting`);
    },
    putSystemInfo(paramas) {
        return http.put(`/api/setting`,paramas);
    },
    //用户管理
    getUserList(paramas) {
        return http.get(`/api/user`,paramas);
    },
    postUser(paramas) {
        return http.post(`/api/user`,paramas);
    },
    putUser(user_id,paramas) {
        return http.put(`/api/user/${user_id}`,paramas);
    },
    deleteUser(user_id) {
        return http.delete(`/api/user/${user_id}`);
    },
    getPermissionTree() {
        return http.get(`/api/permission/tree`);
    },
    getUserRoles() {
        return http.get(`/api/user/roles`);
    },
    putUserRoles(user_id,paramas) {
        return http.put(`/api/user/roles/${user_id}`,paramas);
    },
    //重置密码
    putResetpwd(user_id) {
        return http.put(`/api/user/resetpwd/${user_id}`);
    },
    //菜单管理
    getMenuList() {
        return http.get(`/api/menu`);
    },
    getMenuData(menu_id) {
        return http.get(`/api/menu/${menu_id}`);
    },
    putMenu(menu_id,params){
        return http.put(`/api/menu/${menu_id}`,params);
    },
    //权限管理
    getPermissionList(params) {
        return http.get(`/api/permission`,params);
    },
    getMenuTree() {
        return http.get("/api/permission/tree");
    },
    getMenuInfo(permission_id) {
        return http.get(`/api/permission/${permission_id}`);
    },
    putMenuInfo(permission_id,params) {
        return http.put(`/api/permission/${permission_id}`,params);
    },
    getPermissionExclusion() {
        return http.get(`/api/permission/exclusion`);
    },
    //角色权限分配
    postUserRoles(user_id,paramas){
        return http.post(`/api/user/roles/${user_id}`,paramas);
    },
    putRoleMembers(role_id, paramas) {
        return http.put(`/api/role/members/${role_id}`, paramas);
    },
    //角色管理
    getRoleList(params) {
        return http.get("/api/role",params);
    },
    putRoleInfo(role_id,params) {
        return http.put(`/api/role/${role_id}`,params);
    },
    postRoleInfo(params) {
        return http.post(`/api/role`,params);
    },
    deleteRole(role_id) {
        return http.delete(`/api/role/${role_id}`);
    },
    //组织管理
    getOrganizationEqpList(org_id) {
        return http.get(`/api/organization/${org_id}/equipments`);
    },
    //角色权限控制
    getRolePermissions(role_id) {
        return http.get(`/api/role/permissions/${role_id}`);
    },
    putRolePermissions(role_id,params) {
        return http.put(`/api/role/permissions/${role_id}`,params);
    },
    //==============================组织管理相关
    //更删改查组
    postOrganization(paramas) {
        return http.post("/api/organization", paramas);
    },
    deleteOrganization(groupID,paramas) {
        return http.delete(`/api/organization/${groupID}`,paramas);
    },
    putOrganization(groupID,paramas) {
        return http.put(`/api/organization/${groupID}`,paramas);
    },
    //获取工作组结构树
    getGroupTree() {
        return http.get(`/api/organization`);
    },
    //获取组成员//获取配置成员
    getGroupUsers(paramas) {
        return http.get(`/api/user`,paramas);
    },
    //添加用户组成员/更新组成员
    putGroupUsers(org_id,paramas) {
        return http.put(`/api/organization/users/${org_id}`,paramas);
    },
    //移动人员
    putUsersMove(org_id,paramas) {
        return http.put(`/api/organization/users/move/${org_id}`,paramas);
    },
    //获取当前组设备获取当前组及其子组设备
    getGroupEqps(paramas) {
        return http.get(`/api/equipment`,paramas);
    },
    //分配设备
    putGroupEqps(org_id,paramas) {
        return http.put(`/api/organization/equipments/${org_id}`,paramas);
    },
    //移动设备
    putDeviceMove(org_id,paramas) {
        return http.put(`/api/organization/equipments/move/${org_id}`,paramas);
    },
    //运维组管理=================================================
    getGroupList(paramas) {
        return http.get(`/api/group`,paramas);
    },
    postGroup(paramas) {
        return http.post(`/api/group`,paramas);
    },
    putGroup(group_id,paramas) {
        return http.put(`/api/group/${group_id}`,paramas);
    },
    deleteGroup(group_id) {
        return http.delete(`/api/group/${group_id}`);
    },
    putOperationGroupUsers(group_id,paramas) {
        return http.put(`/api/group/users/${group_id}`,paramas);
    },
    putOperationGroupEqps(group_id,paramas) {
        return http.put(`/api/group/equipments/${group_id}`,paramas);
    },
    //设备管理相关==========================================================================
    // 查询(已认证)设备列表
    getEqpListDevicemanager(paramas) {
        return http.get(`/api/equipment`,paramas);
    },
    // 创建设备
    postEqp(paramas) {
        return http.post(`/api/equipment`,paramas);
    },
    putEqp(eqp_id,paramas) {
        return http.put(`/api/equipment/${eqp_id}`,paramas);
    },
    // 认证设备
    postEqpAuth(eqp_id,paramas) {
        return http.post(`/api/equipment/auth/${eqp_id}`,paramas);
    },
    // 删除设备
    deleteEqp(eqp_id){
        return http.delete(`/api/equipment/${eqp_id}`);
    },
    // 恢复设备
    putEqpRecovery(eqp_id) {
        return http.put(`/api/equipment/recovery/${eqp_id}`);
    },
};
