import { create } from 'zustand';
import type { User } from '../types';

interface UserData {
  selectedUser: User | null;
}

interface UserActions {
  actions: {
    setSelectedUser: (user: User | null) => void;
  };
}

type UserState = UserData & UserActions;

const initialState: UserData = {
  selectedUser: null,
};

export const useUserStore = create<UserState>((set) => ({
  ...initialState,

  actions: {
    setSelectedUser: (selectedUser: User | null) => set({ selectedUser }),
  },
}));

export const useSelectedUser = () => useUserStore((state) => state.selectedUser);

export const useUserActions = () => useUserStore((state) => state.actions);
