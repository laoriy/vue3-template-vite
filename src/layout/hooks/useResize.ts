import { onBeforeMount, onBeforeUnmount, onMounted, watch, computed } from 'vue';
import { StoreLib } from '@/store/types';
import { ModulesNames, AppModule } from '@/store/mutation-types';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';

const { body } = document;
const WIDTH = 992;

export default function useResize() {
    const store = useStore();
    const route = useRoute();
    const device = computed(() => (store.state as StoreLib.StoreState).APP.device);
    const sidebar = computed(() => (store.state as StoreLib.StoreState).APP.sidebar);
    const fixedHeader = computed(() => (store.state as StoreLib.StoreState).SETTINGS.fixedHeader);
    const $_isMobile = () => {
        const rect = body.getBoundingClientRect();
        return rect.width - 1 < WIDTH;
    };
    const $_resizeHandler = () => {
        if (!document.hidden) {
            const isMobile = $_isMobile();
            store.dispatch(
                `${ModulesNames.App}/${AppModule.ToggleDeviceAction}`,
                isMobile ? 'mobile' : 'desktop'
            );

            if (isMobile) {
                store.dispatch(`${ModulesNames.App}/${AppModule.CloseSideBarAction}`, {
                    withoutAnimation: true,
                });
            }
        }
    };

    watch(
        () => route,
        () => {
            if (device.value === 'mobile' && sidebar.value.opened) {
                store.dispatch(`${ModulesNames.App}/${AppModule.CloseSideBarAction}`, {
                    withoutAnimation: false,
                });
            }
        }
    );

    onBeforeMount(() => {
        window.addEventListener('resize', $_resizeHandler);
    });

    onMounted(() => {
        const isMobile = $_isMobile();
        if (isMobile) {
            store.dispatch(`${ModulesNames.App}/${AppModule.ToggleDeviceAction}`, 'mobile');
            store.dispatch(`${ModulesNames.App}/${AppModule.CloseSideBarAction}`, {
                withoutAnimation: true,
            });
        }
    });
    onBeforeUnmount(() => {
        window.removeEventListener('resize', $_resizeHandler);
    });

    return {
        device,
        sidebar,
        fixedHeader,
    };
}
