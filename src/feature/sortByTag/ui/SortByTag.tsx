import { useSelectedTag, useTags } from '@/shared/model/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui';
import { useGetTagPost } from '../model';

export const SortByTag = () => {
  const tags = useTags();

  const selectedTag = useSelectedTag();

  const { getTagPosts } = useGetTagPost();

  return (
    <Select
      value={selectedTag}
      onValueChange={getTagPosts}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='태그 선택' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>모든 태그</SelectItem>
        {tags.map((tag) => (
          <SelectItem
            key={tag.url}
            value={tag.slug}
          >
            {tag.slug}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
