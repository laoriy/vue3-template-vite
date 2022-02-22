<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const backToHome = () => {
    router.push('/');
};
</script>

<template>
    <div class="app-error">
        <img class="error-logo" src="../../assets/img/403.png" alt="error" />
        <div class="error-container">
            <div class="error-title">403</div>
            <div class="error-content">抱歉，你无权访问该页面</div>
            <el-button type="primary" @click="backToHome">返回首页</el-button>
        </div>
    </div>
</template>
