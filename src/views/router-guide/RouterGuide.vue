<template>
    <div class="router-guide">
        <h2>路由配置说明</h2>
        <section class="guide-container">
            <h3>1、路由配置及参数说明：</h3>
            <h4 class="h4-title">A、路由分白名单和权限路由，白名单不会进行路由权限的验证。</h4>
            <h4 class="h4-title">B、路由参数说明：</h4>
            <pre>
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
            @param {String} icon  菜单icon
            @param {Boolean} showBreadcrumb 面包屑是否显示，仅子级meta设置有效
      </pre
            >
            <h4 class="h4-title">C、一级路由</h4>
            <pre>
        如：登录页面，菜单列表无需展示：
          ***
          {
            path: '/login',
            component: Login,
            hidden: true
          },
          ***
        
        如：外链菜单：
        ***
        {
          path: '',
          component: Layout,
          children: [
            {
              path: 'https://www.aqara.com',
              meta: {
                title: '外链菜单',
                icon: 'nav_label'
              }
            }
          ]
        },
        ***
      </pre
            >
            <h4 class="h4-title">D、二级路由</h4>
            <pre>
        如：权限控制介绍页面:
        {
          path: '/permission',
          component: Layout,
          // 控制面包屑点击时跳转子路由
          redirect: '/permission/button',
          code: 'permission',
          index: 3,
          name: 'Permission',
          alwaysShow: true,
          meta: {
            title: '元素权限',
            icon: 'nav_label',
          },
          children: [
            {
              path: 'button',
              code: 'button',
              name: 'Button',
              component: Button,
              meta: {
                title: '按钮权限',
                icon: 'nav_label',
                showBreadcrumb: false
              }
            },
            {
              path: 'module',
              code: 'module',
              name: 'Module',
              component: Module,
              meta: {
                title: '模块权限',
              }
            }
          ]
        },
      </pre
            >
            <h4 class="h4-title">E、多级路由</h4>
            <p class="hint-txt">
                多级路由配置请参照 src\router\module\nested 文件配置，多级路由配置需配合视图的
                &lt;router-view /&gt; 嵌套。
            </p>
        </section>
        <section class="guide-container">
            <h3>2、路由白名单：</h3>
            <p class="hint-txt">
                路由白名单应在 src\router\whiteList.js(ts) 下配置，请参照whiteList文件的模板配置。
            </p>
        </section>
        <section class="guide-container">
            <h3>3、权限路由名单：</h3>
            <p class="hint-txt">
                权限路由名单应在 src\router\module 文件夹下配置，请参照module文件的模板配置。
            </p>
        </section>
    </div>
</template>

<style lang="less">
.router-guide {
    padding: 30px;

    .guide-container {
        margin-top: 15px;

        .h4-title {
            margin: 15px 0 0 15px;
        }

        .hint-txt {
            color: red;
            padding: 15px 15px 0;
        }
    }
}
</style>
