import { createApp } from 'vue';
import i18n from '@/locale';
import initDirectives from '@/directives';
import App from './App.vue';
import router from './router';
import store, { storeKey } from './store';
import interceptor from './permission';
import '@/assets/css/index.less';
import 'virtual:svg-icons-register';

const app = createApp(App);
initDirectives(app); // 注册directives
interceptor(router); // 注册拦截器

app.use(i18n).use(store, storeKey).use(router).mount('#app');
