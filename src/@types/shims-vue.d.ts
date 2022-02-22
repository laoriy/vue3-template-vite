declare module '*.vue' {
    import type { DefineComponent } from 'vue';

    const component: DefineComponent<{}, {}, any>;
    export default component;
}

// css module :export变量
declare module '@/assets/css/var.less' {
    export interface Styles {
        menuText: string;
        menuBg: string;
        menuActiveText: string;
        sideBarWidth: string | number;
        sidebarFoldWidth: string | number;
        navbarHeight: string | number;
    }

    const stylesVar: Styles;
    export default stylesVar;
}
