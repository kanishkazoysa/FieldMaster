import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: "http://192.168.1.2:5000",
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('UserToken');
    if (token) {
      config.headers.authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
