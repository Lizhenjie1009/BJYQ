import axios from 'axios'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

/* 第一层if判断生产环境和开发环境 */
if (process.env.NODE_ENV === 'production') {
  /* 第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境 */
  if (process.env.VUE_APP_FLAG === 'pro') {
    // production 生产环境
    axios.defaults.baseURL = 'http://3.7.63.158:8009/'
  } else {
    // test 测试环境
    axios.defaults.baseURL = 'http://192.168.1.114:8001/'
  }
} else {
  // dev 开发环境
  // axios.defaults.baseURL = 'http://localhost:8080/'
}

const service = axios.create({
  // baseURL: '/server',
  timeout: 20000
})

service.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
