import Vue from 'vue'
import App from './App.vue'
import store from './vuex'
import router from 'router'

//考虑到可能的项目迁移，引入element-ui
// import 'element-ui/lib/theme-chalk/index.css';
import 'style/theme/index.css';
import ElementUI from 'element-ui';
Vue.use(ElementUI);
// 多语言
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);
import i18n from 'assets/i18n';
Vue.use(ElementUI, {
    i18n: (key, value) => i18n.t(key, value)
});

//表格
import { DataTables} from 'vue-data-tables';//https://njleonzhang.github.io/vue-data-tables/#/?id=vue-data-tables
Vue.use(DataTables);
//图片查看器
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
// 下载
import uploader from 'vue-simple-uploader';
Vue.use(uploader);
// 适配
import 'assets/js/lib/rem';

// dataV
import dataV from '@jiaminghi/data-view'
Vue.use(dataV);

//去掉提示
Vue.config.productionTip = false;
new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');

setTimeout(()=>{
    $("#loader-wrapper").hide();
},1200);

router.afterEach((to, from) => {
    $(".loadpro_box").show(0,function(){
        $("#loadbar").animate({width:"100%"}, 1000,"swing",function(){
            $(this).css("width",0);
            $(".loadpro_box").hide();
        });
    });
})