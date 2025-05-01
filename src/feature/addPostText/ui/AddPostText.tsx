import { useNewPost, usePostActions } from '@/shared/model/store';
import { Input, Textarea } from '@/shared/ui';

export const AddPostText = () => {
  const newPost = useNewPost();
  const { setNewPost } = usePostActions();

  return (
    <>
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
    </>
  );
};
