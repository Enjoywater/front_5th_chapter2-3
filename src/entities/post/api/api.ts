import axios from 'axios';

export const getPosts = ({ limit, skip }: { limit: number; skip: number }) =>
  axios.get(`/api/posts`, {
    params: {
      limit,
      skip,
    },
  });

export const getPostWithTags = (tag: string) => axios.get(`/api/posts/tag/${tag}`);
export const getPostWithSearch = (search: string) => axios.get(`/api/posts/search?q=${search}`);

export const addPost = (newPost: any) =>
  axios.post('/api/posts/add', newPost, {
    headers: { 'Content-Type': 'application/json' },
  });

export const deletePost = (id: number) =>
  axios.delete(`/api/posts/${id}`, {
    headers: { 'Content-Type': 'application/json' },
  });

export const updatePost = ({ id, selectedPost }: { id: number; selectedPost: any }) =>
  axios.put(`/api/posts/${id}`, selectedPost, {
    headers: { 'Content-Type': 'application/json' },
  });
