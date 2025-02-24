

// store.js
import { createStore } from 'vuex';
import axios from 'axios';

// 创建axios实例，配置基础URL和默认headers
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/', // 替换为你的实际后端API地址
  headers: {
    'Content-Type': 'application/json'
  }
});

// 请求拦截器
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch('refreshAccessToken');
        originalRequest.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        return apiClient(originalRequest); // 重试原始请求
      } catch (refreshError) {
        store.commit('setToken', null);
        store.commit('setRefreshToken', null);
        // 可以在此处导航到登录页面或其他处理
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// Vuex Store 实例
const store = createStore({
  state: {
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
    setRefreshToken(state, refreshToken) {
      state.refreshToken = refreshToken;
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      } else {
        localStorage.removeItem('refreshToken');
      }
    },
  },
  actions: {
    login({ commit }, credentials) {
      return apiClient.post('/User/login', credentials)
        .then(response => {
          const token = response.data.token;
          const refreshToken = response.data.refreshToken; // 假设服务器返回refreshToken
          commit('setToken', token);
          commit('setRefreshToken', refreshToken);
          return Promise.resolve(token);
        })
        .catch(error => {
          commit('setToken', null);
          commit('setRefreshToken', null);
          console.error('Login failed:', error.response ? error.response.data : error.message);
          return Promise.reject(error.response ? error.response.data : error.message);
        });
    },
    logout({ commit }) {
      commit('setToken', null);
      commit('setRefreshToken', null);
    },
    refreshAccessToken({ commit, state }) {
      return apiClient.post('/refresh-token', {
        refreshToken: state.refreshToken,
      })
      .then(response => {
        const newToken = response.data.token;
        commit('setToken', newToken);
        return Promise.resolve(newToken);
      })
      .catch(error => {
        commit('setToken', null);
        commit('setRefreshToken', null);
        console.error('Token refresh failed:', error.response ? error.response.data : error.message);
        return Promise.reject(error.response ? error.response.data : error.message);
      });
    },
  },
});

export default store;