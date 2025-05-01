import { UserInfo } from '@/feature/userInfo';
import { AddCommentDialog } from '@/widgets/addCommentDialog';
import { AddPostDialog } from '@/widgets/addPostDialog';
import { EditCommentDialog } from '@/widgets/editCommentDialog';
import { EditPostDialog } from '@/widgets/editPostDialog';
import { PostDetail } from '@/widgets/postDetail';

export const DialogContent = () => {
  return (
    <>
      <AddPostDialog />
      <EditPostDialog />

      <AddCommentDialog />
      <EditCommentDialog />

      <PostDetail />

      <UserInfo />
    </>
  );
};
