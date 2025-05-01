import { ThumbsUp } from 'lucide-react';

import { likeComment } from '@/entities/comment';
import { useCommentActions, useComments } from '@/shared/model/store';
import { Button } from '@/shared/ui';

export const LikeComment = ({ comment, postId }: { comment: any; postId: number }) => {
  const comments = useComments();
  const { setComments } = useCommentActions();

  const handleClickLike = async () => {
    try {
      const { data: likeCommentRes } = await likeComment({
        id: comment.id,
        likes: comments[postId].find((c) => c.id === comment.id).likes + 1,
      });

      setComments({
        ...comments,
        [postId]: comments[postId].map((comment) =>
          comment.id === likeCommentRes.id
            ? { ...likeCommentRes, likes: comment.likes + 1 }
            : comment,
        ),
      });
    } catch (error) {
      console.error('댓글 좋아요 오류:', error);
    }
  };

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={handleClickLike}
    >
      <ThumbsUp className='w-3 h-3' />
      <span className='ml-1 text-xs'>{comment.likes}</span>
    </Button>
  );
};
