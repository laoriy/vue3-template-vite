<template>
    <transition name="fade">
        <div v-show="show" :class="classes" :style="outerStyles" class="lv-loading-bar">
            <div :class="innerClasses" :style="styles"></div>
        </div>
    </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const prefixCls = 'lv-loading-bar';

export default defineComponent({
    name: 'LoadingBar',
    props: {
        color: {
            type: String,
            default: 'primary',
        },
        failedColor: {
            type: String,
            default: 'error',
        },
        height: {
            type: Number,
            default: 2,
        },
    },
    data() {
        return {
            percent: 0,
            status: 'success',
            show: false,
        };
    },
    computed: {
        classes(): string {
            return `${prefixCls}`;
        },
        innerClasses(): any {
            return [
                `${prefixCls}-inner`,
                {
                    [`${prefixCls}-inner-color-primary`]:
                        this.color === 'primary' && this.status === 'success',
                    [`${prefixCls}-inner-failed-color-error`]:
                        this.failedColor === 'error' && this.status === 'error',
                },
            ];
        },
        outerStyles(): object {
            return {
                height: `${this.height}px`,
            };
        },
        styles(): object {
            const style: any = {
                width: `${this.percent}%`,
                height: `${this.height}px`,
            };
            if (this.color !== 'primary' && this.status === 'success') {
                style.backgroundColor = this.color;
            }
            if (this.failedColor !== 'error' && this.status === 'error') {
                style.backgroundColor = this.failedColor;
            }
            return style;
        },
    },
});
</script>

<style lang="less" scoped>
.lv-loading-bar {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2000;

    .lv-loading-bar-inner {
        transition: width 0.2s linear;
    }

    .lv-loading-bar-inner-color-primary {
        // background-color: #409eff;
        background-image: linear-gradient(to right, #2572ff, #ff6be8, #ffa619, #7fff79);
    }

    .lv-loading-bar-inner-failed-color-error {
        background-color: #e9390d;
    }
}
</style>
