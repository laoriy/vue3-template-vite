<script lang="ts" setup>
const testTwo = () => {
    console.log('点击普通按钮');
};
const testOne = () => {
    console.log('点击组建按钮');
};
</script>
<template>
    <div style="margin: 30px">
        <h2>按钮权限：</h2>
        <div style="padding: 30px 0">
            <span>普通按钮：</span>
            <button v-operator="'product-update'" @click="testTwo">普通按钮</button>
        </div>
        <div style="padding: 30px 0">
            <span>组建按钮：</span>
            <el-button v-operator="'product-edit'" type="primary" @click="testOne">
                组建按钮
            </el-button>
        </div>
    </div>
</template>
