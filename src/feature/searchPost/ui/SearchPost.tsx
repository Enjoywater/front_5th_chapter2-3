import { Search } from 'lucide-react';

import { usePostFilterActions, useSearchQuery } from '@/shared/model/store';
import { Input } from '@/shared/ui';

import { useGetSearchPost } from '../model';

export const SearchPost = () => {
  const searchQuery = useSearchQuery();

  const { setSearchQuery } = usePostFilterActions();

  const { getSearchPosts } = useGetSearchPost();

  return (
    <div className='flex-1'>
      <div className='relative'>
        <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
        <Input
          placeholder='게시물 검색...'
          className='pl-8'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && getSearchPosts()}
        />
      </div>
    </div>
  );
};
