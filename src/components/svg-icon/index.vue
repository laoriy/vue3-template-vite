<script lang="tsx">
import { defineComponent, computed } from 'vue';

export default defineComponent({
    name: 'SvgIcon',
    props: {
        type: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            default: 16,
        },
        color: {
            type: String,
            default: 'inherit',
        },
    },
    setup(props) {
        // #aqara-icon- 需要和vite.config.ts中的createSvgIconsPlugin配置的symbolId一致
        const symbolId = computed(() => `#aqara-icon-${props.type}`);
        return { symbolId };
    },
    render() {
        return (
            <el-icon attrs={this.$attrs} color={this.color} size={this.size}>
                <svg aria-hidden="true">
                    <use xlinkHref={this.symbolId} />
                </svg>
            </el-icon>
        );
    },
});
</script>
