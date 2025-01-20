'use client';

import Link from 'next/link';
import { X } from '@/assets/images/icons';
import Header from '@/components/layout/Header';
import PageLayout from '@/components/layout/PageLayout';
import { cn } from '@/lib/shadcn/utils';
import SearchInput from './_components/SearchInput';
import { TEMP_SEARCH_RESULT, useSearch } from './_hook/useSearch';

export default function DynamicPageContent() {
  const {
    search,
    onSearch,
    searchResult,
    searchHistory,
    clearSearch,
    deleteHistoryItem,
    addHistoryItem,
    clearAllHistory,
  } = useSearch<typeof TEMP_SEARCH_RESULT>();

  return (
    <PageLayout
      header={
        <Header className='border-none bg-v1-background'>
          <Link href='.'>
            <Header.Icon Icon={X} />
          </Link>
          <Header.Center>검색</Header.Center>
        </Header>
      }
    >
      <PaddingWrapper>
        <SearchInput search={search} onSearch={onSearch} clearSearch={clearSearch} />
      </PaddingWrapper>

      <PaddingWrapper className='flex h-14 items-center justify-between'>
        <p className='font-semibold'>최근 검색</p>
        <button className='text-sm text-v1-text-primary-400' onClick={clearAllHistory}>
          전체삭제
        </button>
      </PaddingWrapper>

      <ul className='flex gap-2 overflow-x-scroll px-5 pb-2'>
        {searchHistory.map((history) => (
          <li key={history} className='shrink-0' onClick={() => onSearch(history)}>
            <button className='flex h-9 items-center justify-between gap-1 rounded-2xl bg-v1-text-primary-50 px-3'>
              <span className='text-sm text-v1-text-primary-500'>{history}</span>
              <X className='-mr-1 scale-75' onClick={() => deleteHistoryItem(history)} />
            </button>
          </li>
        ))}
      </ul>

      {searchResult.result.map((result: any) => (
        <div key={result} onClick={() => addHistoryItem(searchResult['search'])}>
          {searchResult['search']} : {result}
        </div>
      ))}
    </PageLayout>
  );
}

function PaddingWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-6', className)}>{children}</div>;
}
