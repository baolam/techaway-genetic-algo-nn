import axios from 'axios';
import { API_SERVER } from './constants';

// Làm sao để thêm access_token vào đây?
const client = axios.create({
  baseURL: API_SERVER,
});

const refreshAccessToken = async () => {
  try {
    const response: any = await client.post('/user/refresh', {
      token: localStorage.getItem('refresh_token'),
    });
    const { accessToken } = response;
    localStorage.setItem('access_token', accessToken);
    return accessToken;
  } catch (err) {
    console.error(err);
  }
};

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

client.interceptors.response.use(
  (resp) => resp.data,
  async (error) => {
    const originalRequest = error.config;
    // Kiểm tra nếu lỗi là do token hết hạn (ví dụ: 401)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        // Cập nhật header Authorization với access_token mới
        axios.defaults.headers.common['Authorization'] =
          `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axios(originalRequest); // Gửi lại request gốc
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError);
        // Có thể chuyển hướng người dùng đến trang đăng nhập hoặc thông báo lỗi
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default client;
