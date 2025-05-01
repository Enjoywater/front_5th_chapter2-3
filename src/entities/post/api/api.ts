import axios from 'axios';

export const getPosts = (skip: number, limit: number) =>
  axios.get(`/api/posts`, {
    params: {
      skip,
      limit,
    },
  });

export const getPostWithTags = (tag: string) => axios.get(`/api/posts/tag/${tag}`);
export const getPostWithSearch = (search: string) => axios.get(`/api/posts/search?q=${search}`);

export const addPost = (newPost: any) =>
  axios.post('/api/posts/add', newPost, {
    headers: { 'Content-Type': 'application/json' },
  });

export const deletePost = (id: string) =>
  axios.delete(`/api/posts/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  });
