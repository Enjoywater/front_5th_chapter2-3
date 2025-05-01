import { addComment } from '@/entities/comment';
import {
  useCommentActions,
  useComments,
  useDialogActions,
  useNewComment,
} from '@/shared/model/store';
import { Button } from '@/shared/ui';

export const AddComment = () => {
  const comments = useComments();
  const newComment = useNewComment();

  const { setComments, setNewComment } = useCommentActions();
  const { setShowAddCommentDialog } = useDialogActions();

  const handleClickAdd = async () => {
    try {
      const { data: commentRes } = await addComment(newComment);

      setComments({
        ...comments,
        [commentRes.postId]: [...(comments[commentRes.postId] || []), commentRes],
      });

      setShowAddCommentDialog(false);
      setNewComment({ body: '', postId: null, userId: 1 });
    } catch (error) {
      console.error('댓글 추가 오류:', error);
    }
  };

  return <Button onClick={handleClickAdd}>댓글 추가</Button>;
};
