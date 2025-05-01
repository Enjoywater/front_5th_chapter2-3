import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react';

import { Button } from '@/shared/ui';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui';
import { highlightText } from '@/shared/utils';

const DEFAULT_BUTTON_PROPS: any = {
  variant: 'ghost',
  size: 'sm',
};

interface PostTableProps {
  posts: any[];
  selectedTag: string;
  onClickTag: (tag: string) => void;
  onClickAuthor: (author: any) => void;
  onClickPostComment: (post: any) => void;
  onClickEdit: (post: any) => void;
  onClickDelete: (id: string) => void;
}

export const PostTable = ({
  posts,
  selectedTag,
  onClickTag,
  onClickAuthor,
  onClickPostComment,
  onClickEdit,
  onClickDelete,
}: PostTableProps) => {
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

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
                      onClick={() => onClickTag(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div
                className='flex items-center space-x-2 cursor-pointer'
                onClick={() => onClickAuthor(post.author)}
              >
                <img
                  src={post.author?.image}
                  alt={post.author?.username}
                  className='w-8 h-8 rounded-full'
                />
                <span>{post.author?.username}</span>
              </div>
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
                <Button
                  {...DEFAULT_BUTTON_PROPS}
                  onClick={() => onClickPostComment(post)}
                >
                  <MessageSquare className='w-4 h-4' />
                </Button>
                <Button
                  {...DEFAULT_BUTTON_PROPS}
                  onClick={() => onClickEdit(post)}
                >
                  <Edit2 className='w-4 h-4' />
                </Button>
                <Button
                  {...DEFAULT_BUTTON_PROPS}
                  onClick={() => onClickDelete(post.id)}
                >
                  <Trash2 className='w-4 h-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
