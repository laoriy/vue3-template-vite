<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const toUpdate = (type: number) => {
    const path = type === 1 ? '/special-level/add' : '/special-level/edit';
    router.push(path);
};
</script>

<template>
    <div style="padding: 30px">
        父级页面
        <el-button type="primary" style="margin-left: 15px" @click="toUpdate(1)">新增</el-button>
        <el-button type="primary" style="margin-left: 15px" @click="toUpdate(2)">编辑</el-button>
    </div>
</template>
