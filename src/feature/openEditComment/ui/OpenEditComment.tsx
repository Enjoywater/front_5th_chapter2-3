import { useCommentActions, useDialogActions } from '@/shared/model/store';
import { Button } from '@/shared/ui';
import { Edit2 } from 'lucide-react';

export const OpenEditComment = ({ comment }: { comment: any }) => {
  const { setSelectedComment } = useCommentActions();
  const { setShowEditCommentDialog } = useDialogActions();

  const handleClickEditComment = () => {
    setSelectedComment(comment);
    setShowEditCommentDialog(true);
  };

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={handleClickEditComment}
    >
      <Edit2 className='w-3 h-3' />
    </Button>
  );
};
