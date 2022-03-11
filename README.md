# AIOT_Product_Manage_Center_Front -- 多语言管理系统

## 写在项目开始之前:
本项目使用Vue 3 + Typescript + Vite 技术栈,开发前请先阅读模板升级记录，减少开发过程踩坑（[点击查看](https://confluence.aqara.com/pages/viewpage.action?pageId=68254369)）


- 1、[团队规范](https://confluence.aqara.com/pages/viewpage.action?pageId=22357287)

- 2、[vue3文档](https://v3.cn.vuejs.org/)

- 3、[vite文档](https://cn.vitejs.dev/)

- 4、都1202年了，还不熟悉TS，请[猛击](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)

- 5、变量命名请**三思而后行**

- 6、**请不要急于coding，多交流，多思考，想明白，再行动！！！**


## Project setup

```
npm install
```

### Compiles and hot-reloads for development

- For testing production environment api proxy
```
npm run serve
```

- For dev production environment api proxy

```
npm run dev

```

### Compiles and minifies for production


- For official production environment

```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 对接账户中心指南

- [账户中心登录](https://confluence.aqara.com/pages/viewpage.action?pageId=27036672)

- [dev环境开发配置](https://confluence.aqara.com/pages/viewpage.action?pageId=29082578)


### Project Styles

- 项目统一使用 less 预编译器编写样式
- src\assets\css\var.module.less 统一定义项目的通用变量，做了全局less环境注入，定义的变量可以在任何项目less环境中直接使用
- 在js环境中使用src\assets\css\var.module.less 中定义的样式变量:

1、在src\assets\css\var.module.less导出样式变量，如:

```
@link-color: #2d8cf0;

/* more detail: see css module */
:export {
    linkColor: @link-color;
}

```

2、在.ts中引入样式变量：

```
import Styles from '@/assets/css/var.module.less';
console.log(Styles.menuActiveText)

```

3、在.vue中引入样式变量，推荐使用通用hook方式：

```
// src\composables\useStylesheets.ts
import { ref } from '@vue/composition-api';
import Styles from '@/assets/css/var.module.less';

export const useStylesheets = () => {
    const stylesheets = ref(Styles);

    return {
        stylesheets,
    };
};

// src\layout\components\sidebar\index.vue
import { useStylesheets } from '@/composables/useStylesheets';

// ...   
setup() {
    const { stylesheets } = useStylesheets();
    
    // ...

    returm {
        stylesheets
    }
}
```

### Router Guide

- 路由参数

```
        @param {String} path 页面路由，一级路由children的path设置为''时，将使用父级path
        @param {Object} component 路由对应的vue组件
        @param {String} redirect 控制面包屑点击时跳转的子路由
        @param {String} code 路由code，本地路由和服务端返回权限路由唯一匹配标识
        @param {String} name 路由名称
        @param {Number} index 权限路由排序标识，路由顺序排列标识(仅父级路由设置有效)
        @param {Boolean} hidden 路由是否隐藏，控制某个页面路由是否显示
        @param {Boolean} alwaysShow 父级路由是否显示，一级路由设置无效，二级以上路由的父级需设置此属性为true(以保证其下子级有hidden为false时的样式不异常)
        @param {Object} meta 路由meta属性，父子级都应设置
            @param {String} title 菜单明显
            @param {Boolean} hideSidebar 使用layout组件展示页面的时候，是否要展示左侧menuList
            @param {String} icon  菜单icon
            @param {Boolean} showBreadcrumb 面包屑是否显示，仅子级meta设置有效
            @param {Boolean} hiddenPage 父路由下是否有隐藏子页面，与子路由的hiddenPage配套使用
            @param {Boolean} onHidden 父路由下子页面是否隐藏，与hiddenPage配套使用
            @param {String} activeMenu 跨级跳转的页面默认高亮的路由路径
```

- **路由配置请参照模板路由配置**


### Use Request Service

- 在`src\service\api`文件内封装请求模块，参见`src\service\api\access.ts`文件

- 使用封装请求模块，参见`src\store\modules\layout\user.ts`使用方式

- 请使用API隔离层方式组织请求代码，参见: [API隔离层方案](https://confluence.aqara.com/pages/viewpage.action?pageId=60380631)


### npm私服插件

- [npm私服](http://172.16.100.47:4873/)

- 使用npm私服

```

// 1、npm切换
npm config set registry http://172.16.100.47:4873/

// 2、使用nrm管理镜像源
npm install -g nrm

nrm ls

nrm add aqara http://172.16.100.47:4873/

nrm use aqara

```

- [aqara-lib](http://172.16.100.47:4873/-/web/detail/aqara-lib)

- [uc-lib](http://172.16.100.47:4873/-/web/detail/uc-lib)



## Project directory

```

| -- .vscode 项目vscode通用设置，配合通用vscode编辑器配置规范使用，参见: https://confluence.aqara.com/pages/viewpage.action?pageId=29069475

| -- public
    | -- index.html 入口html文件

| -- src
    | -- assets 静态资源
        | -- css 样式
            | -- common 通用样式
            | -- element-theme element-plus的主题变量
            | -- ......   
            | -- var.module.less项目样式变量
        | -- img
        | -- icons 
        | -- js 静态js(ts)配置

    | -- components 自定义Vue公共组件

    | -- directives Vue指令
        | -- index.ts 配置文件

    | -- composables 项目通用hooks
        | -- *.ts hook文件

    | -- locale 国际化
        | -- lang 项目语言变量包(默认中英文)
            | -- en-US.ts
            | -- zh-CN.ts
        | -- index.ts 配置文件

    | -- permission 权限拦截
        | -- requestInterceptor.ts 请求拦截
        | -- routerInterceptor.ts 路由拦截
        | -- index.ts    

    | -- router  Vue-Router配置
        | -- module 路由模块
            | -- xxx xxx模块路由
            | -- xxx.ts 
            | -- index.ts 自动获取各模块路由
        | -- index.ts 路由配置文件

    | -- service Http服务
        | -- api 项目请求接口
            | -- xxx.ts xxx请求模块对象
            | -- types.ts 请求模块对象类型推断声明文件
        | -- utils 请求模块插件
            | -- ajax.ts 请求封装        
            | -- ......       

    | -- store Vuex配置
        | -- module store模块
        | -- index.ts store配置文件          

    | -- types TS类型声明
        | -- shims-lib.d.ts 项目插件声明
        | -- shims-tsx.d.ts Vue使用tsx语法声明
        | -- shims-vue.d.ts Vue生态插件语法声明
        | -- vue-prototype.d.ts 项目自定义Vue属性声明

    | -- utils 项目插件
        | -- *.ts

    | -- vendor 第三方插件
        | -- element.ts UI框架按需引入

    | -- views 项目页面
        | -- xxx页面
            | -- xxx.vue

    | -- App.vue 视图主入口

    | -- main.ts 项目主入口文件

    | -- settings.ts 项目UI Layout设置


| --  .browserslistrc 项目目标浏览器的范围

| --  .editorconfig 编译器配置(vscode)

| --  .env.development 开发环境的环境变量

| --  .env.test 测试环境的环境变量

| --  .env.production 生产环境的环境变量

| --  .eslintignore eslint代码检查忽略

| --  .eslintrc.js eslint代码检查配置

| --  .gitignore git提交忽略

| --  .prettierrc prettierrc配置

| --  .prettierignore prettierrc忽略文件配置

| --  package.json 项目依赖

| --  tsconfig.json 项目ts代码编译配置

| --  vite.config.js 项目打包配置

| --  index.html 入口html文件

```


