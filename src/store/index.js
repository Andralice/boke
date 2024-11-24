import { createStore } from 'vuex';
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
      // 模拟登录请求
      const token = 'your-token-here'; // 假设这是从服务器获取的 token
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('setToken', null);
    },
  },
});