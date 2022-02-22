import { createApp } from 'vue';
import LoadingBar from './LoadingBar.vue';

LoadingBar.newInstance = () => {
    const Instance = createApp(LoadingBar);
    const el = document.createElement('div');
    document.body.appendChild(el);
    const component = Instance.mount(el);

    const loading_bar: any = component;
    return {
        update(options: any) {
            if ('percent' in options) {
                loading_bar.percent = options.percent;
            }
            if (options.status) {
                loading_bar.status = options.status;
            }
            if ('show' in options) {
                loading_bar.show = options.show;
            }
        },
        component: loading_bar,
        destroy() {
            document.body.removeChild(
                document.getElementsByClassName('lv-loading-bar')[0].parentNode as Node
            );
        },
    };
};

export default LoadingBar;
