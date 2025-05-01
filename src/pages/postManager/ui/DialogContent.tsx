import { AddPostDialog } from '@/widgets/addPostDialog';
import { EditPostDialog } from '@/widgets/editPostDialog';
import { AddCommentDialog } from '@/widgets/addCommentDialog';
import { UserInfo } from '@/feature/userInfo';
import { EditCommentDialog } from '@/widgets/editCommentDialog';
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
