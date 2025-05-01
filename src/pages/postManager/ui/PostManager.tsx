import { useEffect, useState } from 'react';

import { Plus, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import {
  useCommentActions,
  useComments,
  useLimit,
  useLoading,
  usePostActions,
  usePostFilterActions,
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
  useUserActions,
} from '@/shared/model/store';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { Button } from '@/shared/ui';
import { Input } from '@/shared/ui';

import { PostDetail } from './PostDetail';
import { PostTable } from './PostTable';

import { AddPost } from '@/feature/addPost';
import { EditPost } from '@/feature/editPost';
import { AddComment } from '@/feature/addComment';
import { UpdateComment } from '@/feature/editComment';
import { SortByTag } from '@/feature/sortByTag';
import { SortByValue } from '@/feature/sortByValue';
import { SortByOrder } from '@/feature/sortByOrder';
import { Pagination } from '@/feature/pagination';
import { UserInfo } from '@/feature/userInfo';

export const PostsManager = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // 전역상태
  const posts = usePosts();
  const selectedPost = useSelectedPost();
  const loading = useLoading();

  const { setPosts, setTotal, setSelectedPost, setLoading } = usePostActions();

  const skip = useSkip();
  const limit = useLimit();
  const sortBy = useSortBy();
  const sortOrder = useSortOrder();

  const { setSkip, setLimit, setSortBy, setSortOrder } = usePostFilterActions();

  const selectedTag = useSelectedTag();

  const { setTags, setSelectedTag } = useTagActions();

  const comments = useComments();
  const newComment = useNewComment();

  const { setComments, setSelectedComment, setNewComment } = useCommentActions();

  const showPostDetailDialog = useShowPostDetailDialog();

  const {
    setShowAddDialog,
    setShowEditDialog,
    setShowAddCommentDialog,
    setShowEditCommentDialog,
    setShowPostDetailDialog,
    setShowUserDialog,
  } = useDialogActions();

  const { setSelectedUser } = useUserActions();

  const [searchQuery, setSearchQuery] = useState(queryParams.get('search') || ''); // ! 보류

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams();
    if (skip) params.set('skip', skip.toString());
    if (limit) params.set('limit', limit.toString());
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);
    if (selectedTag) params.set('tag', selectedTag);
    navigate(`?${params.toString()}`);
  };

  // 게시물 가져오기
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

  // 게시물 검색
  const searchPosts = async () => {
    if (!searchQuery) {
      fetchPosts();
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/posts/search?q=${searchQuery}`);
      const data = await response.json();
      setPosts(data.posts);
      setTotal(data.total);
    } catch (error) {
      console.error('게시물 검색 오류:', error);
    }
    setLoading(false);
  };

  // 태그별 게시물 가져오기
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

  // 게시물 삭제
  const deletePost = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error('게시물 삭제 오류:', error);
    }
  };

  // 댓글 가져오기
  const fetchComments = async (postId) => {
    if (comments[postId]) return; // 이미 불러온 댓글이 있으면 다시 불러오지 않음
    try {
      const response = await fetch(`/api/comments/post/${postId}`);
      const data = await response.json();
      setComments({ ...comments, [postId]: data.comments });
    } catch (error) {
      console.error('댓글 가져오기 오류:', error);
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

  // 댓글 좋아요
  const likeComment = async (id, postId) => {
    try {
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: comments[postId].find((c) => c.id === id).likes + 1 }),
      });
      const data = await response.json();
      setComments({
        ...comments,
        [postId]: comments[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      });
    } catch (error) {
      console.error('댓글 좋아요 오류:', error);
    }
  };

  // 게시물 상세 보기
  const openPostDetail = (post) => {
    setSelectedPost(post);
    fetchComments(post.id);
    setShowPostDetailDialog(true);
  };

  // 사용자 모달 열기
  const openUserModal = async (user) => {
    try {
      const response = await fetch(`/api/users/${user.id}`);
      const userData = await response.json();
      setSelectedUser(userData);
      setShowUserDialog(true);
    } catch (error) {
      console.error('사용자 정보 가져오기 오류:', error);
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
    updateURL();
  }, [skip, limit, sortBy, sortOrder, selectedTag]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSkip(parseInt(params.get('skip') || '0'));
    setLimit(parseInt(params.get('limit') || '10'));
    setSearchQuery(params.get('search') || '');
    setSortBy(params.get('sortBy') || '');
    setSortOrder(params.get('sortOrder') || 'asc');
    setSelectedTag(params.get('tag') || '');
  }, [location.search]);

  const handleClickTag = (tag: string) => {
    setSelectedTag(tag);
    updateURL();
  };

  const handleClickEdit = (post: any) => {
    setSelectedPost(post);
    setShowEditDialog(true);
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
            {/* 검색 및 필터 컨트롤 */}
            <div className='flex gap-4'>
              <div className='flex-1'>
                <div className='relative'>
                  <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
                  <Input
                    placeholder='게시물 검색...'
                    className='pl-8'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchPosts()}
                  />
                </div>
              </div>

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
                onClickAuthor={openUserModal}
                onClickPostComment={openPostDetail}
                onClickEdit={handleClickEdit}
                onClickDelete={deletePost}
              />
            )}

            <Pagination />
          </div>
        </CardContent>

        <AddPost />
        <EditPost />

        <AddComment />
        <UpdateComment />

        {/* 게시물 상세 보기 대화상자 */}
        <PostDetail
          comments={comments}
          isOpen={showPostDetailDialog}
          onClickOpenChange={setShowPostDetailDialog}
          selectedPost={selectedPost}
          onClickAdd={handleClickAddComment}
          onClickLike={likeComment}
          onClickEdit={handleClickEditComment}
          onClickDelete={deleteComment}
        />

        <UserInfo />
      </Card>
    </main>
  );
};
