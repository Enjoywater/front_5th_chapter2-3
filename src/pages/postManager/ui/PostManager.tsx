import { useEffect } from 'react';

import { Plus } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  useCommentActions,
  useComments,
  useLimit,
  useLoading,
  usePostActions,
  usePosts,
  useSelectedPost,
  useSelectedTag,
  useSkip,
  useSortBy,
  useSortOrder,
  useTagActions,
  useDialogActions,
  useShowPostDetailDialog,
  useNewComment,
} from '@/shared/model/store';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { Button } from '@/shared/ui';

import { PostDetail } from './PostDetail';
import { PostTable } from './PostTable';

import { AddPostDialog } from '@/widgets/addPostDialog';
import { EditPostDialog } from '@/widgets/editPostDialog';
import { AddComment } from '@/feature/addComment';
import { UpdateComment } from '@/feature/editComment';
import { SortByTag } from '@/feature/sortByTag';
import { SortByValue } from '@/feature/sortByValue';
import { SortByOrder } from '@/feature/sortByOrder';
import { Pagination } from '@/feature/pagination';
import { UserInfo } from '@/feature/userInfo';
import { useQueryParams } from '@/shared/hooks/useQueryParams';
import { SearchPost } from '@/feature/searchPost';
import { fetchPostsByTag, fetchPostsWithUsers } from '@/entities/post';

export const PostsManager = () => {
  useQueryParams();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const posts = usePosts();
  const selectedPost = useSelectedPost();
  const loading = useLoading();

  const { setPosts, setTotal, setLoading } = usePostActions();

  const skip = useSkip();
  const limit = useLimit();
  const sortBy = useSortBy();
  const sortOrder = useSortOrder();

  const selectedTag = useSelectedTag();

  const { setTags, setSelectedTag } = useTagActions();

  const comments = useComments();
  const newComment = useNewComment();

  const { setComments, setSelectedComment, setNewComment } = useCommentActions();

  const showPostDetailDialog = useShowPostDetailDialog();

  const {
    setShowAddDialog,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    setShowPostDetailDialog,
  } = useDialogActions();

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

  // 댓글 삭제
  const deleteComment = async (id, postId) => {
    try {
      await fetch(`/api/comments/${id}`, {
        method: 'DELETE',
      });
      setComments({
        ...comments,
        [postId]: comments[postId].filter((comment) => comment.id !== id),
      });
    } catch (error) {
      console.error('댓글 삭제 오류:', error);
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

  const handleClickTag = (tag: string) => {
    setSelectedTag(tag);

    if (selectedTag) queryParams.set('tag', selectedTag);

    navigate(`?${queryParams.toString()}`);
  };

  const handleClickAddComment = (postId: string) => {
    setNewComment({ ...newComment, postId });
    setShowAddCommentDialog(true);
  };

  const handleClickEditComment = (comment: any) => {
    setSelectedComment(comment);
    setShowEditCommentDialog(true);
  };

  // PostManagerPage return
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
            {/* 검색 및 필터 컨트롤 widget*/}
            <div className='flex gap-4'>
              <SearchPost />
              <SortByTag />
              <SortByValue />
              <SortByOrder />
            </div>

            {/* 게시물 테이블 */}
            {loading ? (
              <div className='flex justify-center p-4'>로딩 중...</div>
            ) : (
              <PostTable
                posts={posts}
                selectedTag={selectedTag}
                onClickTag={handleClickTag}
              />
            )}

            <Pagination />
          </div>
        </CardContent>

        <AddPostDialog />
        <EditPostDialog />

        <AddComment />
        <UpdateComment />

        {/* 게시물 상세 보기 대화상자 */}
        <PostDetail
          comments={comments}
          isOpen={showPostDetailDialog}
          onClickOpenChange={setShowPostDetailDialog}
          selectedPost={selectedPost}
          onClickAdd={handleClickAddComment}
          onClickEdit={handleClickEditComment}
          onClickDelete={deleteComment}
        />

        <UserInfo />
      </Card>
    </main>
  );
};
