import {
  useCommentActions,
  useComments,
  useDialogActions,
  useSelectedComment,
  useShowEditCommentDialog,
} from '@/shared/model/store';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from '@/shared/ui';

export const UpdateComment = () => {
  const comments = useComments();
  const selectedComment = useSelectedComment();
  const { setComments, setSelectedComment } = useCommentActions();

  const showEditCommentDialog = useShowEditCommentDialog();
  const { setShowEditCommentDialog } = useDialogActions();

  const updateComment = async () => {
    try {
      const response = await fetch(`/api/comments/${selectedComment.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ body: selectedComment.body }),
      });
      const data = await response.json();
      setComments({
        ...comments,
        [data.postId]: comments[data.postId].map((comment) =>
          comment.id === data.id ? data : comment,
        ),
      });

      setShowEditCommentDialog(false);
    } catch (error) {
      console.error('댓글 업데이트 오류:', error);
    }
  };

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
          <Textarea
            placeholder='댓글 내용'
            value={selectedComment?.body || ''}
            onChange={(e) => setSelectedComment({ ...selectedComment, body: e.target.value })}
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
