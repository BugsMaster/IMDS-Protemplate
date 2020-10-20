import http from '../http';

export default  {
    //用户相关
    getUserInfo(user_id){
        return http.get(`/api/user/${user_id}`);
    },
    getSms(mobile){
        return http.get(`/api/sms/${mobile}`);
    },
    postBindmobile(mobile,paramas){
        return http.post(`/api/user/bindmobile/${mobile}`,paramas);
    },
    postAuthpassword(paramas){
        return http.post(`/api/account/auth/password`,paramas);
    },
    // 修改密码
    putChangepwd(paramas) {
        return http.put(`/api/user/changepwd`, paramas);
    },
};
