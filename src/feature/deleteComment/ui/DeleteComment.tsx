import { deleteComment } from '@/entities/comment';
import { useCommentActions, useComments } from '@/shared/model/store';
import { Button } from '@/shared/ui';
import { Trash2 } from 'lucide-react';

export const DeleteComment = ({ comment, postId }: { comment: any; postId: string }) => {
  const comments = useComments();

  const { setComments } = useCommentActions();

  const handleClickDelete = async () => {
    try {
      await deleteComment(comment.id);

      setComments({
        ...comments,
        [postId]: comments[postId].filter((comment) => comment.id !== id),
      });
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
    }
  };
  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={handleClickDelete}
    >
      <Trash2 className='w-3 h-3' />
    </Button>
  );
};
