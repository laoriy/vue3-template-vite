<script lang="ts" setup>
import { computed } from 'vue';
import { isExternal } from '../../helpers/isExternal';

const props = defineProps({
    to: {
        type: String,
        required: true,
    },
});

const isExternalUrl = computed(() => isExternal(props.to));
</script>

<template>
    <a v-if="isExternalUrl" ref="noopener" :href="to" target="_blank"><slot /></a>
    <router-link v-else :to="to"><slot /></router-link>
</template>
