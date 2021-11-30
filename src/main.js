import { createApp } from 'vue';
// 匯入 vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// 匯入讀取效果 vue-loading-overlay
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// 匯入千分位逗號
import { currency } from './methods/filters';

import App from './App.vue';
import router from './router';

const app = createApp(App);
// 註冊 vue-axios
app.use(VueAxios, axios);
// 註冊讀取效果 vue-loading-overlay
app.component('Loading', Loading);
// 註冊千分位逗號|Global
app.config.globalProperties.$filters = {
  currency,
};
app.use(router);
app.mount('#app');
