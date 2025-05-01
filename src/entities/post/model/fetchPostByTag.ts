import { getUsers } from '@/entities/user';

import { getPostWithTags } from '../api';

export const fetchPostsByTag = async (tag: string) => {
  try {
    const { data: postsRes } = await getPostWithTags(tag);
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
    console.error('태그별 게시물 가져오기 오류:', error);
    throw error;
  }
};
