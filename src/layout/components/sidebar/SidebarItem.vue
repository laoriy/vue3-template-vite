<script setup lang="ts">
// import path from 'path';
import { isExternal } from '@/utils/validate';
import { ref } from 'vue';
import SvgIcon from '@/components/svg-icon/index.vue';
import ItemCell from './SidebarItemCell.vue';
import AppLink from './SidebarLink.vue';

type PlianObj = Record<string, any>;
const props = defineProps({
    // route object
    item: {
        type: Object,
        required: true,
    },
    isNest: {
        type: Boolean,
        default: false,
    },
    basePath: {
        type: String,
        default: '',
    },
});

const onlyOneChild = ref(null);

const hasOneShowingChild = (parent: PlianObj, children: any[] = []) => {
    const showingChildren = children.filter((item: PlianObj) => {
        if (item.hidden) {
            return false;
        }
        // Temp set(will be used if only has one showing child)
        onlyOneChild.value = item;
        return true;
    });

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
        return true;
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
        onlyOneChild.value = {
            ...parent,
            path: '',
            noShowingChildren: true,
        };
        return true;
    }

    return false;
};
const resolvePath = (routePath: string) => {
    if (isExternal(routePath)) {
        return routePath;
    }
    if (isExternal(props.basePath)) {
        return props.basePath;
    }
    return `${props.basePath}/${routePath}`.replace(/\/{n}/g, '/').replace(/\/$/g, ''); // 将多个//变为/ ，去掉结尾的/
};
const getIcon = (item: PlianObj) => onlyOneChild.value.meta.icon || (item.meta && item.meta.icon);
</script>

<template>
    <div v-if="!item.hidden">
        <template
            v-if="
                hasOneShowingChild(item, item.children) &&
                (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
                !item.alwaysShow
            "
        >
            <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
                <el-menu-item
                    :index="resolvePath(onlyOneChild.path)"
                    :class="{ 'submenu-title-noDropdown': !isNest }"
                >
                    <SvgIcon v-if="getIcon(item)" class="menu-icon" :type="getIcon(item)"></SvgIcon>
                    <!-- <i v-if="getIcon(item)" :class="`iconfont menu-icon ${getIcon(item)}`"></i> -->
                    <template v-if="onlyOneChild.meta.title" #title>
                        <span class="title" :class="getIcon(item) ? '' : 'single-txt'">
                            {{ onlyOneChild.meta.title }}
                        </span>
                    </template>
                </el-menu-item>
            </AppLink>
        </template>

        <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
            <template #title>
                <ItemCell
                    v-if="item.meta"
                    :title="item.meta.title"
                    :icon="item.meta && item.meta.icon"
                ></ItemCell>
            </template>

            <sidebar-item
                v-for="child in item.children"
                :key="child.path"
                :is-nest="true"
                :item="child"
                :base-path="resolvePath(child.path)"
                class="nest-menu"
            ></sidebar-item>
        </el-sub-menu>
    </div>
</template>
