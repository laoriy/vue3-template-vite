/* eslint-disable */
import { ComponentCustomProperties } from 'vue';
import { Store } from 'vuex';
import { StoreLib } from '@/store/types';
import { Subscribe } from '@/plugins/emitter';
declare module '@vue/runtime-core' {
    // 为 `this.$store` 提供类型声明
    interface ComponentCustomProperties {
        $store: Store<StoreLib.State>;
        emitter: Subscribe;
    }
}
