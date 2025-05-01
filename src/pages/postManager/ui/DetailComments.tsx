import { Edit2, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/shared/ui';
import { highlightText } from '@/shared/utils';
import { LikeComment } from '@/feature/likeComment';

interface DetailCommentsProps {
  postId: string;
  comments: any[];
  onClickAdd: (postId: string) => void;
  onClickEdit: (comment: any) => void;
  onClickDelete: (id: string, postId: string) => void;
}

export const DetailComments = ({
  postId,
  comments,
  onClickAdd,
  onClickEdit,
  onClickDelete,
}: DetailCommentsProps) => {
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  return (
    <div className='mt-2'>
      <div className='flex items-center justify-between mb-2'>
        <h3 className='text-sm font-semibold'>댓글</h3>
        <Button
          size='sm'
          onClick={() => onClickAdd(postId)}
        >
          <Plus className='w-3 h-3 mr-1' />
          댓글 추가
        </Button>
      </div>
      <div className='space-y-1'>
        {comments[postId]?.map((comment) => (
          <div
            key={comment.id}
            className='flex items-center justify-between text-sm border-b pb-1'
          >
            <div className='flex items-center space-x-2 overflow-hidden'>
              <span className='font-medium truncate'>{comment.user.username}:</span>
              <span className='truncate'>{highlightText(comment.body, searchQuery)}</span>
            </div>
            <div className='flex items-center space-x-1'>
              <LikeComment
                comment={comment}
                postId={postId}
              />
              <Button
                variant='ghost'
                size='sm'
                onClick={() => onClickEdit(comment)}
              >
                <Edit2 className='w-3 h-3' />
              </Button>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => onClickDelete(comment.id, postId)}
              >
                <Trash2 className='w-3 h-3' />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
