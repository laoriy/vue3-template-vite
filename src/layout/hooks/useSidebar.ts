import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default function useSideBar() {
    const route = useRoute();
    const hideSidebar = ref(false);
    watch(
        () => route,
        (_route) => {
            hideSidebar.value = !!_route.meta.hideSidebar;
        },
        {
            immediate: true,
        }
    );
    return {
        hideSidebar,
    };
}
