// request.js
import axios from "axios";



// Create an axios instance
const request = axios.create({
    // baseURL:'http://47.109.49.39:8090/',
    baseURL: 'http://localhost:8090/', // Use environment variable for flexibility
    timeout: 1000 * 30, // Set timeout for all requests
    withCredentials: true,
    headers: {
        'content-type': 'application/json; charset=utf-8'
    }
});

// Request interceptor for API token
request.interceptors.request.use(
    config => {
        // Assuming you store your token in localStorage (or use Vuex state management)
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers['Authorization'] = `${token}`;
        // }
        return config;
    },
    error => {
        // if (error.response && error.response.status === 401) {
        //     // Token 过期或未授权
        //     // 处理逻辑，例如跳转到登录页面
        //     window.location.href = '/';
        // }
        // if (error.response && error.response.status === 500){
        //
        //     window.location.href = '/';
        // }
        // if (error.code === 'ERR_NETWORK'){
        //     window.location.href = '/';
        // }
        console.error('Request error: ', error);
        return Promise.reject(error);
    }
);

// Response interceptor for handling responses globally
request.interceptors.response.use(
    response => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response.data; // Return only data
    },
    error => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        console.log(error)
        if (error.response.status === 401) {
            // 如果状态码为401，则重定向到登录页面
            // Notification({
            //     title: "錯誤",
            //     message: '用戶名或密碼錯誤，請重新輸入',
            //     type:error
            // })
            // router.replace({
            //     path:'/'
            // }).then(res=>{console.log(res)})
        }
        if (error.response.status === 404) {
            // 如果状态码为404，则重定向到登录页面
            // Notification({
            //     title: "錯誤",
            //     message: '地址錯誤，請稍後重試',
            //     type:error
            // })
            // router.replace({
            //     path:'/'
            // }).then(res=>{})
        }
        if (error.response.status === 500) {
            //     Notification({
            //         title: "錯誤",
            //         message: '服務器出現未知錯誤，請聯繫管理員，並請稍後登錄',
            //         type:error
            //     })
            //     router.replace("/").then(res=>{});
            // }
            // if (error.code === 'ERR_NETWORK'){
            //     window.location.href = '/';
            // }
            // if (error.response && error.response.status === 500){
            //
            //     window.location.href = '/';
            // }
            console.error('Response error: ', error);
            localStorage.removeItem("token");
            return Promise.reject(error);
        }
    }
);

export default request;
