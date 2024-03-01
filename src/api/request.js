import axios from 'axios'
import { baseUrl } from '@/config/config'
import { Message } from 'view-ui-plus'
// 创建一个axios实例
const service = axios.create({
    baseURL: baseUrl, // url = base url + request url
    timeout: 30000, // 请求超时时间 默认30秒
    headers: {
        'Content-Type': 'application/json'
    }
})
// 请求拦截器
service.interceptors.request.use(config => {
    const token = localStorage.getItem('userToken');
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    if (token) {
        config.headers['accessToken'] = token
    }
    return config
},
    error => {
        // debug
        console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data
        console.log(response)
        if (res.code !== 200) {
            Message.warning(res.msg || 'Error')
            return Promise.reject(new Error(res.msg || 'Error'))
        } else {
            return res
        }
    },
    error => {
        // debug
        console.log('err' + error)
        Message.error(res.msg || 'Error')
        return Promise.reject(error)
    }
)

export default service