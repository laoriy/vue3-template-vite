<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ModulesNames, AppModule } from '@/store/mutation-types';
import { useStore } from '@/store';
import useSideBar from './hooks/useSidebar';
import { Breadcrumb, Navbar, Sidebar, AppMain } from './components';

import useResize from './hooks/useResize';

const { device, sidebar, fixedHeader } = useResize();
const { hideSidebar } = useSideBar();
const store = useStore();
const isBreadcrumbShow = ref(false);
const classObj = computed(() => ({
    closeSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === 'mobile',
}));

const handleClickOutside = () => {
    store.dispatch(`${ModulesNames.App}/${AppModule.CloseSideBarAction}`, {
        withoutAnimation: false,
    });
};
const onBreadcrumbVisibleChange = (isShow: boolean) => {
    isBreadcrumbShow.value = isShow;
};
</script>

<template>
    <div :class="classObj" class="app-wrapper">
        <div
            v-if="device === 'mobile' && sidebar.opened"
            class="drawer-bg"
            @click="handleClickOutside"
        />
        <Sidebar v-if="!hideSidebar" class="sidebar-container"></Sidebar>

        <div class="main-container" :class="{ 'hide-sidebar': hideSidebar }">
            <div :class="{ 'fixed-header': fixedHeader }">
                <Navbar :hide-sidebar="hideSidebar"></Navbar>
            </div>
            <Breadcrumb
                :class="{ 'navbar-fixed-header': fixedHeader }"
                @bread-crumb-visible-change="onBreadcrumbVisibleChange"
            ></Breadcrumb>
            <AppMain :class="{ 'show-breadcrumb': isBreadcrumbShow }"></AppMain>
        </div>
    </div>
</template>

<style lang="less" scoped>
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }

    &:after {
        content: '';
        display: table;
        clear: both;
    }
}

.drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}

.fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - @sideBarWidth);
    transition: width 0.28s;
}

.closeSidebar .fixed-header {
    width: calc(100% - @sidebarFoldWidth);
}

.mobile .fixed-header {
    width: 100%;
}
.hide-sidebar .fixed-header {
    width: 100%;
}

.navbar-fixed-header {
    margin-top: @navbarHeight;
}
</style>
