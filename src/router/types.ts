import { RouteRecordRaw } from 'vue-router';

type RouteExtend = {
    index?: number;
    code?: string;
    hidden?: boolean;
    alwaysShow?: boolean;
    meta?: {
        title?: string;
        icon?: string;
        activeMenu?: string;
        showBreadcrumb?: boolean;
        hiddenPage?: boolean;
        onHidden?: boolean;
    };
};
type OmitRoute = Omit<RouteRecordRaw, 'meta' | 'children'>;

export interface RouteTreeRaw extends OmitRoute, RouteExtend {
    children?: RouteTreeRaw[];
}

export declare type RouteTree = RouteTreeRaw;
