import { create } from 'zustand';

import { Tag } from '../types';

interface TagData {
  tags: Tag[];
  selectedTag: string;
}

interface TagActions {
  actions: {
    setTags: (tags: Tag[]) => void;
    setSelectedTag: (tag: string) => void;
  };
}

type TagState = TagData & TagActions;

const initialState: TagData = {
  tags: [],
  selectedTag: '',
};

export const useTagStore = create<TagState>((set) => ({
  ...initialState,

  actions: {
    setTags: (tags: Tag[]) => set({ tags }),
    setSelectedTag: (tag: string) => set({ selectedTag: tag }),
  },
}));

export const useTags = () => useTagStore((state) => state.tags);
export const useSelectedTag = () => useTagStore((state) => state.selectedTag);

export const useTagActions = () => useTagStore((state) => state.actions);
