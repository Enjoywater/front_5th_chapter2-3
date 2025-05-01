import { create } from 'zustand';

interface DialogData {
  showAddDialog: boolean;
  showEditDialog: boolean;
  showAddCommentDialog: boolean;
  showEditCommentDialog: boolean;
  showPostDetailDialog: boolean;
  showUserDialog: boolean;
}

interface DialogActions {
  actions: {
    setShowAddDialog: (show: boolean) => void;
    setShowEditDialog: (show: boolean) => void;
    setShowAddCommentDialog: (show: boolean) => void;
    setShowEditCommentDialog: (show: boolean) => void;
    setShowPostDetailDialog: (show: boolean) => void;
    setShowUserDialog: (show: boolean) => void;
    closeAllDialogs: () => void;
  };
}

type DialogState = DialogData & DialogActions;

const initialState: DialogData = {
  showAddDialog: false,
  showEditDialog: false,
  showAddCommentDialog: false,
  showEditCommentDialog: false,
  showPostDetailDialog: false,
  showUserDialog: false,
};

export const useDialogStore = create<DialogState>((set) => ({
  ...initialState,

  actions: {
    setShowAddDialog: (show: boolean) => set({ showAddDialog: show }),
    setShowEditDialog: (show: boolean) => set({ showEditDialog: show }),
    setShowAddCommentDialog: (show: boolean) => set({ showAddCommentDialog: show }),
    setShowEditCommentDialog: (show: boolean) => set({ showEditCommentDialog: show }),
    setShowPostDetailDialog: (show: boolean) => set({ showPostDetailDialog: show }),
    setShowUserDialog: (show: boolean) => set({ showUserDialog: show }),
    closeAllDialogs: () => set(initialState),
  },
}));

export const useShowAddDialog = () => useDialogStore((state) => state.showAddDialog);
export const useShowEditDialog = () => useDialogStore((state) => state.showEditDialog);
export const useShowAddCommentDialog = () => useDialogStore((state) => state.showAddCommentDialog);
export const useShowEditCommentDialog = () =>
  useDialogStore((state) => state.showEditCommentDialog);
export const useShowPostDetailDialog = () => useDialogStore((state) => state.showPostDetailDialog);
export const useShowUserDialog = () => useDialogStore((state) => state.showUserDialog);

export const useDialogActions = () => useDialogStore((state) => state.actions);
