import { fetchPostsByTag, fetchPostsWithUsers } from '@/entities/post';
import { useLimit, usePostActions, useSkip, useTagActions } from '@/shared/model/store';
import { useNavigate } from 'react-router-dom';

export const useGetTagPost = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams();

  const limit = useLimit();
  const skip = useSkip();

  const { setPosts, setTotal, setLoading } = usePostActions();
  const { setSelectedTag } = useTagActions();

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

  const getTagPosts = async (tag: string) => {
    if (!tag || tag === 'all') {
      fetchPosts();

      return;
    }
    setLoading(true);

    setSelectedTag(tag);
    params.set('tag', tag);

    try {
      const { posts, total } = await fetchPostsByTag(tag);

      setPosts(posts);
      setTotal(total);

      navigate(`?${params.toString()}`);
    } catch (error) {
      console.error('태그별 게시물 가져오기 오류:', error);
    }

    setLoading(false);
  };

  return {
    getTagPosts,
  };
};
