import { getUser } from '@/entities/user';
import { useDialogActions, useUserActions } from '@/shared/model/store';

export const OpenUserDetail = ({ post }: { post: any }) => {
  const { setSelectedUser } = useUserActions();
  const { setShowUserDialog } = useDialogActions();

  const handleClickAuthor = async () => {
    try {
      const { data: userRes } = await getUser(post.author.id);

      setSelectedUser(userRes);
      setShowUserDialog(true);
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
    }
  };

  return (
    <div
      className='flex items-center space-x-2 cursor-pointer'
      onClick={handleClickAuthor}
    >
      <img
        src={post.author?.image}
        alt={post.author?.username}
        className='w-8 h-8 rounded-full'
      />
      <span>{post.author?.username}</span>
    </div>
  );
};
