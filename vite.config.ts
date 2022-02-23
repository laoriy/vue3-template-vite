/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, loadEnv, ConfigEnv, PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import vueJsx from '@vitejs/plugin-vue-jsx';
import AutoImport from 'unplugin-auto-import/vite'; // elementPlus按需引入 https://element-plus.org/zh-CN/guide/quickstart.html#%E6%8C%89%E9%9C%80%E5%AF%BC%E5%85%A5
import Components from 'unplugin-vue-components/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';
import viteCompression from 'vite-plugin-compression';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

function resolve(dir: string) {
    return path.join(__dirname, dir);
}
// 对静态文件进行分目录输出的正则校验
const assetReg = {
    img: /\.(png|jpe?g|gif|webp|svg)$/,
    fonts: /\.(woff|woff2|eot|ttf|otf)$/,
} as { [key: string]: RegExp };

const plugins: PluginOption[] = [];
/**
 * @todo cdn暂时不支持
 */
const CDN = {
    css: [] as string[],
    js: [
        // 'https://cdn.aqara.com/cdn/common/mainland/static/js/vue-3.2.31.global.prod.js',
        // 'https://cdn.aqara.com/cdn/common/mainland/static/js/vuex-4.0.2.global.prod.js',
        // 'https://cdn.aqara.com/cdn/common/mainland/static/js/vue-router-4.0.12.global.prod.js',
        // 'https://cdn.aqara.com/cdn/common/mainland/static/js/vue-i18n-9.1.9.global.prod.js',
        // 'https://cdn.aqara.com/cdn/common/mainland/static/js/axios-0.26.0.min.js',
    ] as string[],
    externals: {
        // vue: 'Vue',
        // vuex: 'Vuex',
        // axios: 'axios',
        // 'vue-router': 'VueRouter',
        // 'vue-i18n': 'VueI18n',
    },
};
// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
    const reportMode = mode === 'report';
    const prodMode = mode === 'production';
    const isProEnv = reportMode || prodMode;
    const envs = loadEnv(mode, process.cwd());

    const proxyBase = envs.VITE_APP_PROXY_BASE;

    const injectScript = CDN.js
        .map((jsCdn) => `<script type="text/JavaScript" src="${jsCdn}"></script>`)
        .join('');
    /**
     * 生产环境需要进行压缩，删除console等操作
     */
    if (isProEnv) {
        if (prodMode) {
            // gzip
            plugins.push(
                viteCompression({
                    threshold: 10240,
                    filter: /\.js$|\.css$|.html$/,
                })
            );
        }
        if (reportMode) {
            // analysis
            plugins.push(
                visualizer({
                    open: true,
                    gzipSize: true,
                    brotliSize: true,
                    filename: 'dist/report.html',
                })
            );
        }
    }

    return defineConfig({
        plugins: [
            vue(),
            createHtmlPlugin({
                inject: {
                    data: {
                        injectScript: isProEnv ? injectScript : '',
                        injectSensors: envs.VITE_APP_OPEN_SENSORS === 'on',
                    },
                },
            }),
            vueI18n({
                // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
                // compositionOnly: false,
                include: resolve('/src/locales/**'),
            }),
            vueJsx({
                // options are passed on to @vue/babel-plugin-jsx
            }),
            ElementPlus(),
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
                dirs: '', // 本地自定义的组件不通过该插件处理，所以将src/components 置位空
            }),
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹
                iconDirs: [resolve('src/assets/icons')],
                // 指定symbolId格式
                symbolId: 'aqara-icon-[dir]-[name]',
            }),
            ...plugins,
        ],
        resolve: {
            // 配置别名
            alias: {
                '@': resolve('src'),
                utils: resolve('src/utils'),
                service: resolve('src/service'),
                views: resolve('src/views'),
            },
        },
        css: {
            preprocessorOptions: {
                less: {
                    additionalData: `@import "${resolve('src/assets/css/var.module.less')}";`, // less全局变量自动引入
                },
            },
        },
        build: {
            target: 'es2015',
            minify: 'terser', // terser 构建后文件体积更小
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true,
                },
            },
            rollupOptions: {
                // https://rollupjs.org/guide/en/#outputmanualchunks
                output: {
                    chunkFileNames: 'static/js/[name]-[hash].js',
                    entryFileNames: 'static/js/[name]-[hash].js',
                    assetFileNames(assetInfo) {
                        // 对构建后的文件进行分目录
                        const { name } = assetInfo;
                        const assetName = Object.keys(assetReg).find((reg) => {
                            const regExp = assetReg[reg];
                            return regExp.test(name);
                        });
                        return `static/${assetName || '[ext]'}/[name]-[hash].[ext]`;
                    },
                    manualChunks: {
                        vender: ['vue', 'vue-router', 'vuex', 'vue-i18n', 'axios'],
                        'element-plus': ['element-plus'],
                    },
                    globals: isProEnv ? CDN.externals : undefined,
                },
                external: isProEnv ? Object.keys(CDN.externals) : [],
            },
        },
        server: {
            proxy: {
                '/user/center/api': {
                    target: proxyBase,
                    changeOrigin: true,
                    ws: true,
                },
                // TODO: add your code
            },
        },
    });
};
