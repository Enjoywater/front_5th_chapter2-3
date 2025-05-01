import { OpenAddPost } from '@/feature/openAddPost';
import { Pagination } from '@/feature/pagination';
import { usePosts } from '@/feature/posts';
import { useQueryParams } from '@/shared/hooks/useQueryParams';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { PostTable } from '@/widgets/postTable';

import { DialogContent } from './DialogContent';
import { FilterContent } from './FilterContent';

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
            <FilterContent />

            {loading ? <div className='flex justify-center p-4'>로딩 중...</div> : <PostTable />}

            <Pagination />
          </div>
        </CardContent>
      </Card>

      <DialogContent />
    </main>
  );
};
