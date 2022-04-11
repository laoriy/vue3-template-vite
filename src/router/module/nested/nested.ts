import { RouteTree } from '../../types';

const Layout = () => import('@/layout');
const M1 = () => import('@/views/nested/m-1/index.vue');
const M11 = () => import('@/views/nested/m-1/m-1-1/index.vue');
const M12 = () => import('@/views/nested/m-1/m-1-2/index.vue');
const M121 = () => import('@/views/nested/m-1/m-1-2/m-1-2-1/index.vue');
const M122 = () => import('@/views/nested/m-1/m-1-2/m-1-2-2/index.vue');
const M13 = () => import('@/views/nested/m-1/m-1-3/index.vue');
const M2 = () => import('@/views/nested/m-2/index.vue');

export default <RouteTree[]>[
    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/m-2',
        code: 'nested',
        index: 2,
        name: 'Nested',
        alwaysShow: true,
        meta: {
            title: '多级嵌套菜单',
            icon: 'nav-label',
        },
        children: [
            {
                path: 'm-1',
                // Parent router-view
                component: M1,
                redirect: '/nested/m-2',
                code: 'm-1',
                name: 'm-1',
                meta: {
                    title: 'm-1',
                    icon: 'nav-label',
                },
                children: [
                    {
                        path: 'm-1-1',
                        component: M11,
                        code: 'm-1-1',
                        name: 'm-1-1',
                        meta: {
                            title: 'm-1-1',
                            icon: 'nav-label',
                        },
                    },
                    {
                        path: 'm-1-2',
                        component: M12,
                        redirect: '/nested/m-1/m-1-3',
                        code: 'm-1-2',
                        name: 'm-1-2',
                        alwaysShow: true,
                        meta: {
                            title: 'm-1-2',
                            icon: 'nav-label',
                        },
                        children: [
                            {
                                path: 'm-1-2-1',
                                component: M121,
                                code: 'm-1-2-1',
                                name: 'm-1-2-1',
                                meta: {
                                    title: 'm-1-2-1',
                                },
                            },
                            {
                                path: 'm-1-2-2',
                                component: M122,
                                code: 'm-1-2-2',
                                name: 'm-1-2-2',
                                meta: {
                                    title: 'm-1-2-2',
                                    icon: 'nav-label',
                                },
                            },
                        ],
                    },
                    {
                        path: 'm-1-3',
                        component: M13,
                        code: 'm-1-3',
                        name: 'm-1-3',
                        meta: {
                            title: 'm-1-3',
                            showBreadcrumb: false,
                        },
                    },
                ],
            },
            {
                path: 'm-2',
                component: M2,
                code: 'm-2',
                meta: {
                    title: 'm-2',
                },
            },
        ],
    },
];
