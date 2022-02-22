import { AppModule, UserModule, PermissionModule, SettingsModule } from './layout';

export const enum ModulesNames {
    App = 'APP',
    Permission = 'PERMISSION',
    Settings = 'SETTINGS',
    User = 'USER',
}

export { AppModule, PermissionModule, UserModule, SettingsModule };
