import axios from 'axios';
import config from './config';
import router from '@/router';
import { Message } from "element-ui";
import global from "@/utils/global"
import qs from "qs";

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    options.params = !options.params ? {} : options.params;
    options.params._platformId = global.platformId;

    let headers = config.jsonHeaders;
    if (options.method == 'post') {
      headers = config.formHeaders
      options.params = qs.stringify(options.params);
    }

    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials
    })

    // request 拦截器
    // 可以在这里加全局loading
    instance.interceptors.request.use(
      config => {
        if (config.method == 'post') {
          config.data = config.params;
          config.params = {};
        }
        let token = localStorage.getItem('token');
        if (token) {
          config.headers.token = token;
        } else {
          // 重定向到登录页面
          router.push('/login');
        }

        return config
      },

      error => {
        // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          Message({
            message: '请求超时, 正在重连...',
            type: 'error',
            onClose: () => {
              // 再重复请求一次

            }
          });

          return;
        }
        // 2. 需要重定向到错误页面 status = 404 403 500 ...
        const errorInfo = error.response
        if (errorInfo) {
          error = errorInfo.data;
          const errorStatus = errorInfo.status;
          router.push({
            path: `/error/${errorStatus}`
          })
        }

        return Promise.reject(error);
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data == undefined) {
          data = JSON.parse(response.request.responseText);
        } else {
          data = response.data;
          if (+data.code == 401) {
            // Cookies.remove('token');
            router.push('/login');
          }
        }

        return data;
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              Cookies.remove('token');
              router.push('/login');
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break
            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              break
            case 501:
              err.message = '服务未实现'
              break
            case 502:
              err.message = '网关错误'
              break
            case 503:
              err.message = '服务不可用'
              break
            case 504:
              err.message = '网关超时'
              break
            case 505:
              err.message = 'HTTP版本不受支持'
              break
            default:
          }
        } else {
          err.message = '网络错误，请检是否连接网络或请求服务器网关是否正常';
        }

        return Promise.reject(err);
      }
    )

    const filterArray = []
    // 请求处理
    instance(options).then(res => {
      if (filterArray.includes(options.url)) {
        resolve(res);
      } else {
        if (res.code == 0) {
          resolve(res)
        } else {
          Message({
            message: res.message,
            type: 'error'
          });
          reject(res.message)
        }
      }

      return false
    }).catch(err => {
      Message({
        message: err,
        type: 'error'
      });
      reject(err)
      return false;
    })
  })
}