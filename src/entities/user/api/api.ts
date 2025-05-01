import { axiosInstance } from '@/shared/lib/axios';

export const getUsers = () => axiosInstance.get('/users?limit=0&select=username,image');

export const getUser = (id: string) => axiosInstance.get(`/users/${id}`);
