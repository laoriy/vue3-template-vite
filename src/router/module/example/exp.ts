import { RouteTree } from '../../types';

const Layout = () => import('@/layout/index.vue');
const Button = () => import('@/views/permission-page/ButtonPermission.vue');
const Module = () => import('@/views/permission-page/ModulePermission.vue');

export default <RouteTree[]>[
    {
        path: '/permission',
        component: Layout,
        // 控制面包屑点击时跳转子路由
        redirect: '/permission/button',
        code: 'permission',
        index: 3,
        name: 'Permission',
        alwaysShow: true,
        meta: {
            title: '元素权限',
            icon: 'nav_label',
        },
        children: [
            {
                path: 'button',
                code: 'button',
                name: 'Button',
                component: Button,
                meta: {
                    title: '按钮权限',
                    icon: 'nav_label',
                    showBreadcrumb: false,
                },
            },
            {
                path: 'module',
                code: 'module',
                name: 'Module',
                component: Module,
                meta: {
                    title: '模块权限',
                },
            },
        ],
    },
];
