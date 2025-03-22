// utils/apiClient.js
import axios from 'axios';
import store from '@/store';

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

// 请求拦截器
apiClient.interceptors.request.use(config => {
  const token = store.state.auth.token; // 从 Vuex 获取 token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 自动附加到请求头
  }
  return config;
});

export default apiClient;