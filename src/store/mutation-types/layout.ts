export const enum AppModule {
    // mutations
    ToggleSidebar = 'TOGGLE_SIDEBAR',
    CloseSideBar = 'CLOSE_SIDEBAR',
    ToggleDevice = 'TOGGLE_DEVICE',
    SetBreadCrumb = 'SET_BREADCRUMB',
    // actions
    ToggleSideBarAction = 'TOGGLE_SIDEBAR_ACTION',
    CloseSideBarAction = 'CLOSE_SIDEBAR_ACTION',
    ToggleDeviceAction = 'TOGGLE_DEVICE_ACTION',
}
export const enum PermissionModule {
    // mutations
    SetRoutes = 'SET_ROUTES',
    // actions
    GenerateRoutesAction = 'GENERATE_ROUTES_ACTION',
}
export const enum SettingsModule {
    // mutations
    ChangeSetting = 'CHANGE_SETTING',
    // actions
    ChangeSettingAction = 'CHANGE_SETTING_ACTION',
}
export const enum UserModule {
    // mutations
    ResetState = 'RESET_STATE',
    SetToken = 'SET_TOKEN',
    SetName = 'SET_NAME',
    SetAvatar = 'SET_AVATAR',
    SetMenus = 'SET_MENUS',
    SetOperators = 'SET_OPERATORS',
    // actions
    GetUserMenusAction = 'GET_USER_MENUS_ACTION',
    LogoutAction = 'LOGOUT_ACTION',
    GetUserOperators = 'GET_USER_OPERATORS',
    ResetTokenAction = 'RESET_TOKEN_ACTION',
}
