import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AxiosInstance = axios.create({
  baseURL: "https://field-master-backen.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
