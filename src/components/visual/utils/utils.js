/*
 * 工具库
 **/
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
export {
    Throttle,
    Debounce,
    Shuffle,
    formatSeconds,
    deepClone,
    DuplicateArr,
    showChartTip
}
