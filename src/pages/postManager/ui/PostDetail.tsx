import { ReactNode } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components';

import { DetailComments } from './DetailComments';

interface PostDetailProps {
  isOpen: boolean;
  onClickOpenChange: (value: boolean) => void;
  selectedPost: any;
  highlightText: (text: string, searchQuery: string) => ReactNode;
  comments: any;
  onClickAdd: (postId: string) => void;
  onClickLike: (id: string, postId: string) => void;
  onClickEdit: (comment: any) => void;
  onClickDelete: (id: string, postId: string) => void;
}

export const PostDetail = ({
  isOpen,
  onClickOpenChange,
  selectedPost,
  highlightText,
  comments,
  onClickAdd,
  onClickLike,
  onClickEdit,
  onClickDelete,
}: PostDetailProps) => {
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClickOpenChange}
    >
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>

          <DetailComments
            postId={selectedPost?.id}
            comments={comments}
            onClickLike={onClickLike}
            onClickDelete={onClickDelete}
            highlightText={highlightText}
            onClickAdd={onClickAdd}
            onClickEdit={onClickEdit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
