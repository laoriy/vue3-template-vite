import { compareByProp } from 'aqara-lib';
import { MutationTree, ActionTree } from 'vuex';
import routeWhiteList from '@/router/whiteList';
import asyncRoutes from '@/router/module';
import { PermissionModule } from '@/store/mutation-types';
import { StoreLib } from '@/store/types';

/**
 * format list to tree
 * @param {array} list
 * @param {number} parentId
 */
function formatTree(list: any[], parentId = 0) {
    function loop(parID: number) {
        const res: any[] = [];
        list.forEach((item) => {
            if (item.parentId === parID) {
                item.children = loop(item.id);
                res.push(item);
            }
        });
        return res;
    }

    return loop(parentId);
}

/**
 * format child access menus
 * When the parent level is no access, child levels also have no access
 * @param {array} list local router tree
 */
function formatChildAccess(list: any[]) {
    list.forEach((item) => {
        item.hidden = true;
        item.meta = item.meta || {};
        item.meta.noAceess = true;
        if (item.children && item.children.length > 0) {
            formatChildAccess(item.children);
        }
    });
}

/**
 * format user aceess menus(routes) by `hidden` and `noAceess` attribute
 * `hidden`: control the menu rendering
 * `noAceess`: control illegal jump directly to the router
 * @param {array} localMenus local router tree
 * @param {array} accessMenus aceess router tree
 */
function formatAccessMenus(localMenus: any[], accessMenus: any[]) {
    function loop(oldTree: any[], newTree: any[]) {
        const res: any[] = [];
        oldTree.forEach((item) => {
            const matchedItem = newTree.find((curr) => curr.code === item.code);
            // match the level one menu
            if (matchedItem) {
                if (matchedItem.children && matchedItem.children.length > 0) {
                    loop(item.children, matchedItem.children);
                }
            } else {
                item.hidden = true;
                // no 'meta' property
                item.meta = item.meta || {};
                item.meta.noAceess = true;

                if (item.children && item.children.length > 0) {
                    formatChildAccess(item.children);
                }
            }
            res.push(item);
        });
        return res;
    }

    return loop(localMenus, accessMenus);
}

const state: StoreLib.AccessState = {
    routes: [],
    addRoutes: [],
};

const mutations: MutationTree<StoreLib.AccessState> = {
    [PermissionModule.SetRoutes](status, routes: any[]) {
        status.addRoutes = routes;
        status.routes = routeWhiteList.concat(routes);
    },
};

const actions: ActionTree<StoreLib.AccessState, unknown> = {
    [PermissionModule.GenerateRoutesAction]({ commit }, menus: any[]) {
        return new Promise((resolve) => {
            let accessedRoutes: any[] = [];

            if (Array.isArray(menus) && menus.length > 0) {
                const menusTree = formatTree(menus);
                accessedRoutes = formatAccessMenus(asyncRoutes, menusTree).sort(
                    compareByProp('index')
                );
            }

            commit(PermissionModule.SetRoutes, accessedRoutes);
            resolve(accessedRoutes);
        });
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
