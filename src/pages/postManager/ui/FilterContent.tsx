import { SortByTag } from '@/feature/sortByTag';
import { SortByValue } from '@/feature/sortByValue';
import { SortByOrder } from '@/feature/sortByOrder';
import { SearchPost } from '@/feature/searchPost';

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
