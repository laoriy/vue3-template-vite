import Cookies from 'js-cookie';
import { MutationTree, ActionTree } from 'vuex';
import { StoreLib } from '@/store/types';
import { AppModule } from '@/store/mutation-types';

const state: StoreLib.AppState = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
        withoutAnimation: false,
    },
    // 设备类型
    device: 'desktop',
};

const mutations: MutationTree<StoreLib.AppState> = {
    [AppModule.ToggleSidebar](status) {
        status.sidebar.opened = !status.sidebar.opened;
        status.sidebar.withoutAnimation = false;
        if (status.sidebar.opened) {
            Cookies.set('sidebarStatus', '1');
        } else {
            Cookies.set('sidebarStatus', '0');
        }
    },
    [AppModule.CloseSideBar](status, withoutAnimation: boolean) {
        Cookies.set('sidebarStatus', '0');
        status.sidebar.opened = false;
        status.sidebar.withoutAnimation = withoutAnimation;
    },
    [AppModule.ToggleDevice](status, device: StoreLib.deviceType) {
        status.device = device;
    },
};

const actions: ActionTree<StoreLib.AppState, unknown> = {
    [AppModule.ToggleSideBarAction]({ commit }) {
        commit(AppModule.ToggleSidebar);
    },
    // 处理设备类型为mobile
    [AppModule.CloseSideBarAction]({ commit }, { withoutAnimation }: StoreLib.Sidebar) {
        commit(AppModule.CloseSideBar, withoutAnimation);
    },
    [AppModule.ToggleDeviceAction]({ commit }, device: StoreLib.deviceType) {
        commit(AppModule.ToggleDevice, device);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
