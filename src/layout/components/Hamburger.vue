<script lang="ts" setup>
defineProps({
    isActive: {
        type: Boolean,
        default: false,
    },
});
const emits = defineEmits(['toggle-click']);

const toggleClick = () => {
    emits('toggle-click');
};
</script>

<template>
    <div @click="toggleClick">
        <img
            class="hamburger"
            src="~@/assets/img/hamburger.png"
            :class="{ 'is-active': isActive }"
        />
    </div>
</template>

<style scoped>
.hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    color: #fff;
}

.hamburger.is-active {
    transform: rotate(180deg);
}
</style>
