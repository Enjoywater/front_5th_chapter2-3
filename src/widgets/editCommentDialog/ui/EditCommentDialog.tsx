import { UpdateComment } from '@/feature/updateComment';
import { UpdateCommentText } from '@/feature/updateCommentText';
import { useDialogActions, useShowEditCommentDialog } from '@/shared/model/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui';

export const EditCommentDialog = () => {
  const showEditCommentDialog = useShowEditCommentDialog();
  const { setShowEditCommentDialog } = useDialogActions();

  return (
    <Dialog
      open={showEditCommentDialog}
      onOpenChange={setShowEditCommentDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <UpdateCommentText />
          <UpdateComment />
        </div>
      </DialogContent>
    </Dialog>
  );
};
