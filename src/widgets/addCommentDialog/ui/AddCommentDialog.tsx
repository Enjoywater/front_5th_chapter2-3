import { AddComment } from '@/feature/addComment';
import { AddCommentText } from '@/feature/addCommentText';
import { useDialogActions, useShowAddCommentDialog } from '@/shared/model/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui';

export const AddCommentDialog = () => {
  const showAddCommentDialog = useShowAddCommentDialog();

  const { setShowAddCommentDialog } = useDialogActions();

  return (
    <Dialog
      open={showAddCommentDialog}
      onOpenChange={setShowAddCommentDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <AddCommentText />
          <AddComment />
        </div>
      </DialogContent>
    </Dialog>
  );
};
