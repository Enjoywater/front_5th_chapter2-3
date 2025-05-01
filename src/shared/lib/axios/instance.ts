import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD ? 'https://dummyjson.com' : '/api',
});
