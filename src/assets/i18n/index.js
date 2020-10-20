import Vue from 'vue';
import VueI18n from 'vue-i18n'
import enLang from './en'
import zhLang from './zh'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(VueI18n);

let locale = window.localStorage.getItem('lang') || 'zh';
if(locale.length == 4){
    locale = JSON.parse(locale);
}

export default new VueI18n({
    locale,
    messages: {
        'en': Object.assign(enLang, enLocale),
        'zh': Object.assign(zhLang, zhLocale),
    },
});
