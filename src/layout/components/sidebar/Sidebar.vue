<script setup lang="ts">
import { computed } from 'vue';
import { useStylesheets } from '@/hooks/useStylesheets';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';

import Logo from './SidebarLogo.vue';
import SidebarItem from './SidebarItem.vue';

const store = useStore();
const route = useRoute();

const { stylesheets } = useStylesheets();

const sidebar = computed(() => store.getters.sidebar);
const allRoutes = computed(() => store.getters.allRoutes);
const showLogo = computed(() => store.getters.settings.showSidebarLogo);

const activeMenu = computed(() => {
    const { meta, path } = route;
    if (meta.activeMenu) {
        return meta.activeMenu as string;
    }
    return path;
});

const isCollapse = computed(() => !sidebar.value.opened);
</script>

<template>
    <div :class="{ 'has-logo': showLogo }">
        <Logo v-if="showLogo" :collapse="isCollapse" />
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="stylesheets.menuBg"
                :text-color="stylesheets.menuText"
                :unique-opened="false"
                :active-text-color="stylesheets.menuActiveText"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="_route in allRoutes"
                    :key="_route.path"
                    :item="_route"
                    :base-path="_route.path"
                ></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
