<script lang="tsx">
import { defineComponent, computed } from 'vue';

import { useStore } from '@/store';

export default defineComponent({
    setup() {
        const store = useStore();
        const name = computed(() => store.getters.name);
        return {
            name,
        };
    },
    render() {
        return (
            <div class="dashboard-container">
                <div class="dashboard-text">欢迎: {this.name}</div>
                <p class="dashboard-text" style="color: #ff0000">
                    statistic 模块
                </p>
            </div>
        );
    },
});
</script>

<style lang="less" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
