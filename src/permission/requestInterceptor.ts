import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { goUcLogin, getRandomStr, getLang, locationOrigin } from 'uc-lib';
import { ElMessage } from 'element-plus';

const isProEnv = process.env.NODE_ENV === 'production';

const requestInterceptor = function httpRequestInterceptor() {
    // 环境切换
    axios.defaults.baseURL = `${locationOrigin}`;

    // 请求拦截
    axios.interceptors.request.use(
        (config: AxiosRequestConfig) => {
            const randomStr = `${getRandomStr()}${getRandomStr()}${getRandomStr()}${getRandomStr()}`;
            const headers = {
                'Accept-Language': getLang(),
                'Operate-Platform': 40,
                Nonce: randomStr,
                Timestamp: new Date().getTime(),
            };

            // 通用请求头
            for (const [key, val] of Object.entries(headers)) {
                config.headers[key] = val;
            }

            // TODO: add your code

            return config;
        },
        (error) => Promise.reject(error)
    );

    // 响应拦截
    axios.interceptors.response.use(
        (response: AxiosResponse) => {
            const {
                data: { code = -1000 },
            } = response;
            // 登录过期
            if (code === 10027 && isProEnv) {
                goUcLogin();
            }

            // TODO: add your code

            return response;
        },
        (error) => {
            console.log(error);
            ElMessage({
                showClose: true,
                message: error.message,
                type: 'error',
            });
            Promise.reject(error);
        }
    );
};

export { requestInterceptor };
