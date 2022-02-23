<script setup lang="ts">
import SvgIcon from '@/components/svg-icon/index.vue';

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
    <SvgIcon v-if="icon" class="menu-icon" :type="icon"></SvgIcon>
    <span v-if="title" :class="icon ? '' : 'single-txt'">
        {{ title }}
    </span>
</template>
