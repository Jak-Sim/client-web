import { useEffect, useState } from 'react';
import { Search, X } from '@/assets/images/icons';
import InputWithError from '@/components/input/InputWithErrorMsg';
import { useSearch } from '../_hook/useSearch';

interface SearchFormProps {
  onSearch: ReturnType<typeof useSearch>['onSearch'];
  search: ReturnType<typeof useSearch>['search'];
  clearSearch: ReturnType<typeof useSearch>['clearSearch'];
}

const DELAY = 200;

export default function SearchInput({ onSearch, search, clearSearch }: SearchFormProps) {
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [currentSearch, setCurrentSearch] = useState(search);

  useEffect(() => {
    if (currentSearch) {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
      setSearchTimeout(setTimeout(() => onSearch(currentSearch), DELAY));
    }
  }, [currentSearch]);

  useEffect(() => {
    setCurrentSearch(search);
  }, [search]);

  const handleClearSearch = () => {
    setCurrentSearch('');
    clearSearch();
  };

  return (
    <div className='relative mt-2 h-16'>
      {!currentSearch && <Search className='absolute left-6 top-3 mt-[1px]' />}
      <InputWithError
        placeholder='검색어를 입력해주세요'
        value={currentSearch}
        onChange={(e) => setCurrentSearch(e.target.value)}
        autoComplete='off'
        style={{ paddingLeft: !currentSearch ? '3.5rem' : '2rem' }}
        hasError={false}
      />
      {currentSearch && <X className='absolute right-6 top-3 mt-[1px]' onClick={handleClearSearch} />}
    </div>
  );
}
