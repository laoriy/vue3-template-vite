<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const toUpdate = (type: number) => {
    const path = type === 1 ? '/special-level-2/home1/add1' : '/special-level-2/home1/edit1';
    router.push(path);
};
</script>

<template>
    <div style="padding: 30px">
        父级页面1
        <el-button type="primary" style="margin-left: 15px" @click="toUpdate(1)">新增1</el-button>
        <el-button type="primary" style="margin-left: 15px" @click="toUpdate(2)">编辑1</el-button>
    </div>
</template>
