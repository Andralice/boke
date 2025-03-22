import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 3000000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 初始化Authorization头为空字符串
apiClient.defaults.headers.common['Authorization'] = '';
apiClient.defaults.headers.common['X-Operator-User'] = '';

// 请求拦截器
apiClient.interceptors.request.use(
  config => {
    // 获取存储在localStorage中的用户信息
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName'); // 添加获取userName

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    if (userName) { // 如果有userName，则添加到请求头
      config.headers['X-Operator-User'] = userName;
    }

    return config;
  }, 
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return apiClient(originalRequest); // 重试原始请求
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        // 可以在此处导航到登录页面或其他处理
        window.location.href = "/Login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// POST请求
export function Post(httpUrl, httpData = {}) {
  return apiClient.post(httpUrl, httpData);
}

// 登录函数示例
export function login(credentials) {
  return apiClient.post('/User/login', credentials)
    .then(response => {
      const token = response.data.token;
      const refreshToken = response.data.refreshToken; // 假设服务器返回refreshToken

      // 存储到 localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      return Promise.resolve(token);
    })
    .catch(error => {
      console.error('Login failed:', error.response ? error.response.data : error.message);
      return Promise.reject(error.response ? error.response.data : error.message);
    });
}

// 刷新access token
export function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    throw new Error('No refresh token found');
  }
  return apiClient.post('/refresh-token', { refreshToken })
    .then(response => {
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      return newToken;
    })
    .catch(error => {
      console.error('Token refresh failed:', error.response ? error.response.data : error.message);
      throw error;
    });
}

// 导出 apiClient
export { apiClient };



