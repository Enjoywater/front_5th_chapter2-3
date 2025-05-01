import { getComments } from '@/entities/comment';
import {
  useCommentActions,
  useComments,
  useDialogActions,
  usePostActions,
} from '@/shared/model/store';
import { Button } from '@/shared/ui';
import { MessageSquare } from 'lucide-react';

export const OpenPostDetail = ({ post }: { post: any }) => {
  const comments = useComments();

  const { setComments } = useCommentActions();
  const { setSelectedPost } = usePostActions();
  const { setShowPostDetailDialog } = useDialogActions();

  const handleClickPostComment = async () => {
    try {
      setSelectedPost(post);

      if (!comments[post.id]) {
        const { data: commentsRes } = await getComments(post.id);

        setComments({ ...comments, [post.id]: commentsRes.comments });
      }

      setShowPostDetailDialog(true);
    } catch (error) {
      console.error('댓글 가져오기 오류:', error);
    }
  };

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={handleClickPostComment}
    >
      <MessageSquare className='w-4 h-4' />
    </Button>
  );
};
