import http from "../http";

export default {
    //登录api
    login(paramas) {
        return http.post(`/api/account/auth`, paramas);
    },
    getEqpUser(paramas) {
        return http.get(`/api/equipment/user`,paramas);
    },
    getMenu() {
        return http.get(`/api/account/menu`);
    },
    // home
    getAnalysisBagage(){
        return http.get(`/api/stats/equip/bagage`);
    },
    getAnalysisDuration(){
        return http.get(`/api/stats/equip/duration`);
    },
    getStatsEqpSerie(){
        return http.get(`/api/stats/equip/eqpserie`);
    },
    getAnalysisSerie(){
        return http.get(`/api/stats/equip/serie`);
    },
    getAnalysisHealth(){
        return http.get(`/api/stats/equip/health`);
    },
    getStatsEquipDurations(){
        return http.get(`/api/stats/equip/durations`);
    },
    getStatsEquipFile(){
        return http.get(`/api/stats/equip/file`);
    },
    // 实时监控
    getEqpParameter(paramas){
        return http.get(`/api/parameter`,paramas);
    },
    getEqpParameterSet(paramas){
        return http.get(`/api/parameter/set`,paramas);
    },
    //发送数据
    getEqpFilesPublish(paramas){
        return http.get(`/api/equipment/files/publish`,paramas);
    },
};
