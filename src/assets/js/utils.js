/*
 * 工具库
 * - cookie
 * - ticket: 登陆后返回的票据
 **/
// cookie
import i18n from 'assets/i18n'
const Cookie = {
    get(name) {
        let arr;
        const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if ((arr = document.cookie.match(reg))) {
            return decodeURIComponent(arr[2]);
        } else {
            return null;
        }
    },
    set(name, value, time) {
        ///取时函数
        const getsec = str => {
            const str1 = str.substring(1, str.length) * 1;
            const str2 = str.substring(0, 1);
            return {
                s: str1 * 1000,
                h: str1 * 60 * 60 * 1000,
                d: str1 * 24 * 60 * 60 * 1000
            }[str2];
        };

        if (!time) {
            const Days = 30;
            const exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie =
                name +
                "=" +
                escape(value) +
                ";expires=" +
                exp.toGMTString() +
                "; path=/";
        } else {
            const strsec = getsec(time);
            const exp = new Date();
            exp.setTime(exp.getTime() + strsec * 1);
            document.cookie =
                name +
                "=" +
                encodeURIComponent(value) +
                ";expires=" +
                exp.toGMTString() +
                "; path=/";
        }
    },
    remove(name) {
        const exp = new Date();
        exp.setTime(exp.getTime() - 1);
        const cval = this.get(name);
        if (cval !== null)
            document.cookie =
                name +
                "=" +
                encodeURIComponent(cval) +
                ";expires=" +
                exp.toGMTString() +
                "; path=/";
    }
};

const Ticket = {
    set(value) {
        return Cookie.set("imds_ticket", JSON.stringify(value), "d1");
    },
    get() {
        const c_ticket = Cookie.get("imds_ticket");
        if (c_ticket && c_ticket!="undefined") {
            return JSON.parse(c_ticket);
        } else {
            return null;
        }
    },
    remove() {
        return Cookie.remove("imds_ticket");
    }
};

// localStorage
const Storage = {
    storage: window.localStorage,

    set(item, value) {
        return this.storage.setItem(item, JSON.stringify(value));
    },
    get(item) {
        const itemStr = this.storage.getItem(item);
        if (itemStr) {
            return JSON.parse(itemStr);
        } else {
            return null;
        }
    },
    remove(item) {
        return this.storage.removeItem(item);
    },
    clear() {
        return this.storage.clear();
    },
    keys() {
        let arr = [];
        for (let i = 0; i < window.localStorage.length; i++) {
            arr.push(window.localStorage.key(i));
        }
        return arr;
    }
};

// 正则
const Exp = {
    password:/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/,
    //工信部发文2017年第10批
    mobile: /^134[0-8]\d{7}$|^13[^4]\d{8}$|^14[5-9]\d{8}$|^15[^4]\d{8}$|^16[6]\d{8}$|^17[0-8]\d{8}$|^18[\d]{9}$|^19[8,9]\d{8}$/,
    email:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    //身份证
    idCard: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
};

// 函数节流
const Throttle = function(func, wait) {
    var context, args, timeout, result;
    var previous = 0;
    var later = function() {
        previous = new Date();
        timeout = null;
        result = func.apply(context, args);
    };
    return function() {
        var now = new Date();
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        } else if (!timeout) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
};

// 函数防抖
const Debounce = function(func, wait, immediate) {
    var timeout, result;
    return function() {
        var context = this,
            args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
};

//数组随机重新排布，underscore升级到 Fisher–Yates算法
const Shuffle = function(arr) {
    let m = arr.length;
    while (m > 1){
        let index = Math.floor(Math.random() * m--);
        [arr[m] , arr[index]] = [arr[index] , arr[m]]
    }
    return arr;
}

const formatSeconds = function(value) {
    var theTime = parseInt(value); // 秒
    var theTime1 = 0; // 分
    var theTime2 = 0; // 小时
    if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (theTime1 > 60) {
            theTime2 = parseInt(theTime1 / 60);
            theTime1 = parseInt(theTime1 % 60);
        }
    }
    var result = "" + parseInt(theTime) + i18n.t('c.second');
    if (theTime1 > 0) {
        result = "" + parseInt(theTime1) + i18n.t('c.min') + result;
    }
    if (theTime2 > 0) {
        result = "" + parseInt(theTime2) + i18n.t('c.hour') + result;
    }
    return result;
};

const deepClone = function(obj) {
    let objClone = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === "object") {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                //判断ojb子元素是否为对象，如果是，递归复制
                if (obj[key] && typeof obj[key] === "object") {
                    objClone[key] = deepClone(obj[key]);
                } else {
                    //如果不是，简单复制
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
};

const DuplicateArr=function(arr,type){
    var newArr = [];
    var tArr = [];
    if(arr.length == 0){
      return arr;
    }else{
      if(type){
        for(var i = 0; i < arr.length;i++){
          if(!tArr[arr[i][type]]){
            newArr.push(arr[i]);
            tArr[arr[i][type]] = true;
          }
        }
        return newArr;
      }else{
        for(var i = 0; i < arr.length;i++){
          if(!tArr[arr[i]]){
            newArr.push(arr[i]);
            tArr[arr[i]] = true;
          }
        }
        return newArr;
      }
    }
  }

const showChartTip={
    loading(chartInstance){
        chartInstance.showLoading("default", {
            text: '正在加载中。。。',
            textColor: '#fff',
            maskColor: "rgba(0, 0, 0, .3)"
        })
    },
    noData(chartInstance){
        chartInstance.showLoading("default", {
            text: '暂无数据',
            textColor: '#fff',
            maskColor: "rgba(0, 0, 0, .3)"
        })
    },
}
const MavesClass = function(){
	if(MavesClass.instance !== undefined){
		return MavesClass.instance;
	}
	MavesClass.instance = this;
	
	this.showWaves = function(_this,e){
        var box = $(_this);
		var wavesDiv = box.find("div");
		//第一次没有涟漪div，动态生成
		if(wavesDiv[0] == null){
			var div = "<div class='mmd-waves-effect'></div>";
			box.append(div);
			wavesDiv = box.find("div");
		}
		

		//设置按钮样式为’waves-effect‘即去掉动画样式’waves-effect-animation‘
		wavesDiv[0].className = 'mmd-waves-effect';
		
		//计算涟漪坐标（折算成左上角坐标而非中心点），涟漪大小（取外标签最长边）
		var wH = box.width() > box.height() ? box.width() : box.height();
		var iX = e.pageX - box.offset().left;
		var iY = e.pageY - box.offset().top;
		var nX = iX - wH/2;
		var nY = iY - wH/2;

		//设置涟漪div样式，准备播放动画
		wavesDiv.css({
			width: wH,
			height: wH,
			left: nX,
			top: nY
		}).addClass("mmd-waves-effect-animation");//播放动画
	}
}
export {
    Cookie,
    Ticket,
    Storage,
    Exp,
    Throttle,
    Debounce,
    Shuffle,
    formatSeconds,
    deepClone,
    DuplicateArr,
    showChartTip,
    MavesClass
}
