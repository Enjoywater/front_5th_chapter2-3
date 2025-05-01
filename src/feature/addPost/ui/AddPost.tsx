import {
  useNewPost,
  usePostActions,
  useShowAddDialog,
  useDialogActions,
  usePosts,
} from '@/shared/model/store';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui';
import { Input, Textarea, Button } from '@/shared/ui';

export function AddPost() {
  const posts = usePosts();
  const newPost = useNewPost();
  const { setNewPost, setPosts } = usePostActions();

  const showAddDialog = useShowAddDialog();
  const { setShowAddDialog } = useDialogActions();

  const addPost = async () => {
    try {
      const response = await fetch('/api/posts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();

      setPosts([data, ...posts]);
      setShowAddDialog(false);
      setNewPost({ title: '', body: '', userId: 1 });
    } catch (error) {
      console.error('게시물 추가 오류:', error);
    }
  };

  return (
    <Dialog
      open={showAddDialog}
      onOpenChange={setShowAddDialog}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <Input
            placeholder='제목'
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder='내용'
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type='number'
            placeholder='사용자 ID'
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
