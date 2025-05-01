import { axiosInstance } from '@/shared/lib/axios';

export const getPosts = ({ limit, skip }: { limit: number; skip: number }) =>
  axiosInstance.get(`/posts`, {
    params: {
      limit,
      skip,
    },
  });

export const getPostWithTags = (tag: string) => axiosInstance.get(`/posts/tag/${tag}`);
export const getPostWithSearch = (search: string) => axiosInstance.get(`/posts/search?q=${search}`);

export const addPost = (newPost: any) =>
  axiosInstance.post('/posts/add', newPost, {
    headers: { 'Content-Type': 'application/json' },
  });

export const deletePost = (id: number) =>
  axiosInstance.delete(`/posts/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  });

export const updatePost = ({ id, selectedPost }: { id: number; selectedPost: any }) =>
  axiosInstance.put(`/posts/${id}`, selectedPost, {
    headers: { 'Content-Type': 'application/json' },
  });
