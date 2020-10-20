import qs from "qs";
import { Storage,Ticket } from "./utils";
import router from '../../router';
import Config from "assets/js/config";
import { whiteAPIUrl,whiteRouterUrl } from "./lib/whitelist";
import i18n from 'assets/i18n';
import { Message } from "element-ui";

let fly = require("flyio");
//定义公共headers
fly.config = {
    headers:{
        'Content-Type':'application/json'
    },
	params: {
		culture: i18n.locale
    },
    timeout : 15000,
    baseURL : Config.apiUrl,
};
//添加请求拦截器
fly.interceptors.request.use((request) => {
    //打印出请求体
	console.log("请求地址: ",request.url,"发送参数: ",request);
    //白名单
    let isInWhiteList = whiteRouterUrl.some(function (val) {
        return request.url.indexOf(val)>-1;
    });
    if(!isInWhiteList){
        const userData = Ticket.get();
        let pathname = window.location.pathname;
        if (pathname != "/" && pathname != "/login" && userData == null) {
            //用户信息失效
            router.push({ name: '401' });
            return;
        }
    }
    const cookie = Ticket.get();
	if (cookie) {
		request.headers["Authorization"] = "Bearer "+cookie;
	}else{
        request.headers["Authorization"] = null;
    }
	//可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
	return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
	response => {
        if (response.status !=200) {
            Message({ message:"服务返回错误", duration: 2000 });
            return Promise.reject(response);
        }
        let result = JSON.parse(response.data);
        let message = result.msg;
        if(result.result){
            if(message.length){
                Message({ message: message, duration: 2000,type: 'success'})
            }
        }else{
            if(message.length){
                Message({ message: message, duration: 2000,type: 'error'});
            }
        }
        return result.data;
	},
	(error) => {
        if (error.response && error.response.status === 401) {
            Ticket.remove();
            Storage.clear();
            // 白名单判断
            let pathname = window.location.pathname;
            let isInWhiteList = whiteRouterUrl.some(function (val) {
                return pathname.indexOf(val)>-1;
            });
            if(!isInWhiteList){
                router.push({ name: '401' });
            }else{
                Message({ message: error.response.data.msg, duration: 2000,type: 'warning',
                    onClose:function(){
                        window.location.reload();  
                    }
                });
            }
            return;
        }
        if(error && error.status == 0){
            Ticket.remove();
            Storage.clear();
            router.push({ name: '401' });
            return;
        }
        if (error.response && error.response.status === 404) {
            router.push({ name: '404' });
            return;
        }
        if (error.code == "ECONNABORTED"){
            Message({ message: "timeout", duration: 2000 });
            return;
        }
        Message({ message: "server error", duration: 2000 });
        return Promise.reject(error);
	}
);
export default {
	get(url, data = {}, options = {}) {
        fly.config.headers['Content-Type']='application/json';
        data = qs.stringify(data, { indices: false });
		return new Promise((resolve, reject) => {
			fly.get(url,data,options)
				.then(function(response) {
					resolve(response);
				})
				.catch(function(error) {
                    reject(error);
				});
		});
	},
	post(url, data = {},options = {}) {
        //给请求添加自定义header   
	    switch (options.contentType){
	    	case 'form':
                fly.config.headers['Content-Type']='application/x-www-form-urlencoded;charset=utf-8';
                data = qs.stringify(data, { indices: false });
	    		break;
	    	case 'file':
                fly.config.headers['Content-Type']='multipart/form-data';
	    		break;
	    	default:
                fly.config.headers['Content-Type']='application/json';
                data = JSON.stringify(data);
	    		break;
        }
		return new Promise((resolve, reject) => {
			fly.post(url,data,options)
				.then(response => {
					resolve(response);
				})
				.catch(error => {
					reject(error);
				});
		});
	},
	put(url, data = {},options = {}) {
        //给请求添加自定义header  
	    switch (options.contentType){
            case 'form':
                fly.config.headers['Content-Type']='application/x-www-form-urlencoded;charset=utf-8';
                data = qs.stringify(data, { indices: false });
	    		break;
	    	case 'file':
                fly.config.headers['Content-Type']='multipart/form-data';
	    		break;
	    	default:
                fly.config.headers['Content-Type']='application/json';
                data = JSON.stringify(data);
	    		break;
        }
		return new Promise((resolve, reject) => {
			fly.put(url,data,options)
				.then(response => {
					resolve(response);
				})
				.catch(error => {
					reject(error);
				});
		});
    },
    delete(url,data, options = {}) {
		return new Promise((resolve, reject) => {
			fly.delete(url,data,options)
				.then(function(response) {
					resolve(response);
				})
				.catch(function(error) {
                    reject(error);
				});
		});
	}
}

