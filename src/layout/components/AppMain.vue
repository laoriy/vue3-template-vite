<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const key = computed(() => route.path);
</script>

<template>
    <div class="app-main">
        <router-view v-slot="{ Component }">
            <transition name="fade-transform" mode="out-in">
                <component :is="Component" :key="key" />
            </transition>
        </router-view>
    </div>
</template>

<style lang="less" scoped>
.app-main {
    height: calc(100vh - @navbarHeight);
    width: 100%;
    position: relative;
    overflow: auto;
    padding: 20px;
    background: #f4f5f8;
    &.show-breadcrumb {
        height: calc(100vh - @navbarHeight - @breadcrumbHeight);
    }
}

.fixed-header + .app-main {
    padding-top: @navbarHeight;
}

/* fix css style bug in open el-dialog */
.el-popup-parent--hidden {
    .fixed-header {
        padding-right: 15px;
    }
}
</style>
