import { useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import {
  useLimit,
  usePostFilterActions,
  useSearchQuery,
  useSelectedTag,
  useSkip,
  useSortBy,
  useSortOrder,
  useTagActions,
} from '../model/store';

export const useQueryParams = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const skip = useSkip();
  const limit = useLimit();
  const sortBy = useSortBy();
  const sortOrder = useSortOrder();
  const searchQuery = useSearchQuery();
  const { setSelectedTag } = useTagActions();

  const selectedTag = useSelectedTag();
  const { setSkip, setLimit, setSearchQuery, setSortBy, setSortOrder } = usePostFilterActions();

  useEffect(() => {
    setSkip(parseInt(queryParams.get('skip') || '0'));
    setLimit(parseInt(queryParams.get('limit') || '10'));
    setSearchQuery(queryParams.get('search') || '');
    setSortBy(queryParams.get('sortBy') || '');
    setSortOrder(queryParams.get('sortOrder') || 'asc');
    setSelectedTag(queryParams.get('tag') || '');
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (skip) params.set('skip', skip.toString());
    if (limit) params.set('limit', limit.toString());
    if (searchQuery) params.set('search', searchQuery);
    if (sortBy) params.set('sortBy', sortBy);
    if (sortOrder) params.set('sortOrder', sortOrder);
    if (selectedTag) params.set('tag', selectedTag);

    const newSearch = params.toString();
    const currentSearch = queryParams.toString();

    if (newSearch !== currentSearch) {
      navigate(`?${newSearch}`, { replace: true });
    }
  }, [skip, limit, sortBy, sortOrder, selectedTag, searchQuery]);
};
