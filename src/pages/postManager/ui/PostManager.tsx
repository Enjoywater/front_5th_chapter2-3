import { useEffect } from 'react';

import { Plus } from 'lucide-react';

import {
  useLimit,
  useLoading,
  usePostActions,
  useSelectedTag,
  useSkip,
  useSortBy,
  useSortOrder,
  useTagActions,
  useDialogActions,
} from '@/shared/model/store';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { Button } from '@/shared/ui';

import { AddPostDialog } from '@/widgets/addPostDialog';
import { EditPostDialog } from '@/widgets/editPostDialog';
import { AddCommentDialog } from '@/widgets/addCommentDialog';
import { SortByTag } from '@/feature/sortByTag';
import { SortByValue } from '@/feature/sortByValue';
import { SortByOrder } from '@/feature/sortByOrder';
import { Pagination } from '@/feature/pagination';
import { UserInfo } from '@/feature/userInfo';
import { useQueryParams } from '@/shared/hooks/useQueryParams';
import { SearchPost } from '@/feature/searchPost';
import { fetchPostsByTag, fetchPostsWithUsers } from '@/entities/post';
import { EditCommentDialog } from '@/widgets/editCommentDialog';
import { PostTable } from '@/widgets/postTable';
import { PostDetail } from '@/widgets/postDetail';

export const PostsManager = () => {
  useQueryParams();

  const loading = useLoading();

  const { setPosts, setTotal, setLoading } = usePostActions();

  const skip = useSkip();
  const limit = useLimit();
  const sortBy = useSortBy();
  const sortOrder = useSortOrder();

  const selectedTag = useSelectedTag();

  const { setTags } = useTagActions();

  const { setShowAddDialog } = useDialogActions();

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

  // 태그 가져오기
  const fetchTags = async () => {
    try {
      const response = await fetch('/api/posts/tags');
      const data = await response.json();
      setTags(data);
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

  return (
    <main className='flex-grow container mx-auto px-4 py-8'>
      <Card className='w-full max-w-6xl mx-auto'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>게시물 관리자</span>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className='w-4 h-4 mr-2' />
              게시물 추가
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-4'>
              <SearchPost />
              <SortByTag />
              <SortByValue />
              <SortByOrder />
            </div>

            {loading ? <div className='flex justify-center p-4'>로딩 중...</div> : <PostTable />}

            <Pagination />
          </div>
        </CardContent>

        <AddPostDialog />
        <EditPostDialog />

        <AddCommentDialog />
        <EditCommentDialog />

        <PostDetail />

        <UserInfo />
      </Card>
    </main>
  );
};
