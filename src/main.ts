import { createApp } from 'vue';
import i18n from '@/locale';
import initDirectives from '@/directives';
import initComponents from '@/components';
import App from './App.vue';
import router from './router';
import store, { storeKey } from './store';
import interceptor from './permission';
import '@/assets/css/index.less';

const app = createApp(App);
initComponents(app); // 注册全局自定义组件
initDirectives(app); // 注册directives
interceptor(router); // 注册拦截器

app.use(i18n).use(store, storeKey).use(router).mount('#app');
