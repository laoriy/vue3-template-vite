import { RouteTree } from './types';

const Layout = () => import('@/layout');
const Page403 = () => import('@/views/error-page/403.vue');
const Page404 = () => import('@/views/error-page/404.vue');
const Page500 = () => import('@/views/error-page/500.vue');
const Home = () => import('@/views/home/index.vue');

// Route white list
export default <RouteTree[]>[
    {
        path: '/',
        name: 'home',
        component: Home,
        code: 'home',
    },
    {
        path: '/error',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '403',
                name: 'error-403',
                component: Page403,
                meta: {
                    hideSidebar: true,
                    title: 'error-403',
                    showBreadcrumb: false,
                },
            },
            {
                path: '404',
                name: 'error-404',
                component: Page404,
                meta: {
                    hideSidebar: true,
                    title: 'error-404',
                    showBreadcrumb: false,
                },
            },
            {
                path: '500',
                name: 'error-500',
                component: Page500,
                meta: {
                    hideSidebar: true,
                    title: 'error-500',
                    showBreadcrumb: false,
                },
            },
        ],
    },
];
