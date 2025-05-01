import { EditPostText } from '@/feature/editPostText';
import { UpdatePost } from '@/feature/updatePost';
import { useDialogActions, useShowEditDialog } from '@/shared/model/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui';

export const EditPostDialog = () => {
  const showEditDialog = useShowEditDialog();
  const { setShowEditDialog } = useDialogActions();

  return (
    <Dialog
      open={showEditDialog}
      onOpenChange={setShowEditDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <EditPostText />
          <UpdatePost />
        </div>
      </DialogContent>
    </Dialog>
  );
};
