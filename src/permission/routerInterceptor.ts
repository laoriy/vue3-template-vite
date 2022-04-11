import {
    RouteRecord,
    Router,
    RouteLocationNormalized,
    NavigationGuardNext,
    RouteRecordRaw,
} from 'vue-router';
import { getToken, goUcLogin } from 'uc-lib';
import store from '@/store';
import getPageTitle from '@/layout/helpers/getPageTitle';
import { ModulesNames, UserModule, PermissionModule } from '@/store/mutation-types';

// interface Next {
//     (to?: any): void;
// }

const isProEnv = import.meta.env.PROD;

// router whitelist
// 带落地页admin统一路由path `/`为落地页
const whiteList = ['/'];

const redirectToHome = function redirectToHomePath(next: NavigationGuardNext) {
    // filter no access routes
    const accessRoutes = store.getters.addRoutes.filter((route: RouteRecord) => {
        const { meta: { noAceess = false } = {} } = route;
        return !noAceess;
    });
    const [{ redirect = '' }] = accessRoutes;
    const path = redirect.length > 0 ? redirect : '/error/403';
    next({ path });
};

const generateAccessMenus = async (
    router: Router,
    to: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    try {
        // get user menus
        const { menus } = await store.dispatch(
            `${ModulesNames.User}/${UserModule.GetUserMenusAction}`
        );

        // get user access operate
        // await store.dispatch('user/getUserOperators');

        // generate accessible routes map based on menus
        const accessRoutes = await store.dispatch(
            `${ModulesNames.Permission}/${PermissionModule.GenerateRoutesAction}`,
            menus
        );

        // dynamically add accessible routes
        accessRoutes.forEach((route: RouteRecordRaw) => {
            router.addRoute(route);
        });

        // hack method to ensure that addRoutes is complete
        // set the replace: true, so the navigation will not leave a history record
        next({ ...to, replace: true });
    } catch (error) {
        // remove token and go to login page to re-login
        console.log(error);
        await store.dispatch(`${ModulesNames.User}/${UserModule.ResetTokenAction}`);
        next('/');
    }
};

const handleHasAccessMenus = (to: RouteLocationNormalized, next: NavigationGuardNext) => {
    // recirect the path '/' to 'home path'
    const isRedirectToHome = store.getters.isRedirectToHome || false;
    // redirect special path
    const isNoAceess = to.meta.noAceess || false;
    const singleReg = /^\/(\S*?)\/$/;
    const isNeedRedirectToHome = to.path === '/' && isRedirectToHome;
    const isNeedRedirectTo404 = to.path !== '/' && to.matched.length === 0;
    const isNeedRedirectTo403 = isNoAceess && to.path !== '/error/403';
    const isNeedRewritePath = singleReg.test(to.path);

    if (isNeedRedirectToHome) {
        redirectToHome(next);
    } else if (isNeedRedirectTo404) {
        next({ path: '/error/404' });
    } else if (isNeedRedirectTo403) {
        next({ path: '/error/403' });
    } else if (isNeedRewritePath) {
        // When the page is refreshed, the path needs to be rewritten
        // example: /abc/' to '/abc'
        const rewritePath = to.path.replace(singleReg, (_match: string, p1: string) => `/${p1}`);
        next({ path: rewritePath, query: to.query, params: to.params });
    } else {
        next();
    }
};

// router interceptor
const routerInterceptor = function routerJumpInterceptor(router: Router) {
    router.beforeEach((to, _from, next) => {
        // set page title
        document.title = getPageTitle(to.meta.title as string);
        const hasToken = getToken();

        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else if (hasToken) {
            isProEnv && window.sensors && window.sensors.login(hasToken);

            const hasMenus = store.getters.menus?.length > 0;
            !hasMenus && generateAccessMenus(router, to, next);
            hasMenus && handleHasAccessMenus(to, next);
        } else {
            goUcLogin();
        }
    });
};

export { routerInterceptor };
