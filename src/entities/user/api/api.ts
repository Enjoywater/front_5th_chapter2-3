import axios from 'axios';

export const getUsers = () => axios.get('/api/users?limit=0&select=username,image');

export const getUser = (id: string) => axios.get(`/api/users/${id}`);
