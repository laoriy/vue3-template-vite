import { GenerateFetch } from 'aqara-lib';
import ajax from '../utils/ajax';

const apis = {
    get: {
        menu_list: '/user/center/api/resources/user/menus',
        resources_list: '/user/center/api/resources/list',
    },
    post: {
        logout: '/user/center/api/user/logout',
    },
};
// 导出api请求、请求apiUrl对象
export default new GenerateFetch(apis, ajax).fetchApi();
