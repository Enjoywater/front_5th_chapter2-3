import { SearchPost } from '@/feature/searchPost';
import { SortByOrder } from '@/feature/sortByOrder';
import { SortByTag } from '@/feature/sortByTag';
import { SortByValue } from '@/feature/sortByValue';

export const FilterContent = () => {
  return (
    <div className='flex gap-4'>
      <SearchPost />
      <SortByTag />
      <SortByValue />
      <SortByOrder />
    </div>
  );
};
