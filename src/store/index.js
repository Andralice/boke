import { createStore } from 'vuex';
import axios from 'axios';

// 创建axios实例，配置基础URL和默认headers
const apiClient = axios.create({
  baseURL: 'http://localhost:8080/', // 替换为你的实际后端API地址
  headers: {
    'Content-Type': 'application/json'
  }
});

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
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
  },
  actions: {
    login({ commit }, credentials) {
      return apiClient.post('/User/login', credentials)
        .then(response => {
          const token = response.data.token; // 假设服务器返回的数据中包含token字段
          commit('setToken', token);
          return Promise.resolve(token);
        })
        .catch(error => {
          commit('setToken', null); // 登录失败时清除可能存在的旧token
          return Promise.reject(error.response ? error.response.data : error.message);
        });
    },
    logout({ commit }) {
      commit('setToken', null);
    },
  },
});