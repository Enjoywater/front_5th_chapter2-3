import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';

import { SortByTag } from '@/feature/sortByTag';
import { SortByValue } from '@/feature/sortByValue';
import { SortByOrder } from '@/feature/sortByOrder';
import { Pagination } from '@/feature/pagination';
import { useQueryParams } from '@/shared/hooks/useQueryParams';
import { SearchPost } from '@/feature/searchPost';
import { PostTable } from '@/widgets/postTable';
import { usePosts } from '@/feature/posts';
import { DialogContent } from './DialogContent';
import { OpenAddPost } from '@/feature/openAddPost';

export const PostsManager = () => {
  useQueryParams();

  const { loading } = usePosts();

  return (
    <main className='flex-grow container mx-auto px-4 py-8'>
      <Card className='w-full max-w-6xl mx-auto'>
        <CardHeader>
          <CardTitle className='flex items-center justify-between'>
            <span>게시물 관리자</span>
            <OpenAddPost />
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
      </Card>

      <DialogContent />
    </main>
  );
};
