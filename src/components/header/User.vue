<script lang="ts" setup>
import { getUcURL, locationOrigin } from 'uc-lib';
import { useStore } from '@/store';
import { computed } from 'vue';
import { ModulesNames, UserModule } from '@/store/mutation-types';

const store = useStore();
const name = computed(() => store.getters.name);
const avatar = computed(() => store.getters.avatar);
const goToUserInfo = () => {
    window.open(`${getUcURL()}/user/userInfo?callback=${locationOrigin}`);
};
const logout = async () => {
    await store.dispatch(`${ModulesNames.User}/${UserModule.LogoutAction}`);
    window.location.href = `${locationOrigin}`;
};
</script>

<template>
    <el-dropdown>
        <div class="avatar">
            <el-avatar v-if="avatar" size="small" :src="avatar"></el-avatar>
            <el-avatar
                v-else
                size="small"
                icon="el-icon-user-solid"
                src="https://cdn.aqara.com/cdn/common/logo.png"
            ></el-avatar>
            <span style="margin-left: 8px">{{ name }}</span>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="goToUserInfo">
                    <span>个人中心</span>
                </el-dropdown-item>
                <el-dropdown-item @click="logout">
                    <span>退出登录</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style lang="less" scoped>
.avatar {
    display: flex;
    align-items: center;
}
</style>
