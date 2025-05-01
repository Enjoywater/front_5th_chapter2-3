import { create } from 'zustand';

import type { NewPost, Post, PostWithAuthor } from '../types';

interface PostData {
  posts: PostWithAuthor[];
  total: number;
  selectedPost: Post | null;
  loading: boolean;
  newPost: NewPost;
}

interface PostActions {
  actions: {
    setPosts: (posts: PostWithAuthor[]) => void;
    setTotal: (total: number) => void;
    setSelectedPost: (selectedPost: Post) => void;
    setLoading: (loading: boolean) => void;
    setNewPost: (newPost: NewPost) => void;
  };
}

type PostState = PostData & PostActions;

const initialState: PostData = {
  posts: [],
  total: 0,
  selectedPost: null,
  loading: false,
  newPost: { title: '', body: '', userId: 1 },
};

export const usePostStore = create<PostState>((set) => ({
  ...initialState,

  actions: {
    setPosts: (posts: PostWithAuthor[]) => set({ posts }),
    setTotal: (total: number) => set({ total }),
    setSelectedPost: (selectedPost: Post) => set({ selectedPost }),
    setLoading: (loading: boolean) => set({ loading }),
    setNewPost: (newPost: NewPost) => set({ newPost }),
  },
}));

export const usePosts = () => usePostStore((state) => state.posts);
export const useTotal = () => usePostStore((state) => state.total);
export const useSelectedPost = () => usePostStore((state) => state.selectedPost);
export const useLoading = () => usePostStore((state) => state.loading);
export const useNewPost = () => usePostStore((state) => state.newPost);

export const usePostActions = () => usePostStore((state) => state.actions);
