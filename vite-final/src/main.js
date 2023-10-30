


import { createApp } from 'vue'


// 引入 VeeValidate 元件跟功能


import { LoadingPlugin } from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/all.scss'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {
 Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
// 引入 VeeValidate 的驗證規則
import AllRules from '@vee-validate/rules';
// 引入 VeeValidate 的 i18n 功能
import { localize, setLocale } from '@vee-validate/i18n';
    // 引入 VeeValidate 的繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue'
import router from './router'


Object.keys(AllRules).forEach((rule) => {
    defineRule(rule, AllRules[rule]);
});

configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true,
});
setLocale('zh_TW');
const app = createApp(App)

app.use(VueAxios, axios)
app.use(createPinia())
app.use(LoadingPlugin, {
    color: '#956134',
    loader: 'bars',
    fullpage: true
})
app.use(router)
app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);
app.component('productModal', )
app.component('product-modal',{
    props:['tempProduct','updateProduct'],
    template: "#product-modal-template",
});
app.mount('#app')
