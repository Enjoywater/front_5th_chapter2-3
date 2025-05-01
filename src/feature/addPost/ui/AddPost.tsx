import { addPost } from '@/entities/post';
import { useDialogActions, useNewPost, usePostActions, usePosts } from '@/shared/model/store';
import { Button } from '@/shared/ui';

export const AddPost = () => {
  const posts = usePosts();
  const newPost = useNewPost();

  const { setNewPost, setPosts } = usePostActions();
  const { setShowAddDialog } = useDialogActions();

  const handleClickAddPost = async () => {
    try {
      const { data: addPostRes } = await addPost(newPost);

      setPosts([addPostRes, ...posts]);
      setShowAddDialog(false);
      setNewPost({ title: '', body: '', userId: 1 });
    } catch (error) {
      console.error('게시물 추가 오류:', error);
    }
  };
  return <Button onClick={handleClickAddPost}>게시물 추가</Button>;
};
