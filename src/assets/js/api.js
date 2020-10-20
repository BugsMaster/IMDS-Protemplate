/* 
 * 接口库
 * 用法：import api from 'api'
 * */
import homeApi from './api/api_home';
import systemApi from './api/api_system';
import userApi from './api/api_user';

export default {
    ...homeApi,
    ...systemApi,
    ...userApi
}
