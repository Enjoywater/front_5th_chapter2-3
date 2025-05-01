import { axiosInstance } from '@/shared/lib/axios';

export const getPostTags = async () => await axiosInstance.get('/posts/tags');
