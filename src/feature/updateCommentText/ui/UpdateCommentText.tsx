import { useCommentActions, useSelectedComment } from '@/shared/model/store';
import { Textarea } from '@/shared/ui';

export const UpdateCommentText = () => {
  const selectedComment = useSelectedComment();
  const { setSelectedComment } = useCommentActions();

  return (
    <Textarea
      placeholder='댓글 내용'
      value={selectedComment?.body || ''}
      onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
    />
  );
};
