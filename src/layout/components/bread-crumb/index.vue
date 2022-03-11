<script setup lang="ts">
import { useStore } from '@/store';
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { compile } from 'path-to-regexp';

const store = useStore();
const route = useRoute();
const router = useRouter();
interface Breadcrumb {
    name?: string;
    path?: string;
    redirect?: string;
    meta: {
        title?: string;
        showBreadcrumb?: boolean;
        hiddenPage?: boolean;
        onHidden?: boolean;
    };
    parent?: Breadcrumb;
}
const emits = defineEmits(['bread-crumb-visible-change']);
const levelList = ref([] as Breadcrumb[]);
const activeColor = ref('rgba(0, 0, 0, 0.65)');

const settings = computed(() => store.state.SETTINGS);
const breadcrumbClickable = computed(() => settings.value.clickableBreadcrumb);
const isShowBreadcrumb = computed(() => levelList.value.length > 0);

watch(
    () => isShowBreadcrumb.value,
    (value) => {
        emits('bread-crumb-visible-change', value);
    },
    {
        immediate: true,
    }
);

const isHomeRouter = (_route: Breadcrumb) => {
    let name = _route && _route.name;
    if (!name) {
        return false;
    }
    if (typeof name === 'string') {
        name = name.trim();
    }
    return name.toLocaleLowerCase() === 'Home'.toLocaleLowerCase();
};
const getBreadcrumb = () => {
    // 过滤非 `meta` 及 `meta.title`
    let matched: Breadcrumb[] = (route.matched as Array<Breadcrumb>).filter(
        (item: Breadcrumb) => item.meta && item.meta.title && !item.meta.hiddenPage
    );

    // 是否要固定第一级面包屑为Home
    if (settings.value.isSetHomeBreadcrumb) {
        const [first] = matched;
        if (!isHomeRouter(first)) {
            const homeBreadcrumb: Breadcrumb[] = [{ path: '/', meta: { title: '首页' } }];
            matched = homeBreadcrumb.concat(matched);
        }
    }

    // 面包屑显示取当前页面路由记录meta.showBreadcrumb字段
    const currPage = matched.slice(-1);
    const [
        {
            meta: { title = '', showBreadcrumb = true, onHidden = false },
            parent = {
                meta: {},
            },
        },
    ] = currPage.length > 0 ? currPage : [{ meta: {}, parent: { meta: {} } }];

    // 处理当前父路由下子路由有隐藏页面
    if (parent.meta && parent.meta.hiddenPage && onHidden) {
        matched.splice(-1, 0, parent);
    }

    levelList.value = (title && showBreadcrumb ? matched : []) as Breadcrumb[];
};

const pathCompile = (path: string) => {
    // 解决面包屑支持path为:id方式
    const { params } = route;
    const toPath = compile(path);
    return toPath(params);
};
const handleLink = (item: Breadcrumb) => {
    const { redirect, path = '' } = item;
    if (redirect) {
        router.push(redirect).catch(() => {});
        return;
    }
    router.push(pathCompile(path)).catch(() => {});
};

watch(
    () => route.path,
    () => {
        getBreadcrumb();
    }
);
onMounted(() => {
    getBreadcrumb();
});
</script>

<template>
    <el-breadcrumb class="app-breadcrumb" :class="{ active: isShowBreadcrumb }" separator="/">
        <transition-group name="breadcrumb">
            <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
                <template v-if="breadcrumbClickable">
                    <span
                        v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
                        class="no-redirect"
                        :style="{ color: index == levelList.length - 1 ? activeColor : '' }"
                    >
                        {{ item.meta.title }}
                    </span>
                    <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
                </template>
                <span
                    v-else
                    class="no-redirect"
                    :style="{ color: index == levelList.length - 1 ? activeColor : '' }"
                >
                    {{ item.meta.title }}
                </span>
            </el-breadcrumb-item>
        </transition-group>
    </el-breadcrumb>
</template>

<style lang="less" scoped>
@normalColor: rgba(0, 0, 0, 0.45);

.app-breadcrumb.el-breadcrumb {
    font-size: 14px;
    padding-left: 24px;
    padding-top: 0px;
    padding-bottom: 0px;
    background: #fff;
    transition: padding 0.2s ease-in-out;

    .el-breadcrumb__separator {
        color: @normalColor;
    }

    .no-redirect {
        color: @normalColor;
        cursor: text;
    }

    /* 可点击样式 */
    .el-breadcrumb__item a {
        color: @normalColor;
        font-weight: normal;

        &:hover {
            color: var(--el-color-primary);
        }
    }

    &.active {
        padding-top: 15px;
        padding-bottom: 15px;
        transition: padding 0.2s ease-in-out;
    }
}
</style>
