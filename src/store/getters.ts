import { GetterTree } from 'vuex';
import { StoreLib } from '@/store/types';

const getters: GetterTree<StoreLib.StoreState, StoreLib.StoreState> = {
    settings: (state) => state.SETTINGS,
    app: (state) => state.APP,
    sidebar: (state) => state.APP.sidebar,
    device: (state) => state.APP.device,
    token: (state) => state.USER.token,
    avatar: (state) => state.USER.avatar,
    name: (state) => state.USER.name,
    menus: (state) => state.USER.menus,
    operators: (state) => state.USER.operatorList,
    hasOperator: (state) => (queryCode: string) => {
        if (!state.USER.operatorList || state.USER.operatorList.length === 0) {
            return false;
        }
        return (
            state.USER.operatorList
                .map((item: Record<string, any>) => item.code)
                .indexOf(queryCode) > -1
        );
    },
    allRoutes: (state) => state.PERMISSION.routes,
    addRoutes: (state) => state.PERMISSION.addRoutes,
    isRedirectToHome: (state) => state.SETTINGS.isRedirectToHome,
};

export default getters;
