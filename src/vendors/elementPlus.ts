import ElementPlus from 'element-plus';
import { App } from 'vue';

export default (app: App) => {
    app.use(ElementPlus, {
        size: 'default',
    });
};
