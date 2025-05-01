import { getUsers } from '@/entities/user';

import { getPosts } from '../api';

export const fetchPostsWithUsers = async ({ limit, skip }: { limit: number; skip: number }) => {
  try {
    const { data: postsRes } = await getPosts({ limit, skip });
    const { data: usersRes } = await getUsers();

    const postsWithUsers = postsRes.posts.map((post) => ({
      ...post,
      author: usersRes.users.find((user) => user.id === post.userId),
    }));

    return {
      posts: postsWithUsers,
      total: postsRes.total,
    };
  } catch (error) {
    console.error('게시물 가져오기 오류:', error);
    throw error;
  }
};
