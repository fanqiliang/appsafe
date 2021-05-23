import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import { getToken } from '@/utils/util'
//新创建一个vue实例
let v = new Vue();

axios.interceptors.request.use(
  config => {
      //这里添加请求的头部headers
      //判断是否有token
      // config.headers['Authorization'] = 'Bearer 31ba681a-e128-46ea-8de3-e2a6533c084d';
      // config.headers['vxUserId'] = '111111111111111111';
      // config.headers['vxUserId'] = 'SunJian';
      config.headers['ContentType'] = 'application/json;charset=UTF-8';
      config.headers['Authorization'] = getToken();
      // if(getToken()){
      //     config.headers['Authorization'] = getToken();
      //     config.headers['ContentType'] = 'application/json;charset=UTF-8';
      // }
      return config;
  },
  err=>{
      return Promise.reject(err);
  }
)

// http response 拦截器
axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      let code = parseInt(res.data.code)
      if (code === 0) {
        return Promise.resolve(res.data.data)
      } else if (code === -5) {
        location.href = '#/login'
      } else {
        v.$message({
          type : 'error',
          message : `${res.data.msg}`
        });
        return Promise.reject(res.data.msg)
      }
    } else {
      
    }
  },
  error => {
    v.$message({
      type : 'error',
      message : `网络请求错误:${error.response.status}`
    });
    return Promise.reject(error.response.status)
  }
);

export default axios;