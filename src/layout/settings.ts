export const layout = {
    title: 'Aqara Admin',

    /**
     * @type {boolean} true | false
     * @description Whether fix the header
     */
    fixedHeader: true,

    /**
     * @type {boolean} true | false
     * @description Whether show the logo in sidebar
     */
    showSidebarLogo: true,

    /**
     * @type {boolean} true | false
     * @description Whether need to recirect the path '/' to 'home path'.
     * Invalid when the router whitelist has a path setting of '/'.
     * The default of the 'home path' is the first permission router 'redirect' value.
     */
    isRedirectToHome: false,

    /**
     * @type {boolean} true | false
     * @description Controls whether bread crumbs are clickable
     */
    clickableBreadcrumb: true,

    /**
     * @type {boolean} true | false
     * @description Controls Whether set a fixed 'home' bread crumb.
     * And it is necessary to set the `home` router in the router whitelist.
     * More detail, see 'src\layout\components\bread-crumb\index.vue'
     */
    isSetHomeBreadcrumb: false,

    sidebarLogoURL: 'https://cdn.aqara.com/cdn/common/logo.png',
};
