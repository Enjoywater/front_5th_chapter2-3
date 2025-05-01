import { Trash2 } from 'lucide-react';

import { deletePost } from '@/entities/post';
import { usePostActions, usePosts } from '@/shared/model/store';
import { Button } from '@/shared/ui';

export const DeletePost = ({ id }: { id: number }) => {
  const posts = usePosts();

  const { setPosts } = usePostActions();

  const handleClickDelete = async () => {
    try {
      await deletePost(id);

      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('게시물 삭제 오류:', error);
    }
  };

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={handleClickDelete}
    >
      <Trash2 className='w-4 h-4' />
    </Button>
  );
};
