import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui';
import { highlightText } from '@/shared/utils';

import {
  useComments,
  useDialogActions,
  useSelectedPost,
  useShowPostDetailDialog,
} from '@/shared/model/store';
import { LikeComment } from '@/feature/likeComment';
import { OpenAddComment } from '@/feature/openAddComment';
import { OpenEditComment } from '@/feature/openEditComment';
import { DeleteComment } from '@/feature/deleteComment';

export const PostDetail = () => {
  const comments = useComments();
  const selectedPost = useSelectedPost();
  const showPostDetailDialog = useShowPostDetailDialog();

  const { setShowPostDetailDialog } = useDialogActions();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  return (
    <Dialog
      open={showPostDetailDialog}
      onOpenChange={setShowPostDetailDialog}
    >
      <DialogContent className='max-w-3xl'>
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className='space-y-4'>
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>

          <div className='mt-2'>
            <OpenAddComment postId={selectedPost?.id} />

            <div className='space-y-1'>
              {selectedPost?.id &&
                comments[selectedPost?.id]?.map((comment) => (
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
                        postId={selectedPost?.id}
                      />
                      <OpenEditComment comment={comment} />
                      <DeleteComment
                        comment={comment}
                        postId={selectedPost?.id}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
