import { useCommentActions, useNewComment } from '@/shared/model/store';
import { Textarea } from '@/shared/ui';

export const AddCommentText = () => {
  const newComment = useNewComment();

  const { setNewComment } = useCommentActions();

  return (
    <Textarea
      placeholder='댓글 내용'
      value={newComment.body}
      onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
    />
  );
};
