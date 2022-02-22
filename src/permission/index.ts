import { Router } from 'vue-router';
import { routerInterceptor } from './routerInterceptor';
import { requestInterceptor } from './requestInterceptor';

const interceptor = function combineProjectInterceptor(router: Router) {
    routerInterceptor(router);
    requestInterceptor();
};

export default interceptor;
