import { Edit2, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { DeletePost } from '@/feature/deletePost';
import { OpenPostDetail } from '@/feature/openPostDetail';
import { OpenUserDetail } from '@/feature/openUserDetail';
import {
  useDialogActions,
  usePostActions,
  usePosts,
  useSelectedTag,
  useTagActions,
} from '@/shared/model/store';
import { Button } from '@/shared/ui';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui';
import { highlightText } from '@/shared/utils';

export const PostTable = () => {
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  const posts = usePosts();
  const selectedTag = useSelectedTag();

  const { setSelectedPost } = usePostActions();
  const { setShowEditDialog } = useDialogActions();
  const { setSelectedTag } = useTagActions();

  const handleClickEdit = (post: any) => {
    setSelectedPost(post);
    setShowEditDialog(true);
  };

  const handleClickTag = (tag: string) => {
    setSelectedTag(tag);

    if (selectedTag) queryParams.set('tag', selectedTag);

    navigate(`?${queryParams.toString()}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[50px]'>ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className='w-[150px]'>작성자</TableHead>
          <TableHead className='w-[150px]'>반응</TableHead>
          <TableHead className='w-[150px]'>작업</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className='space-y-1'>
                <div>{highlightText(post.title, searchQuery)}</div>

                <div className='flex flex-wrap gap-1'>
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? 'text-white bg-blue-500 hover:bg-blue-600'
                          : 'text-blue-800 bg-blue-100 hover:bg-blue-200'
                      }`}
                      onClick={() => handleClickTag(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <OpenUserDetail post={post} />
            </TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <ThumbsUp className='w-4 h-4' />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className='w-4 h-4' />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className='flex items-center gap-2'>
                <OpenPostDetail post={post} />
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleClickEdit}
                >
                  <Edit2 className='w-4 h-4' />
                </Button>
                <DeletePost id={post.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
