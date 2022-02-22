<script setup lang="ts">
defineProps({
    icon: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
});
</script>

<template>
    <!-- <i v-if="icon" :class="['iconfont', 'menu-icon', icon]"></i> -->
    <svg-icon v-if="icon" class="menu-icon" :type="icon"></svg-icon>
    <span v-if="title" :class="icon ? '' : 'single-txt'">
        {{ title }}
    </span>
</template>
