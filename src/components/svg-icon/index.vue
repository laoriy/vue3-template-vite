<script lang="tsx">
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'SvgIcon',
    props: {
        type: {
            type: String,
            required: true,
        },
    },
    setup(props) {
        // #aqara-icon- 需要和vite.config.ts中的createSvgIconsPlugin配置的symbolId一致
        const symbolId = computed(() => `#aqara-icon-${props.type}`);
        return { symbolId };
    },
    render() {
        return (
            <el-icon attrs={this.$attrs}>
                <svg aria-hidden="true">
                    <use xlinkHref={this.symbolId} />
                </svg>
            </el-icon>
        );
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
