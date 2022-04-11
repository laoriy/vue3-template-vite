<script lang="ts" setup>
import { locale } from '@/hooks/useLocale';
</script>

<template>
    <el-config-provider :locale="locale">
        <div id="app" class="aqara-app">
            <router-view />
        </div>
    </el-config-provider>
</template>
