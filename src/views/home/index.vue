<script setup lang="ts">
import { getToken, goUcLogin } from 'uc-lib';
import { computed } from 'vue';

import User from '@/components/header/User.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLogin = computed(() => (getToken() || '').length > 0);
const toLogin = () => {
    goUcLogin();
};
const handleEnter = () => {
    router.push('/router/guide');
};
</script>

<template>
    <div class="home">
        <div class="app-navbar">
            <div class="navbar-left">
                <img class="navbar-left-logo" src="../../assets/img/aqara.png" />
                <span class="navbar-left-txt">xxx平台</span>
            </div>
            <div class="navbar-right">
                <a v-if="isLogin" class="login-btn" @click.stop="handleEnter">进入系统</a>
                <template v-else>
                    <User v-if="isLogin" class="navbar-right-avatar" />
                    <a v-else class="login-btn" @click.stop="toLogin">登录</a>
                </template>
            </div>
        </div>
        <div class="guide-container">
            <div class="container-banner">
                <img
                    class="banner-img"
                    src="https://cdn.aqara.com/cdn/hotel/mainland/static/imgs/pc/pic-banner.png"
                />
                <div class="banner-desc">
                    <p class="desc-tit">xxx平台</p>
                    <p class="desc-tit en-tit">Aqara xxx</p>
                </div>
            </div>
            <div class="nav-list">
                <h3 class="list-tit">系统亮点</h3>
                <div class="list-box">
                    <div>
                        <img class="box-img" src="../../assets/img/pic-room.png" />
                        <h4>xxx</h4>
                        <p class="box-info">xxxxxx</p>
                    </div>
                    <div>
                        <img class="box-img" src="../../assets/img/pic-device.png" />
                        <h4>xxx</h4>
                        <p class="box-info">xxxxxx</p>
                    </div>
                    <div>
                        <img class="box-img" src="../../assets/img/pic-service.png" />
                        <h4>xxx</h4>
                        <p class="box-info">xxxxxx</p>
                    </div>
                </div>
            </div>
            <footer class="footer-info">
                <p>© 2019-2022 绿米联创版权所有 粤ICP备15041247号 深公网安备4403300900606号</p>
            </footer>
        </div>
    </div>
</template>
<style lang="less" scoped>
.home {
    height: 100%;
}

.home .guide-container {
    height: calc(100% - @navbarHeight);
    overflow: auto;

    .container-banner {
        position: relative;

        .banner-img {
            width: 100%;
            height: 50vh;
        }
        .banner-desc {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            height: 50%;
            color: #fff;
            .desc-tit {
                text-align: center;
                font-size: 32px;
                font-weight: 600;
                &.en-tit {
                    font-size: 16px;
                    font-weight: normal;
                }
            }
        }
    }

    .nav-list {
        width: 60%;
        margin: auto;
        text-align: center;
        .list-box {
            display: flex;
            justify-content: space-between;
            margin-bottom: 100px;
        }
        .box-img {
            width: 104px;
        }
        .list-tit {
            margin: 60px 0 30px 0;
        }
        .box-info {
            margin-top: 10px;
            font-size: 12px;
        }
    }

    .footer-info {
        text-align: center;
        color: #666;
        margin-bottom: 40px;
        font-size: 12px;
    }
}

.home .app-navbar {
    height: @navbarHeight;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);

    .navbar-left {
        float: left;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: @navbarHeight;
        padding-left: 20px;

        .navbar-left-logo {
            width: 68px;
        }

        .navbar-left-txt {
            padding-left: 8px;
            color: @subMenuHover;
            font-size: 16px;
            font-weight: 600;
        }
    }

    .navbar-right {
        float: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: @navbarHeight;
        padding-right: 20px;

        .navbar-right-avatar,
        .navbar-right-lang {
            margin-left: 20px;
            cursor: pointer;
        }

        .login-btn {
            color: @subMenuHover;
            font-size: 14px;
        }
    }
}
</style>
