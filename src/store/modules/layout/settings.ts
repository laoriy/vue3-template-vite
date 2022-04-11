import { hasOwn } from 'aqara-lib';
import { MutationTree, ActionTree } from 'vuex';
import { StoreLib } from '@/store/types';
import { SettingsModule } from '@/store/mutation-types';
import { layout } from '@/layout';

const {
    title,
    fixedHeader,
    showSidebarLogo,
    sidebarLogoURL,
    isRedirectToHome,
    clickableBreadcrumb,
    isSetHomeBreadcrumb,
} = layout;

const state: StoreLib.SettingsState = {
    title,
    fixedHeader,
    showSidebarLogo,
    sidebarLogoURL,
    isRedirectToHome,
    clickableBreadcrumb,
    isSetHomeBreadcrumb,
};

const mutations: MutationTree<StoreLib.SettingsState> = {
    [SettingsModule.ChangeSetting](status, { key, value }: StoreLib.SettingsState) {
        if (hasOwn(status, key)) {
            status[key] = value;
        }
    },
};

const actions: ActionTree<StoreLib.SettingsState, unknown> = {
    // 预留接口
    [SettingsModule.ChangeSettingAction]({ commit }, data: StoreLib.SettingsState) {
        commit(SettingsModule.ChangeSetting, data);
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
