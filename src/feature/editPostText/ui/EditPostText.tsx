import { usePostActions, useSelectedPost } from '@/shared/model/store';
import { Input, Textarea } from '@/shared/ui';

export const EditPostText = () => {
  const selectedPost = useSelectedPost();
  const { setSelectedPost } = usePostActions();

  return (
    <>
      <Input
        placeholder='제목'
        value={selectedPost?.title || ''}
        onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
      />
      <Textarea
        rows={15}
        placeholder='내용'
        value={selectedPost?.body || ''}
        onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
      />
    </>
  );
};
