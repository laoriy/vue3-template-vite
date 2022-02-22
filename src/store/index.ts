import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import { StoreLib } from '@/store/types';

import getters from './getters';
import modules from './modules';

// eslint-disable-next-line symbol-description
export const storeKey: InjectionKey<Store<StoreLib.StoreState>> = Symbol();
// 定义自己的 `useStore` 组合式函数
export function useStore() {
    return baseUseStore(storeKey);
}
export default createStore<StoreLib.StoreState>({
    modules,
    getters,
});
