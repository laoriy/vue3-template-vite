import { RouteTree } from '../types';

const Layout = () => import('@/layout/index.vue');
const Gateway = () => import('@/views/gateway/index.vue');

export default <RouteTree[]>[
    {
        path: '/gateway',
        component: Layout,
        // 控制面包屑点击时跳转子路由
        redirect: '/gateway/list',
        code: 'gateway',
        index: 3,
        name: 'Gateway',
        alwaysShow: true,
        meta: {
            title: '网关管理',
            icon: 'nav-label',
        },
        children: [
            {
                path: 'list',
                code: 'gateway-list',
                name: 'GatewayList',
                component: Gateway,
                meta: {
                    title: '网关列表',
                },
            },
        ],
    },
];
