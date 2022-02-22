import { ModulesNames } from '@/store/mutation-types/index';
import app from '@/store/modules/layout/app';
import permission from '@/store/modules/layout/permission';
import settings from '@/store/modules/layout/settings';
import user from '@/store/modules/layout/user';

const modules = {
    [ModulesNames.App]: app,
    [ModulesNames.Permission]: permission,
    [ModulesNames.Settings]: settings,
    [ModulesNames.User]: user,
};

export default modules;
