import {
  useCommentActions,
  useComments,
  useDialogActions,
  useNewComment,
  useShowAddCommentDialog,
} from '@/shared/model/store';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from '@/shared/ui';

export const AddComment = () => {
  const comments = useComments();
  const newComment = useNewComment();
  const { setComments, setNewComment } = useCommentActions();

  const showAddCommentDialog = useShowAddCommentDialog();
  const { setShowAddCommentDialog } = useDialogActions();

  const addComment = async () => {
    try {
      const response = await fetch('/api/comments/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment),
      });
      const data = await response.json();
      setComments({
        ...comments,
        [data.postId]: [...(comments[data.postId] || []), data],
      });

      setShowAddCommentDialog(false);
      setNewComment({ body: '', postId: null, userId: 1 });
    } catch (error) {
      console.error('댓글 추가 오류:', error);
    }
  };

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
          <Textarea
            placeholder='댓글 내용'
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
