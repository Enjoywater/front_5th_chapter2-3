import { axiosInstance } from '@/shared/lib/axios';

export const getComments = (postId: string) => axiosInstance.get(`/comments/post/${postId}`);

export const deleteComment = (id: string) => axiosInstance.delete(`/comments/${id}`);

export const likeComment = ({ id, likes }: { id: number; likes: number }) =>
  axiosInstance.patch(`/comments/${id}`, {
    likes,
  });

export const addComment = (newComment: any) =>
  axiosInstance.post('/comments/add', {
    newComment,
  });

export const updateComment = ({ id, body }: { id: string; body: string }) =>
  axiosInstance.put(`/comments/${id}`, {
    body,
  });
