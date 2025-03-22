import { createStore } from 'vuex';
import { apiClient } from '@/util/request'; // 导入 apiClient

const store = createStore({
  state: {
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    userName: localStorage.getItem('userName') || '',
    loggedIn: false, // 初始化 loggedIn 状态
  },
  mutations: {
    setUserName(state, name) {
      state.userName = name;
      localStorage.setItem('userName', name);
    },
    setToken(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
        state.loggedIn = true; // 设置 loggedIn 为 true
      } else {
        localStorage.removeItem('token');
        state.loggedIn = false; // 设置 loggedIn 为 false
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
    clearAuthInfo(state) {
      state.token = null;
      state.refreshToken = null;
      state.userName = '';
      state.loggedIn = false;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userName');
    },
  },
  getters: {
    isLoggedIn: (state) => state.token !== null,
  },
  actions: {
    login({ commit }, credentials) {
      // 清理现有认证信息
      commit('clearAuthInfo');

      return apiClient.post('/User/login', credentials)
        .then(response => {
          // 检查 response.data 是否存在以及必要的字段是否齐全
          const userName = response.result.username || ''; // 提供默认值或处理缺失情况
          const token = response.token || '';
          const refreshToken = response.result.refreshToken || ''; // 确保服务器返回 refreshToken
    
          // 存储到 Vuex 和 localStorage
          commit('setToken', token);
          commit('setRefreshToken', refreshToken);
          commit('setUserName', userName);
    
          return Promise.resolve(response);
        })
        .catch(error => {
          console.error('Login failed:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
          return Promise.reject(error.response ? error.response.data : error.message);
        });
    },
    logout({ commit }) {
      commit('clearAuthInfo');
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



