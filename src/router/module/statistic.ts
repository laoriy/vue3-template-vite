import { RouteTree } from '../types';

const Layout = () => import('@/layout');
const Statistic = () => import('@/views/statistic/index.vue');

export default <RouteTree[]>[
    {
        path: '/statistic',
        redirect: '/statistic',
        component: Layout,
        code: 'statistic',
        index: 1,
        children: [
            {
                // 路由显示对应 form/index，只需显示 /from，path设为 ''
                path: '',
                name: 'Statistic',
                component: Statistic,
                meta: {
                    title: '数据统计',
                    icon: 'nav-label',
                },
            },
        ],
    },
];
