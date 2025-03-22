import { createStore } from 'vuex';
import apiClient from '../util/request'; // 使用相同的Axios实例

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
      return apiClient.login(credentials)
        .then(token => {
          commit('setToken', token);
          return Promise.resolve(token);
        })
        .catch(error => {
          commit('setToken', null);
          commit('setRefreshToken', null);
          console.error('Login failed:', error);
          return Promise.reject(error);
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
          console.error('Token refresh failed:', error);
          return Promise.reject(error);
        });
    },
  },
});

export default store;



