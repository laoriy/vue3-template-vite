import { ModulesNames } from './mutation-types';

interface MenuItem {
    id: number;
    parentId: number;
    code: string;
    name: string;
    sysTypeId: number;
    levelId: number;
    url: string | null;
}

export interface MenusRes {
    result: MenuItem[];
}

interface ResourcesItem {
    code: string;
    name: string;
    id: number;
    type: number;
}

export interface ResourcesRes {
    result: ResourcesItem[];
}

export declare namespace StoreLib {
    type deviceType = 'desktop' | 'mobile';

    interface Sidebar {
        opened: boolean;
        withoutAnimation: boolean;
    }

    interface AppState {
        sidebar: Sidebar;
        device: deviceType;
    }

    interface SettingsState {
        [key: string]: any;
        title: string;
        fixedHeader: boolean;
        showSidebarLogo: boolean;
        sidebarLogoURL: string;
        isRedirectToHome: boolean;
        clickableBreadcrumb: boolean;
        isSetHomeBreadcrumb: boolean;
    }

    interface UserState {
        token: string;
        name: string;
        avatar: string;
        menus: any[];
        operatorList: any[];
    }

    interface AccessState {
        routes: any[];
        addRoutes: any[];
    }

    interface StoreState {
        [ModulesNames.App]: AppState;
        [ModulesNames.Settings]: SettingsState;
        [ModulesNames.User]: UserState;
        [ModulesNames.Permission]: AccessState;
    }
}
