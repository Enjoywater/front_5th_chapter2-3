import { create } from 'zustand';

interface FilterData {
  skip: number;
  limit: number;
  sortBy: string;
  sortOrder: string;
  searchQuery: string;
}

interface FilterActions {
  actions: {
    setSkip: (skip: number) => void;
    setLimit: (limit: number) => void;
    setSortBy: (sortBy: string) => void;
    setSortOrder: (sortOrder: string) => void;
    setSearchQuery: (searchQuery: string) => void;
  };
}

type FilterState = FilterData & FilterActions;

const initialState: FilterData = {
  skip: 0,
  limit: 10,
  sortBy: '',
  sortOrder: 'asc',
  searchQuery: '',
};

export const usePostFilterStore = create<FilterState>((set) => ({
  ...initialState,

  actions: {
    setSkip: (skip: number) => set({ skip }),
    setLimit: (limit: number) => set({ limit }),
    setSortBy: (sortBy: string) => set({ sortBy }),
    setSortOrder: (sortOrder: string) => set({ sortOrder }),
    setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  },
}));

export const useSkip = () => usePostFilterStore((state) => state.skip);
export const useLimit = () => usePostFilterStore((state) => state.limit);
export const useSortBy = () => usePostFilterStore((state) => state.sortBy);
export const useSortOrder = () => usePostFilterStore((state) => state.sortOrder);
export const useSearchQuery = () => usePostFilterStore((state) => state.searchQuery);

export const usePostFilterActions = () => usePostFilterStore((state) => state.actions);
