/**
 * Created by 方雨 on 2017/4/27.
 * http 配置 与 请求函数
 */
import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { isFunction } from '@/utils';

// axios 配置
axios.defaults.timeout = 5000;

// http request 拦截器
axios.interceptors.request.use(
  (config) => {
    if (store.state.user.token) {
      config.headers.Authorization = `token ${store.state.user.token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  });

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.dispatch('loginOut');
          router.replace({
            path: 'login',
            query: { redirect: router.currentRoute.fullPath },
          });
          break;
        default:
          break;
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(err.response.data);
  });

const http = {
  // 获取数据
  get: function get(url, data, successCallback, errorCallback) {
    axios.get(url, {
      params: data || {},
    })
      .then((res) => {
        if (res.status === 200) {
          if (isFunction(successCallback)) {
            successCallback(res.data);
          }
        }
      })
      .catch((err) => {
        if (isFunction(errorCallback)) {
          errorCallback(err);
        }
      });
  },
  // 提交数据
  post: function post(url, data, successCallback, errorCallback) {
    axios.post(url, data || {})
      .then((res) => {
        if (res.status === 200) {
          if (isFunction(successCallback)) {
            successCallback(res.data);
          }
        }
      })
      .catch((err) => {
        if (isFunction(errorCallback)) {
          errorCallback(err);
        }
      });
  },
};

export default http;
