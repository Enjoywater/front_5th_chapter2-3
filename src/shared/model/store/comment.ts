import { create } from 'zustand';
import { Comment } from '../types';

interface CommentData {
  comments: Record<number, Comment[]>;
  selectedComment: Comment | null;
  newComment: Partial<Comment>;
}

interface CommentActions {
  actions: {
    setComments: (comments: Record<number, Comment[]>) => void;
    setSelectedComment: (comment: Comment | null) => void;
    setNewComment: (comment: Partial<Comment>) => void;
  };
}

type CommentState = CommentData & CommentActions;

const initialState: CommentData = {
  comments: {},
  selectedComment: null,
  newComment: {},
};

export const useCommentStore = create<CommentState>((set) => ({
  ...initialState,

  actions: {
    setComments: (comments: Record<number, Comment[]>) => set({ comments }),
    setSelectedComment: (comment: Comment | null) => set({ selectedComment: comment }),
    setNewComment: (comment: Partial<Comment>) => set({ newComment: comment }),
  },
}));

export const useComments = () => useCommentStore((state) => state.comments);
export const useSelectedComment = () => useCommentStore((state) => state.selectedComment);
export const useNewComment = () => useCommentStore((state) => state.newComment);

export const useCommentActions = () => useCommentStore((state) => state.actions);
