import { fetchPostsWithUsers, getPostWithSearch } from '@/entities/post';
import { useLimit, usePostActions, useSearchQuery, useSkip } from '@/shared/model/store';

export const useGetSearchPost = () => {
  const limit = useLimit();
  const skip = useSkip();
  const searchQuery = useSearchQuery();

  const { setPosts, setTotal, setLoading } = usePostActions();

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const { posts, total } = await fetchPostsWithUsers(limit, skip);

      setPosts(posts);
      setTotal(total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getSearchPosts = async () => {
    if (!searchQuery) {
      fetchPosts();

      return;
    }

    setLoading(true);

    try {
      const { data: postRes } = await getPostWithSearch(searchQuery);

      setPosts(postRes.posts);
      setTotal(postRes.total);
    } catch (error) {
      console.error('게시물 검색 오류:', error);
    }

    setLoading(false);
  };

  return {
    getSearchPosts,
  };
};
