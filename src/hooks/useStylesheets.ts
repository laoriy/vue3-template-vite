import { ref } from 'vue';
import Styles from '@/assets/css/var.module.less';

export const useStylesheets = () => {
    const stylesheets = ref(Styles);
    return {
        stylesheets,
    };
};
