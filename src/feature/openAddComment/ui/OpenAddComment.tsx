import { Plus } from 'lucide-react';
import { useCommentActions, useDialogActions, useNewComment } from '@/shared/model/store';
import { Button } from '@/shared/ui';

export const OpenAddComment = ({ postId }: { postId: number }) => {
  const newComment = useNewComment();

  const { setNewComment } = useCommentActions();
  const { setShowAddCommentDialog } = useDialogActions();

  const handleClickAddComment = () => {
    setNewComment({ ...newComment, postId: Number(postId) });
    setShowAddCommentDialog(true);
  };

  return (
    <div className='flex items-center justify-between mb-2'>
      <h3 className='text-sm font-semibold'>댓글</h3>
      <Button
        size='sm'
        onClick={handleClickAddComment}
      >
        <Plus className='w-3 h-3 mr-1' />
        댓글 추가
      </Button>
    </div>
  );
};
