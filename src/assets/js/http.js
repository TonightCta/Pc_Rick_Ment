import axios from 'axios';
import QS from 'qs';
import { Message } from 'element-ui';

// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://10.0.0.31:8080';
} else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'http://hexsoft.top:8080';
} else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'http://admin.rightservicetech.com';
}

// 请求超时时间
axios.defaults.timeout = 10000;

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 404请求不存在
                case 404:
                    Message.error('未知错误,请联系管理员')
                break;
                // 其他错误，直接抛出错误提示
                default:
                    Message.error(error.response.data.msg)
            }
            return Promise.reject(error.response);
        }
    }
);
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params: params
        })
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(err => {
            reject(err.data)
        })
    });
}
