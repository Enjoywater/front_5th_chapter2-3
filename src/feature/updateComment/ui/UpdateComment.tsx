import { updateComment } from '@/entities/comment';
import {
  useCommentActions,
  useComments,
  useDialogActions,
  useSelectedComment,
} from '@/shared/model/store';
import { Button } from '@/shared/ui';

export const UpdateComment = () => {
  const comments = useComments();
  const selectedComment = useSelectedComment();

  const { setComments } = useCommentActions();
  const { setShowEditCommentDialog } = useDialogActions();

  const handleClickUpdate = async () => {
    try {
      const { data: updatedCommentRes } = await updateComment({
        id: selectedComment?.id.toString() || '',
        body: selectedComment?.body || '',
      });

      setComments({
        ...comments,
        [updatedCommentRes.postId]: comments[updatedCommentRes.postId].map((comment) =>
          comment.id === updatedCommentRes.id ? updatedCommentRes : comment,
        ),
      });

      setShowEditCommentDialog(false);
    } catch (error) {
      console.error('댓글 업데이트 오류:', error);
    }
  };

  return <Button onClick={handleClickUpdate}>댓글 업데이트</Button>;
};
