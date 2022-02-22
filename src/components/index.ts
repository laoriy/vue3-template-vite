import { App } from 'vue';
import SvgIcon from './svg-icon/index.vue';

const components = { [SvgIcon.name]: SvgIcon };

export default (app: App) => {
    Object.keys(components).forEach((name) => {
        app.component(name, components[name]);
    });
};
