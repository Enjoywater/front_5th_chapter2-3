import { useEffect } from 'react';

import { fetchPostsByTag, fetchPostsWithUsers } from '@/entities/post';
import { getPostTags } from '@/entities/tag';
import {
  useLimit,
  useLoading,
  usePostActions,
  useSelectedTag,
  useSkip,
  useSortBy,
  useSortOrder,
  useTagActions,
} from '@/shared/model/store';

export const usePosts = () => {
  const loading = useLoading();

  const { setPosts, setTotal, setLoading } = usePostActions();

  const skip = useSkip();
  const limit = useLimit();
  const sortBy = useSortBy();
  const sortOrder = useSortOrder();

  const selectedTag = useSelectedTag();

  const { setTags } = useTagActions();

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const { posts, total } = await fetchPostsWithUsers({ limit, skip });

      setPosts(posts);
      setTotal(total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const { data: postTagsRes } = await getPostTags();

      setTags(postTagsRes);
    } catch (error) {
      console.error('태그 가져오기 오류:', error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag);
    } else {
      fetchPosts();
    }
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  return { loading };
};
