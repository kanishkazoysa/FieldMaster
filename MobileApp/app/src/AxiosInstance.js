import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AxiosInstance = axios.create({
  baseURL: "http://172.20.10.2:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;