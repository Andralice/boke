// authStore.js
import { createStore } from 'vuex';
import ApiClient from '../util/request';

const apiClient = new ApiClient('http://localhost:8080/');

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
      return apiClient.request({
        method: 'post',
        url: '/User/login',
        data: credentials
      })
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
      return apiClient.refreshAccessToken()
      .then(newToken => {
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