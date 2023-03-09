import axios from 'axios';

const baseURL = 'https://api.mercado-auto.com';
// const baseURL = 'http://192.168.1.5:8080/api';

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;
