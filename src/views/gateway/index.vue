<script lang="ts" setup>
import { useStore } from '@/store';
import { computed, ref } from 'vue';

const store = useStore();
const name = computed(() => store.getters.name);
const value1 = ref('');
</script>

<template>
    <div class="dashboard-container">
        <div class="dashboard-text">{{ $t('welcomeHome') }}: {{ name }}</div>
        <p class="dashboard-text" style="color: #ff0000">gateway 模块</p>
        <el-date-picker v-model="value1" type="date" placeholder="Pick a day"></el-date-picker>
    </div>
</template>

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
