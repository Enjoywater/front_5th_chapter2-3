import { useNavigate } from 'react-router-dom';

import { usePostActions, useSelectedTag, useTagActions, useTags } from '@/shared/model/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui';

export const SortByTag = () => {
  const params = new URLSearchParams();
  const navigate = useNavigate();

  const tags = useTags();
  const selectedTag = useSelectedTag();
  const { setSelectedTag } = useTagActions();

  const { setPosts, setTotal, setLoading } = usePostActions();

  const fetchPosts = () => {
    setLoading(true);
    let postsData;
    let usersData;

    fetch(`/api/posts?limit=${limit}&skip=${skip}`)
      .then((response) => response.json())
      .then((data) => {
        postsData = data;
        return fetch('/api/users?limit=0&select=username,image');
      })
      .then((response) => response.json())
      .then((users) => {
        usersData = users.users;
        const postsWithUsers = postsData.posts.map((post) => ({
          ...post,
          author: usersData.find((user) => user.id === post.userId),
        }));
        setPosts(postsWithUsers);
        setTotal(postsData.total);
      })
      .catch((error) => {
        console.error('게시물 가져오기 오류:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchPostsByTag = async (tag) => {
    if (!tag || tag === 'all') {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const [postsResponse, usersResponse] = await Promise.all([
        fetch(`/api/posts/tag/${tag}`),
        fetch('/api/users?limit=0&select=username,image'),
      ]);
      const postsData = await postsResponse.json();
      const usersData = await usersResponse.json();

      const postsWithUsers = postsData.posts.map((post) => ({
        ...post,
        author: usersData.users.find((user) => user.id === post.userId),
      }));

      setPosts(postsWithUsers);
      setTotal(postsData.total);
    } catch (error) {
      console.error('태그별 게시물 가져오기 오류:', error);
    }
    setLoading(false);
  };

  return (
    <Select
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value);
        fetchPostsByTag(value);
        // updateURL();
        params.set('tag', selectedTag);
        navigate(`?${params.toString()}`);
      }}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='태그 선택' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem
            key={tag.url}
            value={tag.slug}
          >
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
