<script lang="tsx">
import { defineComponent } from 'vue';
import * as icons from '@/assets/icons';
/**
 * 内置一些全局的svg图标，同样使用el-icon进行包裹可以设置该组件的size,color 等
 */
export default defineComponent({
    name: 'SvgIcon',
    props: {
        type: {
            type: String,
            required: true,
        },
    },
    render() {
        const Icon = (icons as Record<string, any>)[this.type];
        if (Icon) {
            return (
                <el-icon attrs={this.$attrs}>
                    <Icon />
                </el-icon>
            );
        }
        return null;
    },
});
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    fill: currentColor;
    overflow: hidden;
}
</style>
