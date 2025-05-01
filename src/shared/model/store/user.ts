import { create } from 'zustand';
import { SelectedUser } from '../types';

interface UserData {
  selectedUser: SelectedUser | null;
}

interface UserActions {
  actions: {
    setSelectedUser: (user: SelectedUser | null) => void;
  };
}

type UserState = UserData & UserActions;

const initialState: UserData = {
  selectedUser: null,
};

export const useUserStore = create<UserState>((set) => ({
  ...initialState,

  actions: {
    setSelectedUser: (selectedUser: SelectedUser | null) => set({ selectedUser }),
  },
}));

export const useSelectedUser = () => useUserStore((state) => state.selectedUser);

export const useUserActions = () => useUserStore((state) => state.actions);
