import http from '../http';

export default  {
    getUserTypeMenu() {
        return http.get(`/api/user/usertype`);
    },
    //级联选择器
    getEqpSeries() {
        return http.get(`/api/equipment/series`);
    },
    //级联选择器
    getPlaceTree() {
        return http.get(`/api/place/tree`);
    },
    //级联选择器 位置设备
    getPlaceEqps() {
        return http.get(`/api/place/equips`);
    },
    //上传专题============================
    putFileuploadDoc(paramas) {
        return http.put(`/api/file/upload/doc`,paramas);
    },
};
