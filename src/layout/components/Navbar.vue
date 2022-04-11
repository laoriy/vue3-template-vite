<script lang="ts" setup>
import { computed } from 'vue';
import Lang from '@/components/header/Lang.vue';
import User from '@/components/header/User.vue';
import { useStore } from '@/store';
import { ModulesNames, AppModule } from '@/store/mutation-types';
import Hamburger from './Hamburger.vue';

const store = useStore();
defineProps({
    hideSidebar: {
        type: Boolean,
    },
});
const sidebar = computed(() => store.getters.sidebar);
const toggleSideBar = () => {
    store.dispatch(`${ModulesNames.App}/${AppModule.ToggleSideBarAction}`);
};
</script>

<template>
    <div class="app-navbar">
        <Hamburger
            v-if="!hideSidebar"
            class="hamburger-container"
            :is-active="sidebar.opened"
            @toggle-click="toggleSideBar"
        />

        <div class="navbar-right">
            <User class="navbar-right-avatar" />
            <Lang class="navbar-right-lang" />
        </div>
    </div>
</template>

<style lang="less">
.app-navbar {
    height: @navbarHeight;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);

    .hamburger-container {
        float: left;
        padding: 21px 24px 0 24px;
        height: 100%;
        cursor: pointer;
        transition: background 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .navbar-right {
        float: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: @navbarHeight;
        padding-right: 20px;

        .navbar-right-avatar,
        .navbar-right-lang {
            margin-left: 20px;
            cursor: pointer;
        }

        .navbar-right-avatar .avatar {
            display: flex;
            align-items: center;
        }
    }
}
</style>
