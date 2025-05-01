import axios from 'axios';

export const getComments = (postId: string) => axios.get(`/api/comments/post/${postId}`);

export const deleteComment = (id: string) => axios.delete(`/api/comments/${id}`);

export const likeComment = ({ id, likes }: { id: number; likes: number }) =>
  axios.patch(`/api/comments/${id}`, {
    likes,
  });

export const addComment = (newComment: any) =>
  axios.post('/api/comments/add', {
    newComment,
  });

export const updateComment = ({ id, body }: { id: string; body: string }) =>
  axios.put(`/api/comments/${id}`, {
    body,
  });
