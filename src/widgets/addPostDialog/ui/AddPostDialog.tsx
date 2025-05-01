import { AddPost } from '@/feature/addPost';
import { AddPostText } from '@/feature/addPostText';
import { useShowAddDialog, useDialogActions } from '@/shared/model/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui';

export function AddPostDialog() {
  const showAddDialog = useShowAddDialog();
  const { setShowAddDialog } = useDialogActions();

  return (
    <Dialog
      open={showAddDialog}
      onOpenChange={setShowAddDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <AddPostText />
          <AddPost />
        </div>
      </DialogContent>
    </Dialog>
  );
}
