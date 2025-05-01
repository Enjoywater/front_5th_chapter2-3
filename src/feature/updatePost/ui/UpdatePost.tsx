import { updatePost } from '@/entities/post';
import { useDialogActions, usePostActions, usePosts, useSelectedPost } from '@/shared/model/store';
import { Button } from '@/shared/ui';

export const UpdatePost = () => {
  const posts = usePosts();
  const selectedPost = useSelectedPost();

  const { setPosts } = usePostActions();
  const { setShowEditDialog } = useDialogActions();

  const handleClickUpdate = async () => {
    try {
      if (!selectedPost) return;

      const { data: updatedPostRes } = await updatePost({ id: selectedPost.id, selectedPost });

      setPosts(posts.map((post) => (post.id === updatedPostRes.id ? updatedPostRes : post)));
      setShowEditDialog(false);
    } catch (error) {
      console.error('게시물 업데이트 오류:', error);
    }
  };

  return <Button onClick={handleClickUpdate}>게시물 업데이트</Button>;
};
