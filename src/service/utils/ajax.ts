import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { formartQueryURL } from 'aqara-lib';
import { ElMessage } from 'element-plus';
import LoadingBar from '@/components/loading-bar/index';

export default {
    get<T>(url: string, params: Record<string, any>, config: AxiosRequestConfig = {}): Promise<T> {
        const formatURL = formartQueryURL(url, params);
        return new Promise((resolve, reject) => {
            LoadingBar.start();
            axios.get(formatURL, config).then(
                (res: AxiosResponse) => {
                    const { data = {} } = res;
                    if (data.code === 0 || data.code === 200) {
                        LoadingBar.finish();
                        resolve(data);
                    } else {
                        LoadingBar.error();
                        ElMessage.error({
                            showClose: true,
                            message: data.msg,
                            type: 'error',
                        });
                    }
                },
                (err) => {
                    // 错误信息提示
                    console.error(err);
                    LoadingBar.error();
                    reject(err);
                }
            );
        });
    },

    post<T>(url: string, params: Record<string, any>, config: AxiosRequestConfig = {}): Promise<T> {
        LoadingBar.start();
        return new Promise((resolve, reject) => {
            axios.post(url, params, config).then(
                (res: AxiosResponse) => {
                    const { data = {} } = res;
                    if (data.code === 0 || data.code === 200) {
                        LoadingBar.finish();
                        resolve(data);
                    } else {
                        LoadingBar.error();
                        ElMessage.error({
                            showClose: true,
                            message: data.msg,
                            type: 'error',
                        });
                    }
                },
                (err) => {
                    // 错误信息提示
                    console.error(err);
                    LoadingBar.error();
                    reject(err);
                }
            );
        });
    },
};
