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
    <svg-icon v-if="icon" class="menu-icon" :type="icon"></svg-icon>
    <span v-if="title" :class="icon ? '' : 'single-txt'">
        {{ title }}
    </span>
</template>
