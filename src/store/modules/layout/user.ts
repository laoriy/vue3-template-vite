import { getToken, removeToken, getUserInfo } from 'uc-lib';
import { MutationTree, ActionTree } from 'vuex';
import { resetRouter } from '@/router';
import { localMenus } from '@/assets/js/menu';
import { StoreLib, ResourcesRes } from '@/store/types';
import { UserModule } from '@/store/mutation-types';
import accessRequest from '@/service/api/access';

interface DefaultState {
    (): StoreLib.UserState;
}

const { user = {} } = getUserInfo();

const getDefaultState: DefaultState = () => ({
    token: getToken(),
    name: user.nickName || user.name || user.userName,
    avatar: user.avatarUrl,
    menus: [],
    operatorList: [],
});

const state: StoreLib.UserState = getDefaultState();

const mutations: MutationTree<StoreLib.UserState> = {
    [UserModule.ResetState](status) {
        Object.assign(status, getDefaultState());
    },
    [UserModule.SetToken](status, token: string) {
        status.token = token;
    },
    [UserModule.SetName](status, name: string) {
        status.name = name;
    },
    [UserModule.SetAvatar](status, avatar: string) {
        status.avatar = avatar;
    },
    [UserModule.SetMenus](status, menus: any[]) {
        status.menus = menus;
    },
    [UserModule.SetOperators](status, opList: any[]) {
        status.operatorList = opList;
    },
};

const actions: ActionTree<StoreLib.UserState, unknown> = {
    // get user menus
    [UserModule.GetUserMenusAction]({ commit }) {
        // TODO: 通过UC获取菜单
        // return new Promise((resolve, reject) => {
        //     accessRequest
        //         .menu_list({ sysCode: 'lumi-gateway-portal', dataType: 0 })
        //         .then(({ result = [] }) => {
        //             if (!result || (<any>result).length === 0) {
        //                 reject(new Error('Access menus must be a non-null array.'));
        //             }
        //             commit('SET_MENUS', result);
        //             resolve({ menus: result });
        //         })
        //         .catch((error) => reject(error));
        // });

        return new Promise((resolve) => {
            commit(UserModule.SetMenus, localMenus);
            resolve({ menus: localMenus });
        });
    },

    // get user access operate
    [UserModule.GetUserOperators]({ commit }) {
        return new Promise((resolve, reject) => {
            accessRequest
                .resources_list<ResourcesRes>({})
                .then(({ result = [] }) => {
                    commit(UserModule.SetOperators, result);
                    resolve({ operators: result });
                })
                .catch((error: unknown) => reject(error));
        });
    },

    // user logout
    [UserModule.LogoutAction]({ commit }) {
        return new Promise((resolve, reject) => {
            accessRequest
                .logout<null>({})
                .then(() => {
                    // must remove token first
                    removeToken();
                    resetRouter();
                    commit(UserModule.ResetState);
                    resolve(null);
                })
                .catch((error: unknown) => reject(error));
        });
    },

    // remove token
    [UserModule.ResetTokenAction]({ commit }) {
        return new Promise((resolve) => {
            // must remove token first
            removeToken();
            commit(UserModule.ResetState);
            resolve(null);
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
